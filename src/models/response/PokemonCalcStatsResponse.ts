export class PokemonCalcStatsResponse {
  pokemonId: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  // 個体値
  hpIndividual: number;
  attackIndividual: number;
  defenseIndividual: number;
  spAttackIndividual: number;
  spDefenseIndividual: number;
  speedIndividual: number;
  // 努力値
  hpEffort: number;
  attackEffort: number;
  defenseEffort: number;
  spAttackEffort: number;
  spDefenseEffort: number;
  speedEffort: number;
  // 性格補正(HPは性格補正が無い)
  attackNatureRevise: number;
  defenseNatureRevise: number;
  spAttackNatureRevise: number;
  spDefenseNatureRevise: number;
  speedNatureRevise: number;

  constructor(
    pokemonId: string, 
    hp: number, attack: number, defense: number, spAttack: number, spDefense: number, speed: number,
    hpIndividual: number, attackIndividual: number, defenseIndividual: number, spAttackIndividual: number, spDefenseIndividual: number, speedIndividual: number,
    hpEffort: number, attackEffort: number, defenseEffort: number, spAttackEffort: number, spDefenseEffort: number, speedEffort: number,
    attackNatureRevise: number, defenseNatureRevise: number, spAttackNatureRevise: number, spDefenseNatureRevise: number, speedNatureRevise: number) {
    
    this.pokemonId = pokemonId;
    // 実数
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAttack = spAttack;
    this.spDefense = spDefense;
    this.speed = speed;
    // 個体値
    this.hpIndividual = hpIndividual;
    this.attackIndividual = attackIndividual;
    this.defenseIndividual = defenseIndividual;
    this.spAttackIndividual = spAttackIndividual;
    this.spDefenseIndividual = spDefenseIndividual;
    this.speedIndividual = speedIndividual;
    // 努力値
    this.hpEffort = hpEffort;
    this.attackEffort = attackEffort;
    this.defenseEffort = defenseEffort;
    this.spAttackEffort = spAttackEffort;
    this.spDefenseEffort = spDefenseEffort;
    this.speedEffort = speedEffort;
    // 性格補正
    this.attackNatureRevise = attackNatureRevise;
    this.defenseNatureRevise = defenseNatureRevise;
    this.spAttackNatureRevise = spAttackNatureRevise;
    this.spDefenseNatureRevise = spDefenseNatureRevise;
    this.speedNatureRevise = speedNatureRevise;
  }
}