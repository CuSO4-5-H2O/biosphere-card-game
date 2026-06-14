export const ZONES = {
  riverbank: {
    id: "riverbank",
    name: "河岸草甸",
    plantGrowth: 1.25,
    grazing: 1.08,
    huntChance: 0.66,
    plantCapacity: 220,
  },
  plains: {
    id: "plains",
    name: "开阔草原",
    plantGrowth: 1,
    grazing: 1,
    huntChance: 0.82,
    plantCapacity: 190,
  },
  thicket: {
    id: "thicket",
    name: "金合欢灌丛",
    plantGrowth: 0.84,
    grazing: 0.9,
    huntChance: 0.58,
    plantCapacity: 155,
  },
};

export const SPECIES = {
  grass: {
    id: "grass",
    name: "红燕麦草",
    shortName: "草",
    group: "producer",
    unit: "生物量",
  },
  acacia: {
    id: "acacia",
    name: "伞形金合欢",
    shortName: "树",
    group: "producer",
    unit: "生物量",
  },
  gazelle: {
    id: "gazelle",
    name: "汤氏瞪羚",
    shortName: "羚",
    group: "herbivore",
    unit: "只",
    foodNeed: 1.5,
    reproduction: 0.1,
    preyValue: 1.2,
  },
  zebra: {
    id: "zebra",
    name: "平原斑马",
    shortName: "斑",
    group: "herbivore",
    unit: "只",
    foodNeed: 2.1,
    reproduction: 0.07,
    preyValue: 2.1,
  },
  wildebeest: {
    id: "wildebeest",
    name: "蓝角马",
    shortName: "角",
    group: "herbivore",
    unit: "只",
    foodNeed: 1.9,
    reproduction: 0.08,
    preyValue: 1.9,
  },
  lion: {
    id: "lion",
    name: "非洲狮",
    shortName: "狮",
    group: "predator",
    unit: "只",
    foodNeed: 0.62,
    reproduction: 0.48,
  },
  hyena: {
    id: "hyena",
    name: "斑鬣狗",
    shortName: "鬣",
    group: "predator",
    unit: "只",
    foodNeed: 0.48,
    reproduction: 0.34,
  },
};

export const CARD_LIBRARY = {
  grass_deep: {
    id: "grass_deep",
    species: "grass",
    name: "深根红燕麦草",
    latin: "Themeda triandra",
    role: "生产者",
    cost: 1,
    amount: 24,
    unit: "生物量",
    traitName: "深根",
    traitText: "干旱造成的生长损失降低 55%。",
    text: "稳定建立草本群落，适合抵抗天气波动。",
    allowedZones: ["riverbank", "plains", "thicket"],
    traits: { droughtResist: 0.55, growth: 0.05 },
  },
  grass_fast: {
    id: "grass_fast",
    species: "grass",
    name: "速生红燕麦草",
    latin: "Themeda triandra",
    role: "生产者",
    cost: 2,
    amount: 42,
    unit: "生物量",
    traitName: "快速分蘖",
    traitText: "每回合植物生长效率提高 25%。",
    text: "更快形成食物基础，但部署成本较高。",
    allowedZones: ["riverbank", "plains", "thicket"],
    traits: { growth: 0.25, droughtResist: -0.08 },
  },
  acacia_shelter: {
    id: "acacia_shelter",
    species: "acacia",
    name: "庇护型金合欢",
    latin: "Vachellia tortilis",
    role: "生产者",
    cost: 2,
    amount: 24,
    unit: "生物量",
    traitName: "荫蔽层",
    traitText: "同区域草食动物被捕食概率降低 10%。",
    text: "提供可食嫩叶，并为小型动物创造躲避空间。",
    allowedZones: ["plains", "thicket"],
    traits: { growth: 0.08, shelter: 0.1, droughtResist: 0.25 },
  },
  gazelle_vigilant: {
    id: "gazelle_vigilant",
    species: "gazelle",
    name: "警觉汤氏瞪羚",
    latin: "Eudorcas thomsonii",
    role: "初级消费者",
    cost: 2,
    amount: 8,
    unit: "只",
    traitName: "警戒哨",
    traitText: "被捕食成功率降低 18%，繁殖率略低。",
    text: "更擅长维持小规模、长期存活的种群。",
    allowedZones: ["riverbank", "plains", "thicket"],
    traits: { evasion: 0.18, reproduction: -0.05 },
  },
  gazelle_fecund: {
    id: "gazelle_fecund",
    species: "gazelle",
    name: "高繁殖汤氏瞪羚",
    latin: "Eudorcas thomsonii",
    role: "初级消费者",
    cost: 2,
    amount: 9,
    unit: "只",
    traitName: "早熟",
    traitText: "繁殖效率提高 28%，食物需求提高 10%。",
    text: "快速扩大猎物基础，也更容易造成过度放牧。",
    allowedZones: ["riverbank", "plains", "thicket"],
    traits: { reproduction: 0.28, foodNeed: 0.1 },
  },
  zebra_hardy: {
    id: "zebra_hardy",
    species: "zebra",
    name: "耐旱平原斑马",
    latin: "Equus quagga",
    role: "大型草食动物",
    cost: 3,
    amount: 7,
    unit: "只",
    traitName: "耐旱代谢",
    traitText: "干旱期食物压力降低，基础食量减少 8%。",
    text: "个体强健，是狮群偏好的高价值猎物。",
    allowedZones: ["riverbank", "plains"],
    traits: { droughtResist: 0.35, foodNeed: -0.08, evasion: 0.04 },
  },
  wildebeest_migrant: {
    id: "wildebeest_migrant",
    species: "wildebeest",
    name: "迁徙型蓝角马",
    latin: "Connochaetes taurinus",
    role: "大型草食动物",
    cost: 3,
    amount: 10,
    unit: "只",
    traitName: "季节迁徙",
    traitText: "缺食时死亡率降低，繁殖率提高 8%。",
    text: "数量可观，为大型捕食者提供稳定猎物。",
    allowedZones: ["riverbank", "plains"],
    traits: { migration: 0.3, reproduction: 0.08 },
  },
  lion_hunters: {
    id: "lion_hunters",
    species: "lion",
    name: "协同狩猎狮群",
    latin: "Panthera leo",
    role: "顶级捕食者",
    cost: 3,
    amount: 2,
    unit: "只",
    traitName: "协同围猎",
    traitText: "捕食成功率提高 16%，繁殖率略低。",
    text: "小型但高效的狮群，适合控制增长过快的猎物。",
    allowedZones: ["plains", "thicket"],
    traits: { huntBonus: 0.16, reproduction: -0.05 },
  },
  lion_pride: {
    id: "lion_pride",
    species: "lion",
    name: "繁育型狮群",
    latin: "Panthera leo",
    role: "顶级捕食者",
    cost: 4,
    amount: 3,
    unit: "只",
    traitName: "稳定狮群",
    traitText: "繁殖概率提高 25%，连续缺食后才会减员。",
    text: "部署昂贵，但更容易建立可持续的捕食者种群。",
    allowedZones: ["plains", "thicket"],
    traits: { huntBonus: 0.06, reproduction: 0.25, hungerBuffer: 1 },
  },
  hyena_scavenger: {
    id: "hyena_scavenger",
    species: "hyena",
    name: "食腐斑鬣狗群",
    latin: "Crocuta crocuta",
    role: "捕食与食腐者",
    cost: 3,
    amount: 3,
    unit: "只",
    traitName: "机会主义",
    traitText: "优先利用残留物，食物不足时才主动狩猎。",
    text: "缓解分解压力，但会与狮群竞争猎物。",
    allowedZones: ["plains", "thicket"],
    traits: { scavenging: 0.55, huntBonus: 0.04 },
  },
};

