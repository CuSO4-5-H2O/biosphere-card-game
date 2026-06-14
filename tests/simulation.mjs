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

const STRATEGIES = {
  balanced: {
    name: "均衡食物网",
    producerTarget: 220,
    producerBeforeHerd: 105,
    herbivoreTarget: 28,
    predatorTarget: 3,
    preyBeforePredator: 20,
    speciesCaps: { gazelle: 12, zebra: 8, wildebeest: 10 },
    preferCheap: false,
    preferRiver: true,
  },
  producer_first: {
    name: "生产者优先",
    producerTarget: 300,
    producerBeforeHerd: 145,
    herbivoreTarget: 25,
    predatorTarget: 2,
    preyBeforePredator: 18,
    speciesCaps: { gazelle: 11, zebra: 7, wildebeest: 9 },
    preferCheap: false,
    preferRiver: false,
  },
  diverse_herd: {
    name: "多样草食群",
    producerTarget: 245,
    producerBeforeHerd: 115,
    herbivoreTarget: 36,
    predatorTarget: 3,
    preyBeforePredator: 25,
    speciesCaps: { gazelle: 14, zebra: 10, wildebeest: 13 },
    preferCheap: false,
    preferRiver: true,
  },
  low_cost: {
    name: "低费节奏",
    producerTarget: 195,
    producerBeforeHerd: 90,
    herbivoreTarget: 27,
    predatorTarget: 2,
    preyBeforePredator: 18,
    speciesCaps: { gazelle: 18, zebra: 0, wildebeest: 9 },
    preferCheap: true,
    preferRiver: true,
  },
};

function zoneCount(engine, zoneId, groupId) {
  return Object.entries(engine.state.zones[zoneId].populations)
    .filter(([speciesId]) => SPECIES[speciesId].group === groupId)
    .reduce(
      (sum, [, cohorts]) =>
        sum +
        cohorts.reduce(
          (subtotal, cohort) => subtotal + cohort.count,
          0,
        ),
      0,
    );
}

function chooseProducerZone(engine, card, strategy) {
  const plains = zoneCount(engine, "plains", "producer");
  const river = zoneCount(engine, "riverbank", "producer");
  const thicket = zoneCount(engine, "thicket", "producer");

  if (strategy.preferRiver && card.allowedZones.includes("riverbank")) {
    if (river < 100) return "riverbank";
    if (plains < 115) return "plains";
  } else {
    if (plains < 135) return "plains";
    if (river < 85 && card.allowedZones.includes("riverbank")) {
      return "riverbank";
    }
  }
  if (card.allowedZones.includes("thicket") && thicket < 70) {
    return "thicket";
  }
  return card.allowedZones.includes("plains") ? "plains" : null;
}

function chooseHerbivoreZone(engine, card, strategy) {
  const riverPlants = zoneCount(engine, "riverbank", "producer");
  const riverHerd = zoneCount(engine, "riverbank", "herbivore");
  const plainsPlants = zoneCount(engine, "plains", "producer");
  const plainsHerd = zoneCount(engine, "plains", "herbivore");

  if (
    strategy.preferRiver &&
    card.allowedZones.includes("riverbank") &&
    riverPlants >= 50 &&
    riverHerd < Math.ceil(strategy.herbivoreTarget * 0.46)
  ) {
    return "riverbank";
  }
  if (
    card.allowedZones.includes("plains") &&
    plainsPlants >= 55 &&
    plainsHerd < Math.ceil(strategy.herbivoreTarget * 0.72)
  ) {
    return "plains";
  }
  if (
    card.allowedZones.includes("riverbank") &&
    riverPlants > riverHerd * 2
  ) {
    return "riverbank";
  }
  return null;
}

function chooseZone(engine, card, strategy) {
  const groups = engine.groupTotals();
  const species = engine.speciesTotals();
  const group = SPECIES[card.species].group;

  if (group === "producer") {
    if (
      groups.producer >= strategy.producerTarget &&
      card.cost > 1
    ) {
      return null;
    }
    return chooseProducerZone(engine, card, strategy);
  }

  if (group === "herbivore") {
    if (
      groups.producer < strategy.producerBeforeHerd ||
      groups.herbivore >= strategy.herbivoreTarget ||
      species[card.species] >=
        (strategy.speciesCaps[card.species] ?? strategy.herbivoreTarget)
    ) {
      return null;
    }
    return chooseHerbivoreZone(engine, card, strategy);
  }

  if (
    groups.herbivore < strategy.preyBeforePredator ||
    groups.predator >= strategy.predatorTarget
  ) {
    return null;
  }
  if (card.species === "hyena" && engine.state.remains < 8) {
    return null;
  }
  return card.allowedZones.includes("plains") ? "plains" : "thicket";
}

