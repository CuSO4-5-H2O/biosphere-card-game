import {
  CARD_LIBRARY,
  EcosystemEngine,
  ENVIRONMENTS,
  SPECIES,
  ZONES,
} from "./core/ecosystem.js";

const elements = {
  turnLabel: document.querySelector("#turn-label"),
  turnCurrent: document.querySelector("#turn-current"),
  turnSuffix: document.querySelector("#turn-suffix"),
  energyValue: document.querySelector("#energy-value"),
  stabilityValue: document.querySelector("#stability-value"),
  phaseBadge: document.querySelector("#phase-badge"),
  objectiveCopy: document.querySelector("#objective-copy"),
  objectiveProgress: document.querySelector("#objective-progress"),
  producerTotal: document.querySelector("#grass-total"),
  herbivoreTotal: document.querySelector("#gazelle-total"),
  predatorTotal: document.querySelector("#lion-total"),
  producerDelta: document.querySelector("#grass-delta"),
  herbivoreDelta: document.querySelector("#gazelle-delta"),
  predatorDelta: document.querySelector("#lion-delta"),
  producerBreakdown: document.querySelector("#producer-breakdown"),
  herbivoreBreakdown: document.querySelector("#herbivore-breakdown"),
  predatorBreakdown: document.querySelector("#predator-breakdown"),
  nutrientValue: document.querySelector("#nutrient-value"),
  remainsValue: document.querySelector("#remains-value"),
  nutrientBar: document.querySelector("#nutrient-bar"),
  remainsBar: document.querySelector("#remains-bar"),
  balanceStatus: document.querySelector("#balance-status"),
  forecastValue: document.querySelector("#forecast-value"),
  forecastList: document.querySelector("#forecast-list"),
  resolutionTitle: document.querySelector("#resolution-title"),
  resolutionSteps: [...document.querySelectorAll("#resolution-steps li")],
  turnMessage: document.querySelector("#turn-message"),
  eventBanner: document.querySelector("#event-banner"),
  eventBannerTitle: document.querySelector("#event-banner-title"),
  eventList: document.querySelector("#event-list"),
  hand: document.querySelector("#hand"),
  drawCount: document.querySelector("#draw-count"),
  discardCount: document.querySelector("#discard-count"),
  endTurn: document.querySelector("#end-turn"),
  endTurnLabel: document.querySelector("#end-turn-label"),
  endTurnCopy: document.querySelector("#end-turn-copy"),
  zoneButtons: [...document.querySelectorAll(".zone-button")],
  placementHint: document.querySelector("#placement-hint"),
  clearSelection: document.querySelector("#clear-selection"),
  chosenEnvironment: document.querySelector("#chosen-environment"),
  chosenEnvironmentName: document.querySelector("#chosen-environment-name"),
  chosenEnvironmentText: document.querySelector("#chosen-environment-text"),
  chosenEnvironmentType: document.querySelector("#chosen-environment-type"),
  environmentModal: document.querySelector("#environment-modal"),
  environmentChoices: document.querySelector("#environment-choices"),
  auditModal: document.querySelector("#audit-modal"),
  startAuditButton: document.querySelector("#start-audit-button"),
  historyButton: document.querySelector("#history-button"),
  historyModal: document.querySelector("#history-modal"),
  historyChart: document.querySelector("#history-chart"),
  resultModal: document.querySelector("#result-modal"),
  resultKicker: document.querySelector("#result-kicker"),
  resultEmblem: document.querySelector("#result-emblem"),
  resultTitle: document.querySelector("#result-title"),
  resultCopy: document.querySelector("#result-copy"),
  resultMetrics: document.querySelector("#result-metrics"),
  restartButton: document.querySelector("#restart-button"),
};