export const ENVIRONMENTS = {
  monsoon: {
    id: "monsoon",
    name: "季风雨带",
    category: "气候环境",
    text: "植物生长提高 18%，短期干旱的负面效果减半。",
    detail: "适合快速建立生产者，但无法解决残留物堆积。",
    modifiers: {
      plantGrowth: 1.18,
      capacity: 1,
      droughtMitigation: 0.5,
      decomposerBonus: 0,
      nutrientReturn: 1,
    },
  },
  black_soil: {
    id: "black_soil",
    name: "黑棉土层",
    category: "土壤环境",
    text: "初始土壤养分 +22，区域植物承载力提高 15%。",
    detail: "适合维持较大的食物基础，天气抗性一般。",
    modifiers: {
      plantGrowth: 1.06,
      capacity: 1.15,
      droughtMitigation: 0,
      decomposerBonus: 0,
      nutrientReturn: 1,
      initialNutrients: 22,
    },
  },
  termite_network: {
    id: "termite_network",
    name: "白蚁丘网络",
    category: "分解环境",
    text: "每回合分解能力 +10，养分返还效率提高 18%。",
    detail: "适合高密度动物群落，能显著降低生态污染。",
    modifiers: {
      plantGrowth: 1,
      capacity: 1,
      droughtMitigation: 0,
      decomposerBonus: 10,
      nutrientReturn: 1.18,
    },
  },
};

const STARTER_DECK = [
  "grass_deep",
  "grass_deep",
  "grass_deep",
  "grass_fast",
  "grass_fast",
  "acacia_shelter",
  "acacia_shelter",
  "gazelle_vigilant",
  "gazelle_vigilant",
  "gazelle_fecund",
  "gazelle_fecund",
  "zebra_hardy",
  "wildebeest_migrant",
  "wildebeest_migrant",
  "lion_hunters",
  "lion_hunters",
  "lion_pride",
  "hyena_scavenger",
];

const GROUPS = {
  producer: ["grass", "acacia"],
  herbivore: ["gazelle", "zebra", "wildebeest"],
  predator: ["lion", "hyena"],
};

const HAND_SIZE = 5;
const MAX_ENERGY = 6;
const PLAYER_TURNS = 8;
const AUDIT_TURNS = 10;
const BASE_DECOMPOSER_CAPACITY = 16;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function shuffled(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function weightedChoice(entries, random) {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (total <= 0) return null;
  let roll = random() * total;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry.value;
  }
  return entries[entries.length - 1]?.value ?? null;
}

export class EcosystemEngine {
  constructor(onChange, onEffect, random = Math.random) {
    this.onChange = onChange;
    this.onEffect = onEffect;
    this.random = random;
    this.cardSequence = 0;
    this.reset();
  }

  reset() {
    this.state = {
      phase: "environment",
      resolutionMode: null,
      turn: 1,
      maxTurns: PLAYER_TURNS,
      auditRound: 0,
      auditTurns: AUDIT_TURNS,
      auditBaseline: null,
      environment: null,
      currentEvent: null,
      energy: 4,
      maxEnergy: MAX_ENERGY,
      nutrients: 30,
      remains: 0,
      zones: Object.fromEntries(
        Object.keys(ZONES).map((zoneId) => [
          zoneId,
          {
            populations: Object.fromEntries(
              Object.keys(SPECIES).map((speciesId) => [speciesId, []]),
            ),
            hunger: Object.fromEntries(
              Object.keys(SPECIES).map((speciesId) => [speciesId, 0]),
            ),
            reproductionCooldown: Object.fromEntries(
              Object.keys(SPECIES).map((speciesId) => [speciesId, 0]),
            ),
          },
        ]),
      ),
      hand: [],
      drawPile: shuffled(
        STARTER_DECK.map((cardId) => this.createCard(cardId)),
        this.random,
      ),
      discardPile: [],
      events: [
        {
          turn: "准备",
          text: "请选择一张全局环境牌，再开始建立草原生物群系。",
        },
      ],
      history: [],
      lastDeltas: {
        producer: 0,
        herbivore: 0,
        predator: 0,
      },
      lastResolution: null,
    };
    this.state.history.push(this.historyPoint(0, "准备"));
    this.change();
  }

  chooseEnvironment(environmentId) {
    if (this.state.phase !== "environment") return false;
    const environment = ENVIRONMENTS[environmentId];
    if (!environment) return false;

    this.state.environment = environmentId;
    this.state.nutrients += environment.modifiers.initialNutrients || 0;
    this.state.phase = "deploy";
    this.drawCards(HAND_SIZE);
    this.addEvent("环境", `选择「${environment.name}」作为本局全局环境。`);
    this.change();
    return true;
  }

  createCard(cardId) {
    this.cardSequence += 1;
    return {
      ...CARD_LIBRARY[cardId],
      instanceId: `${cardId}-${this.cardSequence}`,
    };
  }