function cardPriority(engine, card, strategy) {
  const groups = engine.groupTotals();
  const group = SPECIES[card.species].group;
  let priority = 8;
  if (
    groups.producer < strategy.producerBeforeHerd &&
    group === "producer"
  ) {
    priority = 0;
  } else if (
    groups.herbivore < strategy.herbivoreTarget &&
    group === "herbivore"
  ) {
    priority = 2;
  } else if (
    groups.herbivore >= strategy.preyBeforePredator &&
    groups.predator < strategy.predatorTarget &&
    group === "predator"
  ) {
    priority = card.species === "lion" ? 1 : 5;
  } else if (group === "producer") {
    priority = 3;
  } else if (group === "herbivore") {
    priority = 4;
  }
  return priority * 10 + (strategy.preferCheap ? card.cost : 0);
}

function playSeed(seed, environmentId, strategyId) {
  const strategy = STRATEGIES[strategyId];
  const engine = new EcosystemEngine(
    () => {},
    () => {},
    seededRandom(seed),
  );
  engine.chooseEnvironment(environmentId);

  for (let turn = 1; turn <= engine.state.maxTurns; turn += 1) {
    const playable = [...engine.state.hand].sort(
      (left, right) =>
        cardPriority(engine, left, strategy) -
          cardPriority(engine, right, strategy) ||
        left.cost - right.cost,
    );
    for (const card of playable) {
      if (
        strategy.preferCheap &&
        card.cost >= 4 &&
        engine.state.energy < engine.state.maxEnergy
      ) {
        continue;
      }
      const zoneId = chooseZone(engine, card, strategy);
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
    strategyId,
    result: engine.result(),
    finalSpecies: engine.speciesTotals(),
  };
}

const environments = ["monsoon", "black_soil", "termite_network"];
const strategyIds = Object.keys(STRATEGIES);
const runs = strategyIds.flatMap((strategyId) =>
  environments.flatMap((environmentId) =>
    Array.from({ length: 24 }, (_, index) =>
      playSeed(index + 1, environmentId, strategyId),
    ),
  ),
);

const strategySummary = Object.fromEntries(
  strategyIds.map((strategyId) => {
    const strategyRuns = runs.filter(
      (run) => run.strategyId === strategyId,
    );
    return [
      strategyId,
      {
        name: STRATEGIES[strategyId].name,
        wins: strategyRuns.filter((run) => run.result.won).length,
        total: strategyRuns.length,
        winRate: Math.round(
          (strategyRuns.filter((run) => run.result.won).length /
            strategyRuns.length) *
            100,
        ),
      },
    ];
  }),
);

const environmentSummary = Object.fromEntries(
  environments.map((environmentId) => {
    const environmentRuns = runs.filter(
      (run) => run.environmentId === environmentId,
    );
    return [
      environmentId,
      {
        wins: environmentRuns.filter((run) => run.result.won).length,
        total: environmentRuns.length,
      },
    ];
  }),
);

const failedRuns = runs.filter((run) => !run.result.won);
const failureChecks = Object.fromEntries(
  ["launch", "producer", "herbivore", "predator", "remains"].map(
    (check) => [
      check,
      failedRuns.filter((run) => !run.result.checks[check]).length,
    ],
  ),
);
const totalWins = runs.length - failedRuns.length;

console.log(
  JSON.stringify(
    {
      strategySummary,
      environmentSummary,
      totalWins,
      totalRuns: runs.length,
      overallWinRate: Math.round((totalWins / runs.length) * 100),
      failureChecks,
    },
    null,
    2,
  ),
);

const everyStrategyPlayable = Object.values(strategySummary).every(
  (summary) => summary.winRate >= 55,
);
if (!everyStrategyPlayable || totalWins / runs.length < 0.62) {
  process.exitCode = 1;
}