const speciesArt = {
  grass: `
    <svg viewBox="0 0 80 60"><path d="M39 55V9M39 42 20 22M39 44l20-27M39 31l10-18M32 49 52 34M25 50 13 35M55 51l10-14" /><path d="M20 53c0-9-3-18-9-26M58 54c1-10 5-19 12-27" /></svg>`,
  acacia: `
    <svg viewBox="0 0 80 60"><path d="M40 55V25m0 9L25 22m15 9 17-13M28 22c-11 2-17-3-20-8 12-8 29-6 35 3M50 20c8-10 22-9 27-2-7 8-20 9-30 5" /></svg>`,
  gazelle: `
    <svg viewBox="0 0 86 60"><path d="M17 38c10-15 31-16 43-6l11-4M23 38l-7 17m22-16-3 16m18-19 5 19m8-21 8 21M58 28c2-12 8-17 15-17m-12 14c-4-10-2-18 3-23" /><circle cx="74" cy="13" r="2" /></svg>`,
  zebra: `
    <svg viewBox="0 0 86 60"><path d="M15 38c10-14 32-14 47-5l10-5M21 38l-5 17m23-16-2 16m19-19 4 19m8-22 8 22M59 29c2-11 6-17 13-19" /><path d="m28 28 7 12m2-15 7 14m2-13 7 11m9-17 7 10" /></svg>`,
  wildebeest: `
    <svg viewBox="0 0 86 60"><path d="M15 38c8-15 31-17 47-7l10-2M21 38l-6 17m23-17-3 17m21-20 4 20m8-22 8 22M59 29c2-10 7-15 14-15M70 15l9-7m-8 8-9-8" /><path d="M18 35c10 4 28 3 39-5" /></svg>`,
  lion: `
    <svg viewBox="0 0 86 60"><circle cx="64" cy="25" r="14" /><path d="M52 31c-14-8-33-4-38 12L5 45m23-8-2 18m22-19 5 19m12-18 7 18M73 21l8-6" /><circle cx="68" cy="24" r="2" /><path d="M60 29c5 2 10 1 13-2" /></svg>`,
  hyena: `
    <svg viewBox="0 0 86 60"><path d="M13 39c9-13 29-16 45-7l11-6M20 39l-5 16m21-17-2 17m19-20 5 20m8-23 9 23M57 30c4-10 10-14 17-12M70 18l6-8m-9 9-3-9" /><path d="m28 27 5 5m5-7 4 5m7-4 4 5" /></svg>`,
};

const environmentSymbols = {
  monsoon: "☂",
  black_soil: "◉",
  termite_network: "⌁",
};

let selectedCardId = null;
let latestState = null;
let mapScene = null;
let engine = null;
let auditRunning = false;

function zoneSpeciesCount(zone, speciesId) {
  return zone.populations[speciesId].reduce(
    (sum, cohort) => sum + cohort.count,
    0,
  );
}

function zoneGroupCount(zone, groupId) {
  return Object.keys(SPECIES)
    .filter((speciesId) => SPECIES[speciesId].group === groupId)
    .reduce((sum, speciesId) => sum + zoneSpeciesCount(zone, speciesId), 0);
}

class SavannaScene extends Phaser.Scene {
  constructor() {
    super("Savanna");
  }

  create() {
    mapScene = this;
    this.drawMap();
    if (latestState) this.updateState(latestState);
    this.scale.on("resize", () => {
      this.drawMap();
      if (latestState) this.updateState(latestState);
    });
  }

  drawMap() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.children.removeAll();

    const sky = this.add.graphics();
    sky.fillGradientStyle(0xb99a65, 0xb99a65, 0x70835b, 0x4d6249, 1);
    sky.fillRect(0, 0, width, height);
    sky.fillStyle(0xf0c276, 0.4);
    sky.fillCircle(width * 0.77, 48, 32);
    sky.lineStyle(1, 0xf8d99b, 0.25);
    sky.strokeCircle(width * 0.77, 48, 45);

    const distant = this.add.graphics();
    distant.fillStyle(0x4f6648, 0.72);
    distant.fillEllipse(width * 0.18, height * 0.34, width * 0.48, 120);
    distant.fillEllipse(width * 0.62, height * 0.34, width * 0.62, 145);
    distant.fillStyle(0x344733, 0.95);
    distant.fillRect(0, height * 0.34, width, height * 0.66);

    const columnWidth = width / 3;
    const regionColors = [0x3d604c, 0x6f6842, 0x4a593a];
    for (let index = 0; index < 3; index += 1) {
      const x = index * columnWidth;
      const region = this.add.graphics();
      region.fillStyle(regionColors[index], 0.82);
      region.fillRect(x + 5, 48, columnWidth - 10, height - 92);
      region.lineStyle(1, 0xe4d4ac, 0.14);
      region.strokeRoundedRect(x + 5, 48, columnWidth - 10, height - 92, 8);
      for (let line = 0; line < 5; line += 1) {
        region.lineStyle(1, 0xe8d8b4, 0.035);
        region.strokeEllipse(
          x + columnWidth * (0.35 + line * 0.06),
          height * (0.44 + line * 0.07),
          columnWidth * (0.45 + line * 0.12),
          70 + line * 22,
        );
      }
    }

