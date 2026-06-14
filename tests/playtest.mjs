import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "file:///C:/Users/19839/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.mjs";

const baseUrl = "http://127.0.0.1:4173";
const outputDir = fileURLToPath(new URL("../artifacts/", import.meta.url));
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

function collectErrors(page, target) {
  page.on("console", (message) => {
    if (message.type() === "error") target.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => target.push(`page: ${error.message}`));
}

const errors = [];
const page = await browser.newPage({
  viewport: { width: 1600, height: 1050 },
  reducedMotion: "reduce",
});
collectErrors(page, errors);

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.locator(".environment-choice").first().waitFor();
const opening = {
  title: await page.locator("h1").innerText(),
  environmentChoices: await page.locator(".environment-choice").count(),
  handBeforeChoice: await page.locator(".bio-card").count(),
};
await page.screenshot({
  path: join(outputDir, "demo-1.1-environment-choice.png"),
  fullPage: true,
});

await page.locator(".environment-choice").first().click();
await page.locator(".bio-card").first().waitFor();
const initialEnergy = Number(await page.locator("#energy-value").innerText());
const cardCosts = await page.locator(".bio-card .card-cost").allInnerTexts();
const initial = {
  turn: await page.locator("#turn-current").innerText(),
  handSize: await page.locator(".bio-card").count(),
  energy: initialEnergy,
  handCost: cardCosts.reduce((sum, value) => sum + Number(value), 0),
  traitBadges: await page.locator(".trait-badge").count(),
  zones: await page.locator(".zone-button").count(),
  chosenEnvironment: await page
    .locator("#chosen-environment-name")
    .innerText(),
};

const firstPlayable = page.locator(".bio-card:not(:disabled)").first();
const firstCardTitle = await firstPlayable.locator("h3").innerText();
await firstPlayable.click();
const eligibleZones = await page.locator(".zone-button.eligible").count();
await page.locator(".zone-button.eligible").first().click();
const energyAfterDeploy = Number(
  await page.locator("#energy-value").innerText(),
);

await page.evaluate(() => window.gameDebug.resolveInstant());
await page.waitForFunction(() => window.gameDebug.engine.state.turn === 2);
const afterTurn = {
  turn: await page.locator("#turn-current").innerText(),
  handSize: await page.locator(".bio-card").count(),
  eventCount: await page.locator("#event-list li").count(),
  banner: await page.locator("#event-banner-title").innerText(),
};
await page.screenshot({
  path: join(outputDir, "demo-1.1-after-turn.png"),
  fullPage: true,
});

await page.evaluate(async () => {
  const { engine, species } = window.gameDebug;
  engine.reset();
  engine.chooseEnvironment("black_soil");

  const zoneCount = (zoneId, groupId) =>
    Object.entries(engine.state.zones[zoneId].populations)
      .filter(([speciesId]) => species[speciesId].group === groupId)
      .reduce(
        (sum, [, cohorts]) =>
          sum +
          cohorts.reduce((subtotal, cohort) => subtotal + cohort.count, 0),
        0,
      );

  while (engine.state.phase === "deploy") {
    const groups = engine.groupTotals();
    const cards = [...engine.state.hand].sort((left, right) => {
      const groupPriority = { producer: 0, herbivore: 1, predator: 2 };
      return (
        groupPriority[species[left.species].group] -
          groupPriority[species[right.species].group] ||
        left.cost - right.cost
      );
    });

    for (const card of cards) {
      const group = species[card.species].group;
      let zoneId = null;
      if (group === "producer" && engine.groupTotals().producer < 220) {
        if (zoneCount("plains", "producer") < 115) zoneId = "plains";
        else if (card.allowedZones.includes("riverbank")) zoneId = "riverbank";
        else zoneId = "thicket";
      }
      if (
        group === "herbivore" &&
        engine.groupTotals().producer >= 105 &&
        engine.groupTotals().herbivore < 27
      ) {
        zoneId =
          zoneCount("riverbank", "producer") >= 55 &&
          zoneCount("riverbank", "herbivore") < 12
            ? "riverbank"
            : "plains";
      }
      if (
        group === "predator" &&
        engine.groupTotals().herbivore >= 22 &&
        engine.groupTotals().predator < 3
      ) {
        zoneId = card.allowedZones.includes("plains") ? "plains" : "thicket";
      }
      if (
        zoneId &&
        card.allowedZones.includes(zoneId) &&
        engine.state.energy >= card.cost
      ) {
        engine.deployCard(card.instanceId, zoneId);
      }
    }
    await window.gameDebug.resolveInstant();
  }
});

await page.locator("#audit-modal:not([hidden])").waitFor();
const auditStart = {
  phase: await page.evaluate(() => window.gameDebug.engine.state.phase),
  historyPoints: await page.evaluate(
    () => window.gameDebug.engine.state.history.length,
  ),
};
await page.evaluate(() => window.gameDebug.runAuditInstant());
await page.locator("#result-modal:not([hidden])").waitFor({
  timeout: 20_000,
});
const completedRun = {
  resultTitle: await page.locator("#result-title").innerText(),
  metrics: await page.locator("#result-metrics").innerText(),
  historyPoints: await page.evaluate(
    () => window.gameDebug.engine.state.history.length,
  ),
  auditTurns: await page.evaluate(
    () => window.gameDebug.engine.state.auditRound,
  ),
};
await page.screenshot({
  path: join(outputDir, "demo-1.1-result.png"),
  fullPage: true,
});

await page.evaluate(() => {
  document.querySelector("#result-modal").hidden = true;
});
await page.locator("#history-button").click();
await page.locator("#history-modal:not([hidden])").waitFor();
const chartPaths = await page.locator("#history-chart path").count();
await page.screenshot({
  path: join(outputDir, "demo-1.1-history.png"),
  fullPage: true,
});

const mobileErrors = [];
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
collectErrors(mobile, mobileErrors);
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.locator(".environment-choice").first().click();
await mobile.locator(".bio-card").first().waitFor();
await mobile.screenshot({
  path: join(outputDir, "demo-1.1-mobile.png"),
  fullPage: true,
});
const mobileLayout = await mobile.evaluate(() => ({
  viewportWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  zones: document.querySelectorAll(".zone-button").length,
  cards: document.querySelectorAll(".bio-card").length,
}));

const report = {
  opening,
  initial,
  interaction: {
    firstCardTitle,
    eligibleZones,
    energyAfterDeploy,
  },
  afterTurn,
  auditStart,
  completedRun,
  chartPaths,
  mobileLayout,
  errors: [...errors, ...mobileErrors],
};
console.log(JSON.stringify(report, null, 2));

await browser.close();

const failed =
  opening.environmentChoices !== 3 ||
  initial.handSize !== 5 ||
  initial.handCost <= initial.energy ||
  initial.traitBadges !== initial.handSize ||
  eligibleZones < 1 ||
  energyAfterDeploy >= initial.energy ||
  auditStart.phase !== "audit" ||
  completedRun.auditTurns !== 10 ||
  completedRun.historyPoints !== 19 ||
  chartPaths !== 3 ||
  mobileLayout.scrollWidth > mobileLayout.viewportWidth ||
  errors.length > 0 ||
  mobileErrors.length > 0;

if (failed) process.exitCode = 1;