  deployCard(instanceId, zoneId) {
    if (this.state.phase !== "deploy") {
      return { ok: false, reason: "当前不在部署阶段。" };
    }

    const cardIndex = this.state.hand.findIndex(
      (card) => card.instanceId === instanceId,
    );
    if (cardIndex < 0) {
      return { ok: false, reason: "这张牌已不在手牌中。" };
    }

    const card = this.state.hand[cardIndex];
    if (!card.allowedZones.includes(zoneId)) {
      return { ok: false, reason: `${card.name} 不适合投放到这个区域。` };
    }
    if (this.state.energy < card.cost) {
      return { ok: false, reason: "部署能量不足，需要保留或更换卡牌。" };
    }

    this.state.energy -= card.cost;
    this.addCohort(zoneId, card.species, card.amount, card);
    this.state.hand.splice(cardIndex, 1);
    this.state.discardPile.push(card);
    this.addEvent(
      this.state.turn,
      `向${ZONES[zoneId].name}投放${card.name}：+${card.amount}${card.unit}。`,
    );
    this.change();
    return {
      ok: true,
      reason: `${card.name}已进入${ZONES[zoneId].name}。`,
      card,
      zoneId,
    };
  }

  beginResolution(mode = "player") {
    const expectedPhase = mode === "audit" ? "audit" : "deploy";
    if (this.state.phase !== expectedPhase) return [];

    this.state.phase = "resolving";
    this.state.resolutionMode = mode;
    if (mode === "player") {
      this.state.discardPile.push(...this.state.hand);
      this.state.hand = [];
    }
    this.change();

    const before = this.groupTotals();
    const steps = [];
    const environment = this.environment();
    const eventContext = this.resolveRandomEvent(mode);
    const feedingRatios = {};
    const feedingSurpluses = {};
    const huntingResults = {};
    let generatedRemains = 0;
    let totalGrowth = 0;
    let totalConsumed = 0;
    let totalKills = 0;

    steps.push(
      this.makeStep(
        "event",
        eventContext.title,
        eventContext.message,
      ),
    );

    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      const producerTotal = this.zoneGroupCount(zone, "producer");
      if (producerTotal <= 0) continue;

      const zoneRule = ZONES[zoneId];
      const capacity =
        zoneRule.plantCapacity * environment.modifiers.capacity;
      const capacityLeft = Math.max(0, capacity - producerTotal);
      const nutrientFactor = clamp(
        0.68 + this.state.nutrients / 130,
        0.68,
        1.18,
      );
      const growthTrait = this.groupTrait(zone, "producer", "growth");
      const droughtResist = this.groupTrait(
        zone,
        "producer",
        "droughtResist",
      );
      let eventGrowth = eventContext.growthMultiplier;
      if (eventContext.id === "drought") {
        eventGrowth +=
          droughtResist * 0.28 +
          environment.modifiers.droughtMitigation * 0.22;
      }
      const growth = Math.min(
        Math.floor(capacityLeft),
        Math.max(
          0,
          Math.round(
            16 *
              zoneRule.plantGrowth *
              environment.modifiers.plantGrowth *
              eventGrowth *
              nutrientFactor *
              (1 + growthTrait),
          ),
        ),
      );
      this.growProducerCohorts(zone, growth);
      totalGrowth += growth;
    }

    const nutrientUse = Math.min(
      this.state.nutrients,
      Math.ceil(totalGrowth / 10),
    );
    this.state.nutrients -= nutrientUse;
    steps.push(
      this.makeStep(
        "sun",
        "阳光与植物生长",
        totalGrowth > 0
          ? `植物群落固定太阳能，生物量增加 ${totalGrowth}，消耗土壤养分 ${nutrientUse}。`
          : "场上没有可生长的生产者，太阳能没有进入食物链。",
      ),
    );

    let migratedHerbivores = 0;
    const migrationSources = Object.entries(this.state.zones).sort(
      ([, left], [, right]) =>
        this.zoneFoodBalance(left) - this.zoneFoodBalance(right),
    );
    for (const [sourceZoneId, sourceZone] of migrationSources) {
      const demand = this.zoneHerbivoreDemand(sourceZone);
      const supply = this.zoneGroupCount(sourceZone, "producer");
      if (demand <= 0 || supply >= demand * 0.9) continue;

      const targetEntry = Object.entries(this.state.zones)
        .filter(([zoneId]) => zoneId !== sourceZoneId)
        .sort(
          ([, left], [, right]) =>
            this.zoneFoodBalance(right) - this.zoneFoodBalance(left),
        )[0];
      if (!targetEntry) continue;
      const [, targetZone] = targetEntry;
      if (this.zoneFoodBalance(targetZone) <= this.zoneFoodBalance(sourceZone)) {
        continue;
      }

      const shortage = clamp(1 - supply / Math.max(1, demand), 0, 1);
      for (const speciesId of GROUPS.herbivore) {
        const count = this.speciesCount(sourceZone, speciesId);
        if (count <= 0) continue;
        const migrationTrait = this.speciesTrait(
          sourceZone,
          speciesId,
          "migration",
        );
        const moveRate = clamp(
          shortage * 0.16 + migrationTrait * 0.42,
          0,
          0.38,
        );
        const amount =
          count >= 4 && moveRate > 0.08
            ? Math.max(1, Math.floor(count * moveRate))
            : 0;
        migratedHerbivores += this.moveSpeciesCohorts(
          sourceZone,
          targetZone,
          speciesId,
          amount,
        );
      }
    }

    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      const plantSupply = this.zoneGroupCount(zone, "producer");
      const herbivoreNeed = GROUPS.herbivore.reduce((sum, speciesId) => {
        const count = this.speciesCount(zone, speciesId);
        const foodModifier =
          1 + this.speciesTrait(zone, speciesId, "foodNeed");
        const droughtModifier =
          eventContext.id === "drought"
            ? 1.1 -
              this.speciesTrait(zone, speciesId, "droughtResist") * 0.1
            : 1;
        return (
          sum +
          count *
            SPECIES[speciesId].foodNeed *
            foodModifier *
            droughtModifier
        );
      }, 0);