    const river = this.add.graphics();
    river.fillStyle(0x527d79, 0.72);
    river.beginPath();
    river.moveTo(0, height * 0.73);
    river.lineTo(columnWidth * 0.34, height * 0.62);
    river.lineTo(columnWidth * 0.78, height * 0.71);
    river.lineTo(columnWidth, height * 0.94);
    river.lineTo(0, height);
    river.closePath();
    river.fillPath();

    const tree = this.add.graphics();
    const treeX = width * 0.84;
    const treeY = height * 0.54;
    tree.lineStyle(8, 0x2f2c1e, 1);
    tree.beginPath();
    tree.moveTo(treeX, treeY + 78);
    tree.lineTo(treeX, treeY);
    tree.lineTo(treeX - 22, treeY - 20);
    tree.moveTo(treeX, treeY + 5);
    tree.lineTo(treeX + 27, treeY - 18);
    tree.strokePath();
    tree.fillStyle(0x263d28, 1);
    tree.fillEllipse(treeX, treeY - 24, 108, 34);
    tree.fillEllipse(treeX - 34, treeY - 14, 62, 25);

    this.dynamicLayer = this.add.container(0, 0);
  }

  updateState(state) {
    if (!this.dynamicLayer) return;
    this.dynamicLayer.removeAll(true);
    const width = this.scale.width;
    const height = this.scale.height;

    ["riverbank", "plains", "thicket"].forEach((zoneId, zoneIndex) => {
      const zone = state.zones[zoneId];
      const left = (width / 3) * zoneIndex;
      const zoneWidth = width / 3;
      this.drawPlantTokens(
        left,
        zoneWidth,
        height,
        zoneGroupCount(zone, "producer"),
        zoneIndex,
      );
      this.drawAnimalTokens(
        left,
        zoneWidth,
        height,
        zoneGroupCount(zone, "herbivore"),
        "herbivore",
        zoneIndex,
      );
      this.drawAnimalTokens(
        left,
        zoneWidth,
        height,
        zoneGroupCount(zone, "predator"),
        "predator",
        zoneIndex,
      );
      this.drawCountBadge(left, zoneWidth, height, zone);
    });
  }

  drawPlantTokens(left, zoneWidth, height, amount, zoneIndex) {
    const count = Math.min(14, Math.ceil(amount / 17));
    for (let index = 0; index < count; index += 1) {
      const x =
        left +
        25 +
        ((index * 47 + zoneIndex * 23) % Math.max(40, zoneWidth - 48));
      const y =
        height * 0.59 +
        ((index * 31) % Math.max(40, height * 0.25));
      const tuft = this.add.graphics();
      const scale = 0.65 + (index % 3) * 0.16;
      tuft.lineStyle(2, index % 2 ? 0x9eb970 : 0xc0bd6d, 0.9);
      tuft.beginPath();
      tuft.moveTo(x, y);
      tuft.lineTo(x - 6 * scale, y - 18 * scale);
      tuft.moveTo(x, y);
      tuft.lineTo(x + 1, y - 23 * scale);
      tuft.moveTo(x, y);
      tuft.lineTo(x + 7 * scale, y - 16 * scale);
      tuft.strokePath();
      this.dynamicLayer.add(tuft);
    }
  }

  drawAnimalTokens(left, zoneWidth, height, amount, group, zoneIndex) {
    const divisor = group === "herbivore" ? 6 : 1;
    const maximum = group === "herbivore" ? 7 : 6;
    const count = Math.min(maximum, Math.ceil(amount / divisor));
    for (let index = 0; index < count; index += 1) {
      const x =
        left +
        zoneWidth * 0.28 +
        ((index * 53 + zoneIndex * 17) % Math.max(45, zoneWidth * 0.55));
      const y =
        height * 0.49 +
        ((index * 39 + (group === "predator" ? 22 : 0)) %
          Math.max(50, height * 0.31));
      const animal = this.add.graphics();
      if (group === "herbivore") {
        animal.fillStyle(0xd8ad70, 1);
        animal.fillEllipse(x, y, 22, 10);
        animal.fillCircle(x + 12, y - 6, 5);
        animal.lineStyle(2, 0x34271c, 0.9);
        animal.beginPath();
        animal.moveTo(x - 6, y + 3);
        animal.lineTo(x - 8, y + 14);
        animal.moveTo(x + 6, y + 3);
        animal.lineTo(x + 8, y + 14);
        animal.strokePath();
      } else {
        animal.fillStyle(0xc76d43, 1);
        animal.fillEllipse(x, y, 27, 12);
        animal.fillStyle(0x5c3626, 1);
        animal.fillCircle(x + 15, y - 6, 9);
        animal.fillStyle(0xd78a52, 1);
        animal.fillCircle(x + 15, y - 6, 5);
        animal.lineStyle(2, 0x33251e, 0.95);
        animal.beginPath();
        animal.moveTo(x - 7, y + 4);
        animal.lineTo(x - 8, y + 15);
        animal.moveTo(x + 7, y + 4);
        animal.lineTo(x + 9, y + 15);
        animal.strokePath();
      }
      this.dynamicLayer.add(animal);
    }
  }

  drawCountBadge(left, zoneWidth, height, zone) {
    const label = this.add
      .text(
        left + zoneWidth / 2,
        height - 58,
        `生 ${zoneGroupCount(zone, "producer")}   食 ${zoneGroupCount(zone, "herbivore")}   捕 ${zoneGroupCount(zone, "predator")}`,
        {
          fontFamily: "Segoe UI, Microsoft YaHei",
          fontSize: "12px",
          color: "#eee6d4",
          backgroundColor: "rgba(12,17,14,0.72)",
          padding: { x: 8, y: 4 },
        },
      )
      .setOrigin(0.5);
    this.dynamicLayer.add(label);
  }

  showDeploy(zoneId, card) {
    const zoneIndex = ["riverbank", "plains", "thicket"].indexOf(zoneId);
    const x = (this.scale.width / 3) * (zoneIndex + 0.5);
    const group = SPECIES[card.species].group;
    const color =
      group === "producer"
        ? "#bed47f"
        : group === "herbivore"
          ? "#efbf7e"
          : "#ee8a61";
    this.floatText(
      x,
      this.scale.height * 0.45,
      `+${card.amount} ${card.name}`,
      color,
    );
  }

  showResolution(step) {
    const colors = {
      event: "#e6b966",
      sun: "#f2c36c",
      graze: "#d7a361",
      hunt: "#dd7854",
      metabolism: "#b8cd8a",
      decompose: "#9a8062",
      energy: "#7fb2ad",
    };
    this.floatText(
      this.scale.width / 2,
      92,
      step.title,
      colors[step.key] || "#f4eedf",
    );
  }

  floatText(x, y, text, color) {
    const label = this.add
      .text(x, y, text, {
        fontFamily: "Segoe UI, Microsoft YaHei",
        fontSize: "18px",
        fontStyle: "bold",
        color,
        stroke: "#111713",
        strokeThickness: 5,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: label,
      y: y - 38,
      alpha: 0,
      duration: 850,
      ease: "Cubic.out",
      onComplete: () => label.destroy(),
    });
  }
}

