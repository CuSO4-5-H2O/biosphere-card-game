import {
  EcosystemEngine,
  SPECIES,
} from "../src/core/ecosystem.js";

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function chooseZone(engine, card) {
  const groups = engine.groupTotals();
  const species = engine.speciesTotals();
  const zone = engine.state.zones;
  const zoneCount = (zoneId, group) =>
    Object.entries(zone[zoneId].populations)
      .filter(([speciesId]) => SPECIES[speciesId].group === group)
      .reduce(
        (sum, [, cohorts]) =>
          sum + cohorts.reduce((subtotal, cohort) => subtotal + cohort.count, 0),
        0,
      );

  if (SPECIES[card.species].group === "producer") {
    if (groups.producer >= 210 && card.cost > 1) return null;
    const plainsPlants = zoneCount("plains", "producer");
    const riverPlants = zoneCount("riverbank", "producer");
    if (plainsPlants < 115) return "plains";
    if (riverPlants < 85 && card.allowedZones.includes("riverbank")) {
      return "riverbank";
    }
    return card.allowedZones.includes("thicket") ? "thicket" : null;
  }

  if (SPECIES[card.species].group === "herbivore") {
    if (groups.producer < 105 || groups.herbivore >= 27) return null;
    if (card.species === "gazelle" && species.gazelle >= 10) return null;
    if (card.species === "zebra" && species.zebra >= 7) return null;
    if (card.species === "wildebeest" && species.wildebeest >= 9) {
      return null;
    }
    const plainsLoad = zoneCount("plains", "herbivore");
    const riverLoad = zoneCount("riverbank", "herbivore");
    if (riverLoad < 12 && zoneCount("riverbank", "producer") >= 55) {
      return "riverbank";
    }
    return plainsLoad < 22 ? "plains" : null;
  }

  if (card.species === "lion") {
    if (groups.herbivore < 18 || species.lion >= 3) return null;
    return "plains";
  }

  if (card.species === "hyena") {
    if (
      groups.herbivore < 28 ||
      groups.predator >= 4 ||
      engine.state.remains < 12
    ) {
      return null;
    }
    return "thicket";
  }
  return null;
}

function cardPriority(engine, card) {
  const groups = engine.groupTotals();
  const group = SPECIES[card.species].group;
  if (groups.producer < 120 && group === "producer") return 0;
  if (groups.producer >= 105 && groups.herbivore < 22 && group === "herbivore") {
    return 1;
  }
  if (groups.herbivore >= 22 && groups.predator < 3 && group === "predator") {
    return card.species === "lion" ? 2 : 5;
  }
  if (group === "producer") return 3;
  if (group === "herbivore") return 4;
  return 5;
}

function playSeed(seed, environmentId) {
  const engine = new EcosystemEngine(
    () => {},
    () => {},
    seededRandom(seed),
  );
  engine.chooseEnvironment(environmentId);

  for (let turn = 1; turn <= engine.state.maxTurns; turn += 1) {
    const playable = [...engine.state.hand].sort(
      (left, right) =>
        cardPriority(engine, left) - cardPriority(engine, right) ||
        left.cost - right.cost,
    );
    for (const card of playable) {
      const zoneId = chooseZone(engine, card);
      if (zoneId && engine.state.energy >= card.cost) {
        engine.deployCard(card.instanceId, zoneId);
      }
    }
    engine.beginResolution("player");
    engine.finishResolution();
  }

  while (engine.state.phase === "audit") {
    engine.beginResolution("audit");
    engine.finishResolution();
  }

  return {
    seed,
    environmentId,
    result: engine.result(),
    lionHistory: engine.state.history.map((point) => point.species.lion),
    finalSpecies: engine.speciesTotals(),
    history: engine.state.history,
  };
}

const environments = ["monsoon", "black_soil", "termite_network"];
const runs = environments.flatMap((environmentId) =>
  Array.from({ length: 30 }, (_, index) =>
    playSeed(index + 1, environmentId),
  ),
);
const summaries = Object.fromEntries(
  environments.map((environmentId) => {
    const environmentRuns = runs.filter(
      (run) => run.environmentId === environmentId,
    );
    return [
      environmentId,
      {
        wins: environmentRuns.filter((run) => run.result.won).length,
        total: environmentRuns.length,
        lionSurvival: environmentRuns.filter(
          (run) => run.finalSpecies.lion > 0,
        ).length,
      },
    ];
  }),
);
const totalWins = runs.filter((run) => run.result.won).length;
const sample = runs.find((run) => run.result.won) || runs[0];
const failedRuns = runs.filter((run) => !run.result.won);
const failureChecks = Object.fromEntries(
  ["launch", "producer", "herbivore", "predator", "remains"].map(
    (check) => [
      check,
      failedRuns.filter((run) => !run.result.checks[check]).length,
    ],
  ),
);

console.log(
  JSON.stringify(
    {
      summaries,
      totalWins,
      totalRuns: runs.length,
      sample: {
        seed: sample.seed,
        environmentId: sample.environmentId,
        result: sample.result,
        lionHistory: sample.lionHistory,
        finalSpecies: sample.finalSpecies,
      },
      failureChecks,
    },
    null,
    2,
  ),
);

if (totalWins < 45) {
  process.exitCode = 1;
}