      const effectiveSupply = plantSupply * ZONES[zoneId].grazing;
      const resourceRatio =
        herbivoreNeed <= 0 ? 1 : effectiveSupply / herbivoreNeed;
      const feedRatio =
        herbivoreNeed <= 0
          ? 1
          : clamp(resourceRatio, 0, 1);
      const consumed = Math.min(
        plantSupply,
        Math.ceil(
          Math.min(herbivoreNeed, effectiveSupply) /
            ZONES[zoneId].grazing,
        ),
      );
      this.removeFromGroup(zone, "producer", consumed);
      totalConsumed += consumed;
      generatedRemains += Math.ceil(consumed * 0.07);
      for (const speciesId of GROUPS.herbivore) {
        feedingRatios[`${zoneId}:${speciesId}`] = feedRatio;
        feedingSurpluses[`${zoneId}:${speciesId}`] = resourceRatio;
      }
    }
    steps.push(
      this.makeStep(
        "graze",
        "草食动物采食",
        totalConsumed > 0
          ? `草食动物迁徙 ${migratedHerbivores} 只，共消耗 ${totalConsumed} 点植物生物量。食物缺口会累积饥饿，而不会立即清空种群。`
          : "本回合没有草食动物进行采食。",
      ),
    );

    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      for (const predatorId of GROUPS.predator) {
        const predatorCount = this.speciesCount(zone, predatorId);
        if (predatorCount <= 0) continue;

        let foodAcquired = 0;
        let scavenged = 0;
        if (predatorId === "hyena" && this.state.remains > 0) {
          const scavenging = this.speciesTrait(
            zone,
            predatorId,
            "scavenging",
          );
          scavenged = Math.min(
            this.state.remains,
            Math.ceil(predatorCount * (0.7 + scavenging)),
          );
          this.state.remains -= scavenged;
          foodAcquired += scavenged * 0.42;
        }

        const attempts = Math.max(
          1,
          Math.floor(
            (predatorCount + 1) / (predatorId === "lion" ? 3 : 4),
          ),
        );
        let successes = 0;
        for (let attempt = 0; attempt < attempts; attempt += 1) {
          const preyId = this.choosePrey(zone, predatorId);
          if (!preyId) break;

          const preyCount = this.speciesCount(zone, preyId);
          const totalPrey = this.zoneGroupCount(zone, "herbivore");
          const huntBonus = this.speciesTrait(
            zone,
            predatorId,
            "huntBonus",
          );
          const evasion = this.speciesTrait(zone, preyId, "evasion");
          const shelter = Math.min(
            0.13,
            this.speciesTrait(zone, "acacia", "shelter"),
          );
          const densityBonus = clamp(totalPrey / 70, 0, 0.15);
          const predatorFactor = predatorId === "lion" ? 1 : 0.78;
          const chance = clamp(
            ZONES[zoneId].huntChance * predatorFactor +
              huntBonus +
              densityBonus -
              evasion -
              shelter,
            0.2,
            0.92,
          );
          if (this.random() < chance) {
            this.removeSpecies(zone, preyId, 1);
            foodAcquired += SPECIES[preyId].preyValue;
            successes += 1;
            totalKills += 1;
            generatedRemains += 1;
          }
        }

        huntingResults[`${zoneId}:${predatorId}`] = {
          food: foodAcquired,
          successes,
          attempts,
          scavenged,
        };
      }
    }
    steps.push(
      this.makeStep(
        "hunt",
        "捕食与食腐",
        this.zoneGroupTotal("predator") > 0
          ? `捕食者本回合成功捕获 ${totalKills} 只猎物。狮群拥有更高成功率，鬣狗则可利用残留物。`
          : "尚未建立捕食者种群。",
      ),
    );

    let herbivoreBirths = 0;
    let herbivoreDeaths = 0;
    let predatorBirths = 0;
    let predatorDeaths = 0;

    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      for (const speciesId of GROUPS.herbivore) {
        const count = this.speciesCount(zone, speciesId);
        if (count <= 0) continue;
        const ratio = feedingRatios[`${zoneId}:${speciesId}`] ?? 1;
        const resourceRatio =
          feedingSurpluses[`${zoneId}:${speciesId}`] ?? 1;
        const migration = this.speciesTrait(
          zone,
          speciesId,
          "migration",
        );
        const reproduction =
          SPECIES[speciesId].reproduction *
          (1 + this.speciesTrait(zone, speciesId, "reproduction"));

        if (ratio >= 0.78) {
          zone.hunger[speciesId] = Math.max(
            0,
            zone.hunger[speciesId] - 1,
          );
          const breedingMultiplier = clamp(
            (resourceRatio - 1) / 1.8,
            0,
            1,
          );
          const expected =
            count * reproduction * ratio * breedingMultiplier;
          const births =
            Math.floor(expected) +
            (this.random() < expected % 1 ? 1 : 0);
          this.addBirths(zone, speciesId, Math.min(8, births));
          herbivoreBirths += Math.min(8, births);
        } else {
          zone.hunger[speciesId] += 1;
          if (zone.hunger[speciesId] >= 2) {
            const mortality =
              0.06 +
              (0.68 - ratio) * 0.24 -
              migration * 0.08;
            const deaths = Math.min(
              count,
              Math.max(1, Math.ceil(count * Math.max(0.03, mortality))),
            );
            this.removeSpecies(zone, speciesId, deaths);
            herbivoreDeaths += deaths;
            generatedRemains += deaths * 2;
            zone.hunger[speciesId] = 1;
          }
        }
      }

      for (const predatorId of GROUPS.predator) {
        const count = this.speciesCount(zone, predatorId);
        if (count <= 0) continue;
        if (zone.reproductionCooldown[predatorId] > 0) {
          zone.reproductionCooldown[predatorId] -= 1;
        }
        const result = huntingResults[`${zoneId}:${predatorId}`] || {
          food: 0,
          successes: 0,
        };
        const need = count * SPECIES[predatorId].foodNeed;
        const feedRatio = need <= 0 ? 1 : clamp(result.food / need, 0, 1.5);
        const hungerBuffer = Math.round(
          this.speciesTrait(zone, predatorId, "hungerBuffer"),
        );

        if (feedRatio >= 0.72) {
          zone.hunger[predatorId] = Math.max(
            0,
            zone.hunger[predatorId] - 1,
          );
          const preyCount = this.zoneGroupCount(zone, "herbivore");
          const preyThreshold =
            count * (predatorId === "lion" ? 8 : 7);
          if (
            count >= 2 &&
            feedRatio >= 0.9 &&
            preyCount >= preyThreshold &&
            zone.reproductionCooldown[predatorId] === 0
          ) {
            const reproductionChance = clamp(
              SPECIES[predatorId].reproduction +
                this.speciesTrait(
                  zone,
                  predatorId,
                  "reproduction",
                ) +
                Math.min(0.14, (feedRatio - 0.72) * 0.18),
              0.18,
              0.9,
            );
            if (this.random() < reproductionChance) {
              const births =
                count >= 5 && this.random() < reproductionChance * 0.35
                  ? 2
                  : 1;
              this.addBirths(zone, predatorId, births);
              predatorBirths += births;
              zone.reproductionCooldown[predatorId] = 2;
            }
          }
        } else {
          zone.hunger[predatorId] += 1;
          const deathThreshold = 2 + hungerBuffer;
          if (zone.hunger[predatorId] > deathThreshold) {
            const deaths = Math.min(
              count,
              Math.max(1, Math.ceil(count * 0.12)),
            );
            this.removeSpecies(zone, predatorId, deaths);
            predatorDeaths += deaths;
            generatedRemains += deaths * 5;
            zone.hunger[predatorId] = deathThreshold - 1;
          }
        }
      }

      generatedRemains += Math.ceil(
        this.zoneGroupCount(zone, "herbivore") * 0.1 +
          this.zoneGroupCount(zone, "predator") * 0.28,
      );
    }

    this.state.remains += generatedRemains;
    steps.push(
      this.makeStep(
        "metabolism",
        "代谢、繁殖与死亡",
        `草食动物出生 ${herbivoreBirths}、死亡 ${herbivoreDeaths}；捕食者出生 ${predatorBirths}、死亡 ${predatorDeaths}；新增残留 ${generatedRemains}。`,
      ),
    );

    const decompositionCapacity =
      BASE_DECOMPOSER_CAPACITY +
      environment.modifiers.decomposerBonus;
    const processed = Math.min(
      decompositionCapacity,
      this.state.remains,
    );
    const nutrientReturn = Math.floor(
      processed * 0.76 * environment.modifiers.nutrientReturn,
    );
    this.state.remains -= processed;
    this.state.nutrients = Math.min(
      110,
      this.state.nutrients + nutrientReturn,
    );
    steps.push(
      this.makeStep(
        "decompose",
        "分解循环",
        `分解系统处理 ${processed} 点残留，返还 ${nutrientReturn} 点土壤养分。`,
      ),
    );

    const groupsAfter = this.groupTotals();
    const baseEnergy = 2;
    const producerBonus = groupsAfter.producer >= 110 ? 1 : 0;
    const energyGain = baseEnergy + producerBonus;
    if (mode === "player") {
      this.state.energy = Math.min(
        MAX_ENERGY,
        this.state.energy + energyGain,
      );
    }
    this.state.lastDeltas = {
      producer: groupsAfter.producer - before.producer,
      herbivore: groupsAfter.herbivore - before.herbivore,
      predator: groupsAfter.predator - before.predator,
    };
    this.state.lastResolution = {
      totalGrowth,
      totalConsumed,
      totalKills,
      processed,
      energyGain,
      event: eventContext.id,
    };
    steps.push(
      this.makeStep(
        "energy",
        mode === "audit" ? "稳定性记录" : "部署能量结算",
        mode === "audit"
          ? `无人干预模拟完成：生产者 ${this.signed(this.state.lastDeltas.producer)}，草食动物 ${this.signed(this.state.lastDeltas.herbivore)}，捕食者 ${this.signed(this.state.lastDeltas.predator)}。`
          : `基础恢复 +${baseEnergy}${producerBonus ? "，健康生产者体系 +1" : ""}。未使用能量可保留，上限为 ${MAX_ENERGY}。`,
      ),
    );

    const historyTurn =
      mode === "audit"
        ? PLAYER_TURNS + this.state.auditRound + 1
        : this.state.turn;
    this.state.history.push(
      this.historyPoint(
        historyTurn,
        mode === "audit"
          ? `考核${this.state.auditRound + 1}`
          : `R${this.state.turn}`,
      ),
    );
    this.addEvent(
      mode === "audit"
        ? `考核${this.state.auditRound + 1}`
        : this.state.turn,
      `结算：生产者 ${this.signed(this.state.lastDeltas.producer)}，草食动物 ${this.signed(this.state.lastDeltas.herbivore)}，捕食者 ${this.signed(this.state.lastDeltas.predator)}。`,
    );
    return steps;
  }

  finishResolution() {
    if (this.state.phase !== "resolving") return null;

    if (this.state.resolutionMode === "audit") {
      this.state.auditRound += 1;
      if (this.state.auditRound >= this.state.auditTurns) {
        this.state.phase = "result";
        const result = this.result();
        this.change();
        this.onEffect({ type: "levelResult", result });
        return { result };
      }
      this.state.phase = "audit";
      this.change();
      return { auditContinues: true };
    }

    if (this.state.turn >= this.state.maxTurns) {
      this.state.auditBaseline = {
        groups: this.groupTotals(),
        species: this.speciesTotals(),
        historyIndex: this.state.history.length,
      };
      this.state.auditRound = 0;
      this.state.phase = "audit";
      this.change();
      this.onEffect({ type: "auditStarted" });
      return { auditStarted: true };
    }

    this.state.turn += 1;
    this.state.phase = "deploy";
    this.drawCards(HAND_SIZE);
    this.change();
    return { nextTurn: true };
  }

  resolveRandomEvent(mode) {
    const noEvent = {
      id: "calm",
      title: mode === "audit" ? "自然演替" : "平稳天气",
      message:
        mode === "audit"
          ? "没有外部干预，生态系统按当前结构继续运行。"
          : "本回合没有重大环境事件。",
      growthMultiplier: 1,
    };
    const eventChance = mode === "audit" ? 0.32 : 0.48;
    if (this.random() > eventChance) {
      this.state.currentEvent = noEvent;
      return noEvent;
    }

    const eventId = weightedChoice(
      [
        { value: "rain", weight: 24 },
        { value: "drought", weight: 22 },
        { value: "migration", weight: 19 },
        { value: "wildfire", weight: 14 },
        { value: "disease", weight: 15 },
        { value: "nutrient_flush", weight: 12 },
      ],
      this.random,
    );
    let context = {
      id: eventId,
      title: "随机事件",
      message: "",
      growthMultiplier: 1,
    };

    if (eventId === "rain") {
      this.state.nutrients = Math.min(110, this.state.nutrients + 5);
      context = {
        ...context,
        title: "季节性暴雨",
        message: "降雨补充土壤水分与养分，本回合植物生长提高 45%。",
        growthMultiplier: 1.45,
      };
    }
    if (eventId === "drought") {
      context = {
        ...context,
        title: "短期干旱",
        message: "植物生长下降，耐旱特性和季风雨带可缓解影响。",
        growthMultiplier: 0.54,
      };
    }
    if (eventId === "migration") {
      this.addCohort("plains", "wildebeest", 5, {
        id: "wild_migrants",
        name: "过境蓝角马",
        traitName: "过境种群",
        traits: { migration: 0.22 },
      });
      context = {
        ...context,
        title: "迁徙群到访",
        message: "5 只蓝角马进入开阔草原，增加猎物，也加大放牧压力。",
      };
    }
    if (eventId === "wildfire") {
      const targetZone = this.richestZone("producer");
      const zone = this.state.zones[targetZone];
      const lost = Math.ceil(
        this.zoneGroupCount(zone, "producer") * 0.13,
      );
      this.removeFromGroup(zone, "producer", lost);
      this.state.remains += Math.ceil(lost * 0.28);
      this.state.nutrients = Math.min(110, this.state.nutrients + 4);
      context = {
        ...context,
        title: "局部草原火",
        message: `${ZONES[targetZone].name}损失 ${lost} 点植物生物量，灰烬补充少量养分。`,
      };
    }
    if (eventId === "disease") {
      const target = this.largestHerbivorePopulation();
      let lost = 0;
      if (target) {
        lost = Math.max(1, Math.ceil(target.count * 0.08));
        this.removeSpecies(
          this.state.zones[target.zoneId],
          target.speciesId,
          lost,
        );
        this.state.remains += lost * 2;
      }
      context = {
        ...context,
        title: "草食动物疫病",
        message: target
          ? `${ZONES[target.zoneId].name}的${SPECIES[target.speciesId].name}减少 ${lost} 只。`
          : "没有足够密集的草食动物，疫病未形成传播。",
      };
    }
    if (eventId === "nutrient_flush") {
      this.state.nutrients = Math.min(110, this.state.nutrients + 14);
      context = {
        ...context,
        title: "河岸养分输入",
        message: "上游沉积物进入试验区，土壤养分增加 14。",
        growthMultiplier: 1.08,
      };
    }

    this.state.currentEvent = context;
    this.addEvent(
      mode === "audit"
        ? `考核${this.state.auditRound + 1}`
        : this.state.turn,
      `${context.title}：${context.message}`,
    );
    return context;
  }

  forecast() {
    const groups = this.groupTotals();
    let growth = 0;
    let demand = 0;
    let expectedHunts = 0;
    let huntAttempts = 0;
    const environment = this.environment();

    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      const producerCount = this.zoneGroupCount(zone, "producer");
      if (producerCount > 0) {
        const capacity =
          ZONES[zoneId].plantCapacity * environment.modifiers.capacity;
        growth += Math.min(
          Math.max(0, capacity - producerCount),
          Math.round(
            16 *
              ZONES[zoneId].plantGrowth *
              environment.modifiers.plantGrowth *
              (1 + this.groupTrait(zone, "producer", "growth")),
          ),
        );
      }
      for (const speciesId of GROUPS.herbivore) {
        demand +=
          this.speciesCount(zone, speciesId) *
          SPECIES[speciesId].foodNeed *
          (1 + this.speciesTrait(zone, speciesId, "foodNeed"));
      }
      for (const predatorId of GROUPS.predator) {
        const count = this.speciesCount(zone, predatorId);
        const attempts =
          count > 0
            ? Math.max(
                1,
                Math.floor(
                  (count + 1) / (predatorId === "lion" ? 3 : 4),
                ),
              )
            : 0;
        huntAttempts += attempts;
        if (groups.herbivore > 0) {
          expectedHunts +=
            attempts *
            clamp(
              ZONES[zoneId].huntChance *
                (predatorId === "lion" ? 1 : 0.78) +
                this.speciesTrait(zone, predatorId, "huntBonus"),
              0.2,
              0.92,
            );
        }
      }
    }

    return {
      plantGrowth: growth,
      plantSupply: groups.producer + growth,
      herbivoreDemand: Math.ceil(demand),
      huntAttempts,
      expectedHunts,
      energyGain: 2 + (groups.producer >= 110 ? 1 : 0),
    };
  }

  result() {
    const baseline = this.state.auditBaseline || {
      groups: this.groupTotals(),
      species: this.speciesTotals(),
      historyIndex: Math.max(0, this.state.history.length - AUDIT_TURNS),
    };
    const auditPoints = this.state.history.slice(baseline.historyIndex);
    const finalGroups = this.groupTotals();
    const finalSpecies = this.speciesTotals();
    const launchChecks = {
      producer: baseline.groups.producer >= 100,
      herbivore: baseline.groups.herbivore >= 20,
      predator: baseline.groups.predator >= 2,
    };
    const bands = {};

    for (const groupId of Object.keys(GROUPS)) {
      const base = Math.max(1, baseline.groups[groupId]);
      const values = auditPoints.map((point) => point.groups[groupId]);
      const ratios = values.map((value) => value / base);
      const settledRatios = ratios.slice(-5);
      const finalRatio = finalGroups[groupId] / base;
      const minimum = Math.min(...settledRatios, finalRatio);
      const maximum = Math.max(...settledRatios, finalRatio);
      const minimumAllowed =
        groupId === "producer" ? 0.35 : groupId === "herbivore" ? 0.3 : 0.34;
      const maximumAllowed = groupId === "producer" ? 2 : 2.5;
      const volatilityAllowed =
        groupId === "producer" ? 1.8 : groupId === "herbivore" ? 2 : 2.5;
      const uninterrupted = values.every((value) => value > 0);
      const volatility =
        maximum / Math.max(0.01, minimum);
      bands[groupId] = {
        minimum,
        maximum,
        volatility,
        uninterrupted,
        stable:
          uninterrupted &&
          finalRatio >= minimumAllowed &&
          finalRatio <= maximumAllowed &&
          volatility <= volatilityAllowed,
      };
    }

    const retainedSpecies = Object.entries(baseline.species)
      .filter(([, count]) => count > 0)
      .every(([speciesId]) => finalSpecies[speciesId] > 0);
    const remainsStable =
      this.state.remains <= 60 &&
      auditPoints.every((point) => point.remains <= 75);
    const checks = {
      launch: Object.values(launchChecks).every(Boolean),
      producer: bands.producer.stable,
      herbivore: bands.herbivore.stable,
      predator: bands.predator.stable,
      retainedSpecies,
      remains: remainsStable,
    };
    const requiredChecks = [
      checks.launch,
      checks.producer,
      checks.herbivore,
      checks.predator,
      checks.remains,
    ];

    return {
      won: requiredChecks.every(Boolean),
      checks,
      launchChecks,
      bands,
      totals: finalGroups,
      species: finalSpecies,
      remains: this.state.remains,
      stability: this.stability(),
      auditTurns: this.state.auditRound,
    };
  }

  environment() {
    return (
      ENVIRONMENTS[this.state.environment] || {
        id: "none",
        name: "未选择",
        modifiers: {
          plantGrowth: 1,
          capacity: 1,
          droughtMitigation: 0,
          decomposerBonus: 0,
          nutrientReturn: 1,
        },
      }
    );
  }

  addCohort(zoneId, speciesId, count, source) {
    if (count <= 0) return;
    this.state.zones[zoneId].populations[speciesId].push({
      count,
      sourceId: source.id,
      sourceName: source.name,
      traitName: source.traitName || "自然种群",
      traits: clone(source.traits || {}),
    });
  }

  addBirths(zone, speciesId, count) {
    if (count <= 0) return;
    const cohorts = zone.populations[speciesId];
    if (cohorts.length === 0) return;
    const inheritor = [...cohorts].sort(
      (left, right) =>
        (right.traits.reproduction || 0) -
        (left.traits.reproduction || 0),
    )[0];
    inheritor.count += count;
  }

  growProducerCohorts(zone, growth) {
    if (growth <= 0) return;
    const cohorts = GROUPS.producer.flatMap(
      (speciesId) => zone.populations[speciesId],
    );
    const total = cohorts.reduce((sum, cohort) => sum + cohort.count, 0);
    if (total <= 0) return;
    let assigned = 0;
    cohorts.forEach((cohort, index) => {
      const amount =
        index === cohorts.length - 1
          ? growth - assigned
          : Math.round((growth * cohort.count) / total);
      cohort.count += amount;
      assigned += amount;
    });
  }

  removeSpecies(zone, speciesId, amount) {
    let remaining = Math.max(0, amount);
    const cohorts = zone.populations[speciesId].sort(
      (left, right) => right.count - left.count,
    );
    for (const cohort of cohorts) {
      if (remaining <= 0) break;
      const removed = Math.min(cohort.count, remaining);
      cohort.count -= removed;
      remaining -= removed;
    }
    zone.populations[speciesId] = cohorts.filter(
      (cohort) => cohort.count > 0,
    );
    return amount - remaining;
  }

  removeFromGroup(zone, groupId, amount) {
    let remaining = Math.max(0, amount);
    const speciesEntries = GROUPS[groupId]
      .map((speciesId) => ({
        speciesId,
        count: this.speciesCount(zone, speciesId),
      }))
      .sort((left, right) => right.count - left.count);
    for (const entry of speciesEntries) {
      if (remaining <= 0) break;
      const removed = this.removeSpecies(
        zone,
        entry.speciesId,
        Math.min(entry.count, remaining),
      );
      remaining -= removed;
    }
    return amount - remaining;
  }

  moveSpeciesCohorts(sourceZone, targetZone, speciesId, amount) {
    let remaining = Math.max(0, amount);
    if (remaining <= 0) return 0;
    const cohorts = [...sourceZone.populations[speciesId]].sort(
      (left, right) => right.count - left.count,
    );
    let moved = 0;
    for (const cohort of cohorts) {
      if (remaining <= 0) break;
      const transfer = Math.min(cohort.count, remaining);
      if (transfer <= 0) continue;
      cohort.count -= transfer;
      remaining -= transfer;
      moved += transfer;
      const existing = targetZone.populations[speciesId].find(
        (target) => target.sourceId === cohort.sourceId,
      );
      if (existing) {
        existing.count += transfer;
      } else {
        targetZone.populations[speciesId].push({
          ...clone(cohort),
          count: transfer,
        });
      }
    }
    sourceZone.populations[speciesId] = cohorts.filter(
      (cohort) => cohort.count > 0,
    );
    if (moved > 0) {
      targetZone.hunger[speciesId] = Math.min(
        targetZone.hunger[speciesId],
        sourceZone.hunger[speciesId],
      );
    }
    return moved;
  }

  choosePrey(zone, predatorId) {
    const preferences =
      predatorId === "lion"
        ? { gazelle: 0.72, zebra: 1.18, wildebeest: 1.12 }
        : { gazelle: 1.08, zebra: 0.58, wildebeest: 0.86 };
    const availableSpecies = GROUPS.herbivore.filter(
      (speciesId) => this.speciesCount(zone, speciesId) > 0,
    );
    const protectedRares = availableSpecies.filter(
      (speciesId) => this.speciesCount(zone, speciesId) > 3,
    );
    const candidates =
      protectedRares.length > 0 ? protectedRares : availableSpecies;
    return weightedChoice(
      candidates.map((speciesId) => ({
        value: speciesId,
        weight:
          this.speciesCount(zone, speciesId) *
          preferences[speciesId],
      })),
      this.random,
    );
  }

  speciesCount(zone, speciesId) {
    return zone.populations[speciesId].reduce(
      (sum, cohort) => sum + cohort.count,
      0,
    );
  }

  speciesTrait(zone, speciesId, traitId) {
    const cohorts = zone.populations[speciesId];
    const total = cohorts.reduce((sum, cohort) => sum + cohort.count, 0);
    if (total <= 0) return 0;
    return (
      cohorts.reduce(
        (sum, cohort) =>
          sum + cohort.count * (cohort.traits[traitId] || 0),
        0,
      ) / total
    );
  }

  groupTrait(zone, groupId, traitId) {
    const speciesIds = GROUPS[groupId];
    const total = speciesIds.reduce(
      (sum, speciesId) => sum + this.speciesCount(zone, speciesId),
      0,
    );
    if (total <= 0) return 0;
    return (
      speciesIds.reduce(
        (sum, speciesId) =>
          sum +
          this.speciesCount(zone, speciesId) *
            this.speciesTrait(zone, speciesId, traitId),
        0,
      ) / total
    );
  }

  zoneGroupCount(zone, groupId) {
    return GROUPS[groupId].reduce(
      (sum, speciesId) => sum + this.speciesCount(zone, speciesId),
      0,
    );
  }

  zoneHerbivoreDemand(zone) {
    return GROUPS.herbivore.reduce(
      (sum, speciesId) =>
        sum +
        this.speciesCount(zone, speciesId) *
          SPECIES[speciesId].foodNeed *
          (1 + this.speciesTrait(zone, speciesId, "foodNeed")),
      0,
    );
  }

  zoneFoodBalance(zone) {
    return (
      this.zoneGroupCount(zone, "producer") -
      this.zoneHerbivoreDemand(zone)
    );
  }

  zoneGroupTotal(groupId) {
    return Object.values(this.state.zones).reduce(
      (sum, zone) => sum + this.zoneGroupCount(zone, groupId),
      0,
    );
  }

  speciesTotals(sourceState = this.state) {
    return Object.fromEntries(
      Object.keys(SPECIES).map((speciesId) => [
        speciesId,
        Object.values(sourceState.zones).reduce(
          (sum, zone) =>
            sum +
            zone.populations[speciesId].reduce(
              (cohortSum, cohort) => cohortSum + cohort.count,
              0,
            ),
          0,
        ),
      ]),
    );
  }

  groupTotals(sourceState = this.state) {
    const species = this.speciesTotals(sourceState);
    return Object.fromEntries(
      Object.entries(GROUPS).map(([groupId, speciesIds]) => [
        groupId,
        speciesIds.reduce((sum, speciesId) => sum + species[speciesId], 0),
      ]),
    );
  }

  stability(sourceState = this.state) {
    const groups = this.groupTotals(sourceState);
    if (groups.producer + groups.herbivore + groups.predator === 0) return 0;
    const producerScore = Math.min(1, groups.producer / 120);
    const herbivoreScore = Math.min(1, groups.herbivore / 24);
    const predatorScore = Math.min(1, groups.predator / 3);
    const cycleScore = 1 - Math.min(1, sourceState.remains / 65);
    return Math.round(
      (producerScore * 0.3 +
        herbivoreScore * 0.3 +
        predatorScore * 0.25 +
        cycleScore * 0.15) *
        100,
    );
  }

  objectiveProgress(sourceState = this.state) {
    const groups = this.groupTotals(sourceState);
    return [
      groups.producer >= 100,
      groups.herbivore >= 20,
      groups.predator >= 2,
      sourceState.remains <= 30 &&
        groups.producer >= 100 &&
        groups.herbivore >= 20 &&
        groups.predator >= 2,
    ].filter(Boolean).length;
  }

  historyPoint(turn, label) {
    return {
      turn,
      label,
      groups: this.groupTotals(),
      species: this.speciesTotals(),
      stability: this.stability(),
      remains: this.state.remains,
    };
  }

  richestZone(groupId) {
    return Object.entries(this.state.zones).sort(
      ([, left], [, right]) =>
        this.zoneGroupCount(right, groupId) -
        this.zoneGroupCount(left, groupId),
    )[0]?.[0] || "plains";
  }

  largestHerbivorePopulation() {
    let largest = null;
    for (const [zoneId, zone] of Object.entries(this.state.zones)) {
      for (const speciesId of GROUPS.herbivore) {
        const count = this.speciesCount(zone, speciesId);
        if (!largest || count > largest.count) {
          largest = { zoneId, speciesId, count };
        }
      }
    }
    return largest && largest.count > 0 ? largest : null;
  }

  drawCards(amount) {
    const groups = this.groupTotals();
    const desiredGroups =
      this.state.turn === 1
        ? ["producer", "producer", "herbivore", "herbivore", "predator"]
        : [
            "producer",
            "herbivore",
            this.state.turn >= 4 && groups.predator < 2
              ? "predator"
              : null,
          ];

    while (this.state.hand.length < amount) {
      this.refillDrawPile();
      if (this.state.drawPile.length === 0) break;
      const desiredGroup = desiredGroups[this.state.hand.length] || null;
      let cardIndex = -1;
      if (desiredGroup) {
        cardIndex = this.state.drawPile.findLastIndex(
          (card) => SPECIES[card.species].group === desiredGroup,
        );
      }
      if (cardIndex < 0) cardIndex = this.state.drawPile.length - 1;
      const [card] = this.state.drawPile.splice(cardIndex, 1);
      if (card) this.state.hand.push(card);
    }
  }

  refillDrawPile() {
    if (this.state.drawPile.length > 0) return;
    if (this.state.discardPile.length === 0) return;
    this.state.drawPile = shuffled(this.state.discardPile, this.random);
    this.state.discardPile = [];
  }

  makeStep(key, title, message) {
    return {
      key,
      title,
      message,
      snapshot: this.snapshot(),
    };
  }

  addEvent(turn, text) {
    this.state.events.unshift({ turn: `${turn}`, text });
    this.state.events = this.state.events.slice(0, 45);
  }

  signed(value) {
    return value > 0 ? `+${value}` : `${value}`;
  }

  change() {
    this.onChange(this.snapshot());
  }

  snapshot() {
    const snapshot = clone(this.state);
    snapshot.speciesTotals = this.speciesTotals(snapshot);
    snapshot.groupTotals = this.groupTotals(snapshot);
    snapshot.stability = this.stability(snapshot);
    snapshot.objectiveProgress = this.objectiveProgress(snapshot);
    snapshot.forecast = this.forecast();
    snapshot.environmentData = this.environment();
    return snapshot;
  }
}