function renderEnvironmentChoices() {
  elements.environmentChoices.replaceChildren(
    ...Object.values(ENVIRONMENTS).map((environment) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "environment-choice";
      button.innerHTML = `
        <span class="environment-symbol">${environmentSymbols[environment.id]}</span>
        <span class="card-kicker">${environment.category}</span>
        <h3>${environment.name}</h3>
        <p>${environment.text}</p>
        <small>${environment.detail}</small>
      `;
      button.addEventListener("click", () => {
        if (engine.chooseEnvironment(environment.id)) {
          elements.environmentModal.hidden = true;
          elements.resolutionTitle.textContent = "等待部署完成";
          elements.turnMessage.textContent =
            "能量有限：优先建立食物基础，再选择消费者。";
        }
      });
      return button;
    }),
  );
}

function createCardButton(card) {
  const species = SPECIES[card.species];
  const button = document.createElement("button");
  button.type = "button";
  button.className = `bio-card ${card.species}`;
  button.dataset.cardId = card.instanceId;
  button.disabled =
    latestState.phase !== "deploy" || card.cost > latestState.energy;
  button.title = `${card.traitName}：${card.traitText}`;
  if (selectedCardId === card.instanceId) button.classList.add("selected");
  button.innerHTML = `
    <span class="card-cost">${card.cost}</span>
    <div class="bio-card-art">${speciesArt[card.species]}</div>
    <div class="bio-card-body">
      <div class="bio-card-meta"><span>${card.role}</span><span>${card.latin}</span></div>
      <h3>${card.name}</h3>
      <span class="trait-badge">${card.traitName} · ${card.traitText}</span>
      <p>${card.text}</p>
      <span class="habitat-text">投放 ${card.amount}${species.unit}</span>
    </div>
  `;
  button.addEventListener("click", () => selectCard(card.instanceId));
  return button;
}

function selectCard(instanceId) {
  if (latestState.phase !== "deploy") return;
  selectedCardId = selectedCardId === instanceId ? null : instanceId;
  render(latestState);
}

function render(state) {
  latestState = state;
  const { groupTotals, speciesTotals, forecast } = state;
  const isAudit =
    state.phase === "audit" ||
    (state.phase === "resolving" && state.resolutionMode === "audit");
  const isResolving = state.phase === "resolving";

  elements.turnLabel.textContent = isAudit ? "稳定考核" : "构筑回合";
  elements.turnCurrent.textContent = isAudit
    ? Math.min(state.auditRound + (isResolving ? 1 : 0), state.auditTurns)
    : state.turn;
  elements.turnSuffix.textContent = isAudit
    ? ` / ${state.auditTurns}`
    : ` / ${state.maxTurns}`;
  elements.energyValue.textContent = isAudit ? "—" : state.energy;
  elements.stabilityValue.textContent = state.stability;

  elements.phaseBadge.classList.toggle("resolving", isResolving);
  elements.phaseBadge.classList.toggle("audit", isAudit);
  if (state.phase === "environment") {
    elements.phaseBadge.textContent = "选择环境";
  } else if (isAudit) {
    elements.phaseBadge.textContent = isResolving
      ? "稳定性模拟中"
      : "无人干预考核";
  } else if (state.phase === "result") {
    elements.phaseBadge.textContent = "考核结束";
  } else if (isResolving) {
    elements.phaseBadge.textContent = "自动结算中";
  } else {
    elements.phaseBadge.textContent = "部署阶段";
  }

  elements.objectiveCopy.textContent = isAudit
    ? "系统正在脱离玩家干预，检验各营养级能否承受天气与种群波动。"
    : "用 8 回合建立食物网，然后在无人干预下稳定运行 10 回合。";
  elements.objectiveProgress.textContent = isAudit
    ? `${state.auditRound} / ${state.auditTurns}`
    : state.phase === "environment"
      ? "准备中"
      : `${state.objectiveProgress} / 4`;

  elements.producerTotal.textContent = groupTotals.producer;
  elements.herbivoreTotal.textContent = groupTotals.herbivore;
  elements.predatorTotal.textContent = groupTotals.predator;
  elements.producerBreakdown.textContent =
    `草 ${speciesTotals.grass} · 金合欢 ${speciesTotals.acacia}`;
  elements.herbivoreBreakdown.textContent =
    `瞪羚 ${speciesTotals.gazelle} · 斑马 ${speciesTotals.zebra} · 角马 ${speciesTotals.wildebeest}`;
  elements.predatorBreakdown.textContent =
    `狮 ${speciesTotals.lion} · 鬣狗 ${speciesTotals.hyena}`;
  renderDelta(elements.producerDelta, state.lastDeltas.producer);
  renderDelta(elements.herbivoreDelta, state.lastDeltas.herbivore);
  renderDelta(elements.predatorDelta, state.lastDeltas.predator);

  elements.nutrientValue.textContent = state.nutrients;
  elements.remainsValue.textContent = state.remains;
  elements.nutrientBar.style.width = `${Math.min(100, state.nutrients)}%`;
  elements.remainsBar.style.width = `${Math.min(100, state.remains * 1.5)}%`;
  renderBalanceStatus(state);

  elements.forecastValue.textContent =
    state.phase === "environment"
      ? "选择环境后生成预估"
      : isAudit
        ? `考核 ${state.auditRound} / ${state.auditTurns}`
        : `预计下回合 +${forecast.energyGain} 能量`;
  elements.forecastList.innerHTML = `
    <li><span>植物潜在生长</span><b>+${forecast.plantGrowth}</b></li>
    <li><span>草食供需</span><b>${forecast.plantSupply} / ${forecast.herbivoreDemand}</b></li>
    <li><span>捕食预期</span><b>${forecast.huntAttempts ? `${forecast.expectedHunts.toFixed(1)} / ${forecast.huntAttempts} 次` : "暂无捕食者"}</b></li>
  `;

  elements.eventList.replaceChildren(
    ...state.events.map((event) => {
      const item = document.createElement("li");
      item.innerHTML = `<time>${event.turn}</time><p>${event.text}</p>`;
      return item;
    }),
  );

  const environment = state.environmentData;
  elements.chosenEnvironmentName.textContent = environment.name;
  elements.chosenEnvironmentText.textContent =
    state.environment ? environment.text : "从三张环境牌中选择一张，确定本局发展方向。";
  elements.chosenEnvironmentType.textContent =
    state.environment ? environment.category : "—";
  elements.chosenEnvironment.querySelector(".chosen-env-mark").textContent =
    state.environment ? environmentSymbols[environment.id] : "?";

  const selectedCard = state.hand.find(
    (card) => card.instanceId === selectedCardId,
  );
  if (!selectedCard) selectedCardId = null;
  if (state.phase === "deploy") {
    elements.hand.replaceChildren(...state.hand.map(createCardButton));
  } else {
    const empty = document.createElement("div");
    empty.className = "empty-hand";
    empty.textContent = isAudit
      ? "稳定性考核期间不可部署生物"
      : state.phase === "environment"
        ? "选择环境后抽取首手 5 张牌"
        : "生态系统正在自动结算";
    elements.hand.replaceChildren(empty);
  }
  elements.drawCount.textContent = state.drawPile.length;
  elements.discardCount.textContent = state.discardPile.length;
  elements.endTurn.disabled = state.phase !== "deploy";
  elements.endTurnLabel.textContent = isAudit ? "无人干预" : "结束部署";
  elements.endTurnCopy.textContent = isAudit
    ? `考核 ${state.auditRound} / ${state.auditTurns}`
    : "开始生态结算";
  updateZoneButtons(selectedCard);

  if (selectedCard) {
    elements.placementHint.textContent =
      `已选择「${selectedCard.name}」：${selectedCard.traitName}`;
  } else if (state.phase === "deploy") {
    elements.placementHint.textContent =
      "选择一张生物牌，再点击高亮区域进行投放";
  } else if (isAudit) {
    elements.placementHint.textContent =
      "无人干预中：观察食物网能否自行维持";
  }

  const event = state.currentEvent;
  const showEvent =
    isResolving && event && event.id && event.id !== "calm";
  elements.eventBanner.hidden = !showEvent;
  if (showEvent) elements.eventBannerTitle.textContent = event.title;

  mapScene?.updateState(state);
}

function renderDelta(element, value) {
  element.classList.toggle("positive", value > 0);
  element.classList.toggle("negative", value < 0);
  element.textContent =
    value === 0 ? "—" : value > 0 ? `+${value}` : `${value}`;
}

function renderBalanceStatus(state) {
  const groups = state.groupTotals;
  let text = "尚未建立";
  let className = "warning";
  if (
    groups.producer > 0 &&
    groups.herbivore > 0 &&
    groups.predator > 0
  ) {
    text = state.stability >= 72 ? "食物网良好" : "食物网运行";
    className = state.stability >= 72 ? "good" : "warning";
  } else if (
    (groups.herbivore > 0 && groups.producer === 0) ||
    (groups.predator > 0 && groups.herbivore === 0)
  ) {
    text = "断链风险";
    className = "danger";
  } else if (groups.producer > 0) {
    text = "生产者已建立";
    className = "good";
  }
  elements.balanceStatus.textContent = text;
  elements.balanceStatus.className = `status-pill ${className}`;
}

function updateZoneButtons(selectedCard) {
  for (const button of elements.zoneButtons) {
    const eligible =
      selectedCard && selectedCard.allowedZones.includes(button.dataset.zone);
    button.classList.toggle("eligible", Boolean(eligible));
    button.classList.toggle(
      "ineligible",
      Boolean(selectedCard) && !eligible,
    );
    button.disabled =
      latestState.phase !== "deploy" ||
      (Boolean(selectedCard) && !eligible);
  }
}

async function playResolution(mode = "player", animationDelay = 500) {
  const requiredPhase = mode === "audit" ? "audit" : "deploy";
  if (latestState.phase !== requiredPhase) return null;
  selectedCardId = null;
  resetResolutionSteps();
  elements.resolutionTitle.textContent =
    mode === "audit"
      ? `稳定性考核 ${latestState.auditRound + 1} / ${latestState.auditTurns}`
      : `第 ${latestState.turn} 回合生态结算`;
  elements.turnMessage.textContent =
    mode === "audit"
      ? "系统将在没有玩家干预的情况下继续运行。"
      : "生态系统开始自动运行。";

  const steps = engine.beginResolution(mode);
  for (const step of steps) {
    const listItem = elements.resolutionSteps.find(
      (item) => item.dataset.step === step.key,
    );
    listItem?.classList.add("active");
    elements.resolutionTitle.textContent = step.title;
    elements.turnMessage.textContent = step.message;
    render(step.snapshot);
    mapScene?.showResolution(step);
    await wait(animationDelay);
    listItem?.classList.remove("active");
    listItem?.classList.add("complete");
  }

  await wait(Math.min(220, animationDelay));
  const outcome = engine.finishResolution();
  if (latestState.phase === "deploy") {
    elements.resolutionTitle.textContent = "等待部署完成";
    elements.turnMessage.textContent =
      "能量有限：保留能量和跳过高费牌同样是策略。";
  }
  return outcome;
}

async function runAudit(animationDelay = 150) {
  if (auditRunning) return;
  auditRunning = true;
  elements.auditModal.hidden = true;
  while (latestState.phase === "audit") {
    await playResolution("audit", animationDelay);
    await wait(80);
  }
  auditRunning = false;
}

function resetResolutionSteps() {
  for (const item of elements.resolutionSteps) {
    item.classList.remove("active", "complete");
  }
}

function wait(duration) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return new Promise((resolve) =>
    window.setTimeout(resolve, reducedMotion ? 15 : duration),
  );
}

function buildHistoryChart() {
  const history = engine.state.history;
  const width = 700;
  const height = 300;
  const padding = { top: 22, right: 24, bottom: 35, left: 38 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxTurn = Math.max(18, history[history.length - 1]?.turn || 1);
  const x = (turn) => padding.left + (turn / maxTurn) * innerWidth;
  const y = (value) =>
    padding.top + innerHeight - Math.min(1.8, value) / 1.8 * innerHeight;
  const pathFor = (key, target) =>
    history
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${x(point.turn).toFixed(1)} ${y(point.groups[key] / target).toFixed(1)}`,
      )
      .join(" ");
  const verticals = Array.from({ length: maxTurn + 1 }, (_, index) => {
    const position = x(index);
    return `<line x1="${position}" y1="${padding.top}" x2="${position}" y2="${height - padding.bottom}" />`;
  }).join("");
  const labels = Array.from(
    { length: maxTurn + 1 },
    (_, index) =>
      index % 2 === 0
        ? `<text x="${x(index)}" y="${height - 12}" text-anchor="middle">${index}</text>`
        : "",
  ).join("");
  const auditX = x(8);

  elements.historyChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="营养级历史曲线">
      <rect x="${auditX}" y="${padding.top}" width="${width - padding.right - auditX}" height="${innerHeight}" fill="rgba(108,158,155,0.07)" />
      <text x="${auditX + 8}" y="${padding.top + 14}" fill="#7fb2ad" font-size="10">无人干预考核</text>
      <g stroke="rgba(231,220,195,0.07)" stroke-width="1">
        ${verticals}
        <line x1="${padding.left}" y1="${y(1)}" x2="${width - padding.right}" y2="${y(1)}" stroke="rgba(238,183,92,0.28)" stroke-dasharray="5 5" />
        <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" />
      </g>
      <g fill="#7f887c" font-family="Segoe UI, Microsoft YaHei" font-size="10">${labels}</g>
      <path d="${pathFor("producer", 120)}" fill="none" stroke="#8eae63" stroke-width="3" />
      <path d="${pathFor("herbivore", 24)}" fill="none" stroke="#d7a361" stroke-width="3" />
      <path d="${pathFor("predator", 3)}" fill="none" stroke="#d66b47" stroke-width="3" />
    </svg>
  `;
}

function showResult(result) {
  elements.resultModal.hidden = false;
  elements.resultKicker.textContent = result.won
    ? "BIOME STABLE"
    : "STABILITY FAILED";
  elements.resultEmblem.textContent = result.won ? "◎" : "△";
  elements.resultTitle.textContent = result.won
    ? "生物群系通过稳定性考核"
    : "生物群系未能保持稳定";
  elements.resultCopy.textContent = result.won
    ? `系统在 ${result.auditTurns} 回合无人干预中维持了营养级和物种结构。`
    : "至少一项营养级波动超出允许区间，或残留物未得到有效控制。物种灭绝会作为额外警告显示。";

  const metrics = [
    [
      "生产者波动",
      `${Math.round(result.bands.producer.minimum * 100)}%–${Math.round(result.bands.producer.maximum * 100)}%`,
      result.checks.producer,
    ],
    [
      "草食动物波动",
      `${Math.round(result.bands.herbivore.minimum * 100)}%–${Math.round(result.bands.herbivore.maximum * 100)}%`,
      result.checks.herbivore,
    ],
    [
      "捕食者波动",
      `${Math.round(result.bands.predator.minimum * 100)}%–${Math.round(result.bands.predator.maximum * 100)}%`,
      result.checks.predator,
    ],
    [
      "物种保留",
      result.checks.retainedSpecies ? "完整" : "发生灭绝",
      result.checks.retainedSpecies,
    ],
    [
      "残留控制",
      `${result.remains}`,
      result.checks.remains,
    ],
    [
      "最终稳定度",
      `${result.stability}`,
      result.stability >= 60,
    ],
  ];
  elements.resultMetrics.innerHTML = metrics
    .map(
      ([label, value, passed]) =>
        `<div><span>${label}</span><strong style="color:${passed ? "#89b97b" : "#d66b47"}">${value}</strong></div>`,
    )
    .join("");
}

function handleEffect(effect) {
  if (effect.type === "auditStarted") {
    elements.auditModal.hidden = false;
  }
  if (effect.type === "levelResult") {
    showResult(effect.result);
  }
}

elements.zoneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!selectedCardId) {
      elements.placementHint.textContent = "请先从下方选择一张生物牌";
      return;
    }
    const result = engine.deployCard(selectedCardId, button.dataset.zone);
    elements.placementHint.textContent = result.reason;
    if (result.ok) {
      selectedCardId = null;
      button.classList.remove("deploy-flash");
      void button.offsetWidth;
      button.classList.add("deploy-flash");
      mapScene?.showDeploy(result.zoneId, result.card);
    }
  });
});

elements.clearSelection.addEventListener("click", () => {
  selectedCardId = null;
  if (latestState) render(latestState);
});
elements.endTurn.addEventListener("click", () => playResolution("player"));
elements.startAuditButton.addEventListener("click", () => runAudit());
elements.historyButton.addEventListener("click", () => {
  buildHistoryChart();
  elements.historyModal.hidden = false;
});
document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".modal").hidden = true;
  });
});
elements.historyModal.addEventListener("click", (event) => {
  if (event.target === elements.historyModal) {
    elements.historyModal.hidden = true;
  }
});
elements.restartButton.addEventListener("click", () => {
  elements.resultModal.hidden = true;
  elements.auditModal.hidden = true;
  elements.environmentModal.hidden = false;
  selectedCardId = null;
  auditRunning = false;
  resetResolutionSteps();
  elements.resolutionTitle.textContent = "等待环境选择";
  elements.turnMessage.textContent =
    "不同环境会改变植物增长、承载力或分解能力。";
  engine.reset();
});

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "phaser-game",
  backgroundColor: "#263024",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: "100%",
    height: "100%",
  },
  render: {
    antialias: true,
    pixelArt: false,
  },
  scene: SavannaScene,
});

engine = new EcosystemEngine(render, handleEffect);
renderEnvironmentChoices();

window.gameDebug = {
  engine,
  cards: CARD_LIBRARY,
  environments: ENVIRONMENTS,
  species: SPECIES,
  zones: ZONES,
  playResolution,
  resolveInstant: () => playResolution("player", 5),
  runAuditInstant: () => runAudit(5),
};
