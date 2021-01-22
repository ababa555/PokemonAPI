import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { ICalculaionService } from './ICalculaionService';
import { IPokemonService } from './IPokemonService';
import { IPokemonAbilityRepository, IPokemonEvolutionChainRepository, IPokemonMoveRepository, IMoveRepository, IPokemonRepository, IPokemonNameRepository, IPokemonStatsRepository, IPokemonTypeRepository } from '../repositories'
import { ArrayHelper, 
  DamageCalculationHelper, 
  DamageCalculationHelper_CorrectPower as DamageCalculationHelperPower,
  DamageCalculationHelper_CorrectAttack as DamageCalculationHelperAttack,
  DamageCalculationHelper_CorrectDefence as DamageCalculationHelperDefence,
  DamageCalculationHelper_CorrectDamage as DamageCalculationHelperDamage,
  DamageCalculationHelper_Override as DamageCalculationHelperOverride,
  DamageCalculationHelper_Stats as DamageCalculationHelperStats,
} from '../helpers';
import { Move as MoveType, GameVersion } from './../types';
import { MoveType as MoveEnum } from './../enumerators';
import { PokemonResponse, PokemonTypeResponse, PokemonStatsResponse, PokemonMoveResponse, MoveResponse, PokemonEvolutionChainResponse, PokemonAbilityResponse } from './../models/response';
import { Pokemon, PokemonWithEverything, PokemonAbility, PokemonEvolutionChain, PokemonMove, Move, PokemonName, PokemonStats, PokemonType } from './../models/data';

// 計算式参考
// https://pokemon-wiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F#modify_values
@injectable()
export class CalculaionService implements ICalculaionService {
  private service: IPokemonService;
  private repository: IPokemonRepository;
  private pokemonNameRepository: IPokemonNameRepository;
  private pokemonAbilityRepository: IPokemonAbilityRepository;
  private pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository;
  private pokemonMoveRepository: IPokemonMoveRepository;
  private pokemonStatsRepository: IPokemonStatsRepository;
  private pokemonTypeRepository: IPokemonTypeRepository;
  private moveRepository: IMoveRepository;

  public constructor (
    @inject(TYPES.IPokemonService) service: IPokemonService,
    @inject(TYPES.IPokemonRepository) repository: IPokemonRepository,
    @inject(TYPES.IPokemonNameRepository) pokemonNameRepository: IPokemonNameRepository,
    @inject(TYPES.IPokemonAbilityRepository) pokemonAbilityRepository: IPokemonAbilityRepository,
    @inject(TYPES.IPokemonEvolutionChainRepository) pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository,
    @inject(TYPES.IPokemonMoveRepository) pokemonMoveRepository: IPokemonMoveRepository,
    @inject(TYPES.IPokemonStatsRepository) pokemonStatsRepository: IPokemonStatsRepository,
    @inject(TYPES.IPokemonTypeRepository) pokemonTypeRepository: IPokemonTypeRepository,
    @inject(TYPES.IMoveRepository) moveRepository: IMoveRepository) {
      this.service = service;
      this.repository = repository;
      this.pokemonNameRepository = pokemonNameRepository;
      this.pokemonAbilityRepository = pokemonAbilityRepository;
      this.pokemonEvolutionChainRepository = pokemonEvolutionChainRepository;
      this.pokemonMoveRepository = pokemonMoveRepository;
      this.pokemonStatsRepository = pokemonStatsRepository;
      this.pokemonTypeRepository = pokemonTypeRepository;
      this.moveRepository = moveRepository;
  }

  public calc(attackPokemonId: string, defencePokemonId: string, version: GameVersion,
    attackAbility: string, defenceAbility: string, attackMoveName: string,
    attackIndividualValue: number, attackEffortValue: number, attackNature: number, attackRank: number,
    attackSpIndividualValue: number, attackSpEffortValue: number, attackSpNature: number,
    defenceHpIndividualValue: number, defenceHpEffortValue: number,
    defenceIndividualValue: number, defenceEffortValue: number, defenceNature: number, defenceRank: number,
    defenceSpIndividualValue: number, defenceSpEffortValue: number, defenceSpNature: number,
    isCritical: boolean,
    attackItem: string, defenceItem: string,
    isZ: boolean, isZExclusive: boolean, wall: string, weather: string, field: string, statusAilment: string, sport: string, isTokusei: boolean) {

    const attackPokemon = this.service.get(attackPokemonId, version, "1")
    const defencePokemon = this.service.get(defencePokemonId, version, "1")

    const attackMove = ArrayHelper.ensure(attackPokemon.pokemonMoves.find(x => x.moveName === attackMoveName))
    const move = attackMove.move
    
    const overrideMoveType = DamageCalculationHelperOverride.moveType(move, attackAbility, defenceAbility, weather, isZ)
    if (overrideMoveType != null) {
      move.typeId = overrideMoveType;
    }
    
    const overrideMovePower = DamageCalculationHelperOverride.movePower(attackPokemon.pokemonName, move, defenceAbility, weather, isZ, isZExclusive)
    if (overrideMovePower != null) {
      move.power = overrideMovePower.toString();
    }
    
    const overrideMoveName = DamageCalculationHelperOverride.moveName(attackPokemon.pokemonName, move, isZ, isZExclusive)
    if (overrideMoveName != null) {
      move.name = overrideMoveName;
    }
    
    // タイプ相性
    const attackMoveType = move.typeId
    const attackPokemonTypes = attackPokemon.pokemonTypes.map(x => x.typeId)
    const defencePokemonTypes = defencePokemon.pokemonTypes.map(x => x.typeId)
    let effective: number = this.getEffective(attackMoveType, defencePokemonTypes);

    // Note:invalidByType（元々のファイル名はdamageInvalid.js）でやっていた目覚めるパワーの判定をどっかでやる
    // Note:〇〇スキンとかを考慮する
    const isInvalidByAbility = DamageCalculationHelper.isInvalidByAbility(move, defencePokemonTypes, attackAbility, defenceAbility)
    if (isInvalidByAbility) {
      effective = 0.0
    }

    const isInvalidByType = DamageCalculationHelper.isInvalidByType(move, defencePokemonTypes)
    if (isInvalidByType) {
      effective = 0.0
    }

    if (move.power == '-') {
      return {damageMin: '―', damageMax: '―'}
    }

    let defencePokeHp = DamageCalculationHelperStats.defenceHp(defencePokemon.pokemonStats, defenceHpIndividualValue, defenceHpEffortValue)
    let fixedDamage = DamageCalculationHelper.fixedDamage(move, defencePokeHp)
    if (fixedDamage) {
      return {damageMin: fixedDamage.min, damageMax: fixedDamage.max}
    }

    const calcParam = new DamageCalculationParameter(
      attackPokemon, defencePokemon, move,
      attackPokemonTypes, defencePokemonTypes,
      attackAbility, defenceAbility, version,
      attackItem, defenceItem, isZ, isZExclusive,
      isCritical, wall, weather, field, statusAilment, sport, isTokusei,
      attackIndividualValue, attackEffortValue, attackNature, attackRank,
      attackSpIndividualValue, attackSpEffortValue, attackSpNature,
      defenceIndividualValue, defenceEffortValue, defenceNature,
      defenceRank, defenceSpIndividualValue, defenceSpEffortValue, defenceSpNature,
      effective
    )

    // 通常
    const result1 = this.calcImpl(calcParam)
    
    // 急所
    const result2 = this.calcImpl(calcParam)

    //const a = new DamageCalculationRequest()
  }

  private calcImpl(param: DamageCalculationParameter) {
    const attackPokemon = param.attackPokemon
    const defencePokemon = param.defencePokemon
    const move = param.move
    const attackPokemonTypes = param.attackPokemonTypes
    const defencePokemonTypes = param.defencePokemonTypes
    const attackAbility = param.attackAbility
    const defenceAbility = param.defenceAbility
    const version = param.version
    const attackItem = param.attackItem
    const defenceItem = param.defenceItem
    const isZ = param.isZ
    const isZExclusive = param.isZExclusive
    const isCritical = param.isCritical
    const wall = param.wall
    const weather = param.weather
    const field = param.field
    const statusAilment = param.statusAilment
    const sport = param.sport
    const isTokusei = param.isTokusei
    const attackIndividualValue = param.attackIndividualValue
    const attackEffortValue = param.attackEffortValue
    const attackNature = param.attackNature
    const attackRank = param.attackRank
    const attackSpIndividualValue = param.attackSpIndividualValue
    const attackSpEffortValue = param.attackSpEffortValue
    const attackSpNature = param.attackSpNature
    const defenceIndividualValue = param.defenceIndividualValue
    const defenceEffortValue = param.defenceEffortValue
    const defenceNature = param.defenceNature
    const defenceRank = param.defenceRank
    const defenceSpIndividualValue = param.defenceSpIndividualValue
    const defenceSpEffortValue = param.defenceSpEffortValue
    const defenceSpNature = param.defenceSpNature
    const effective = param.effective

    // ダメージ計算式
    // Note:https://pokemon-wiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F
    // A．攻撃側のレベル × 2 ÷ 5 ＋ 2 → 切り捨て
    let a = Math.floor(50 * 2 / 5 + 2 )
    console.log('a:' + a)

    // B.【2】最終威力 × 【4】最終攻撃 ÷ 【6】最終防御
    // 【2】最終威力
    // 物理技(特殊技)の威力 ×【1】威力の補正値 ÷ 4096 → 五捨五超入 → 1より小さければ1にする

    // 【1】威力の補正値
    let correctPower = DamageCalculationHelperPower.correctPower(
      attackPokemon.pokemonName,
      move, 
      attackAbility, 
      defenceAbility,
      attackPokemonTypes,
      statusAilment,
      attackItem,
      field,
      weather,
      isZ,
      isZExclusive,
      sport)

    let b1 = Math.ceil(parseInt(move.power) * correctPower / 4096 - 0.5)
    if (b1 < 1) {
      b1 = 1;
    }

    console.log('correctPower:' + correctPower)
    console.log('b1:' + b1)

    // 【4】最終攻撃
    // 攻撃側のこうげき(とくこう) × こうげきランク(とくこうランク) → 切り捨て
    // × はりきり 6144 ÷ 4096 → 切り捨て
    // ×【3】攻撃の補正値 ÷ 4096 → 五捨五超入　→ 1より小さければ1にする
    let b2_1 = DamageCalculationHelperStats.attackRank(
      attackPokemon.pokemonStats,
      move,
      attackIndividualValue, 
      attackEffortValue, 
      attackNature,
      attackSpIndividualValue, 
      attackSpEffortValue, 
      attackSpNature)
    console.log('b2_1:' + b2_1)
    let b2_2 = DamageCalculationHelperStats.getRank(attackRank, isCritical, true)
    console.log('b2_2:' + b2_2)
    let b2_3 = Math.floor(b2_1 * b2_2)
    console.log('b2_3:' + b2_3)
    let b2_4 = DamageCalculationHelper.getHarikiri(attackAbility)
    console.log('b2_4:' + b2_4)
    let b2_5 = Math.floor(b2_3 * b2_4)
    console.log('b2_5:' + b2_5)

    // 【3】攻撃の補正値
    let correctAttack = DamageCalculationHelperAttack.correctAttack(
      attackPokemon.pokemonName,
      move,
      attackAbility,
      weather,
      statusAilment,
      attackItem,
      isTokusei)
    console.log('correctAttack:' + correctAttack)
    let b2 = Math.ceil(b2_5 * correctAttack / 4096 - 0.5)
    console.log('b2:' + b2)
    if (b2 < 1) {
      b2 = 1;
    }

    // 【6】最終防御
    //  防御側のぼうぎょ(とくぼう) × ランク → 切り捨て
    //  × すなあらし＋いわタイプでとくぼう強化 6144 ÷ 4096 → 切り捨て
    //  ×【5】防御の補正値 ÷ 4096 → 五捨五超入 → 1より小さければ1にする
    let b3_1 = DamageCalculationHelperStats.defenceRank(
      defencePokemon.pokemonStats,
      move,
      defenceIndividualValue, 
      defenceEffortValue, 
      defenceNature,
      defenceSpIndividualValue, 
      defenceSpEffortValue, 
      defenceSpNature)
    console.log('b3-1:' + b3_1)

    let b3_2 = DamageCalculationHelperStats.getRank(defenceRank, isCritical, false)
    console.log('b3-2:' + b3_2)
    
    let b3_3 = Math.floor(b3_1 * b3_2)
    console.log('b3-3:' + b3_3)

    let b3_4 = DamageCalculationHelper.getSunaarashi(defencePokemonTypes, move, weather)
    console.log('b3-4:' + b3_4)

    let b3_5 = Math.floor(b3_3 * b3_4)
    console.log('b3-5:' + b3_5)

    // 【5】防御の補正値
    let correctDefence = DamageCalculationHelperDefence.correctDefence(
      defencePokemon.pokemonName,
      move,
      attackAbility,
      defenceAbility,
      defenceItem,
      weather,
      statusAilment,
      field)
    console.log('correctDefence:' + correctDefence)

    let b3 = Math.ceil(b3_5 * correctDefence / 4096 - 0.5)
    console.log('b3:' + b3)
    
    // 【2】最終威力 × 【4】最終攻撃 ÷ 【6】最終防御 → 切り捨て
    let b = Math.floor(a * b1 * b2 / b3)
    console.log('a:' + a)
    console.log('b1:' + b1)
    console.log('b2:' + b2)
    console.log('b3:' + b3)
    console.log('b:' + b)

    // 50 ＋ 2 → 切り捨て
    let c = Math.floor(b / 50 + 2)
    console.log('c:' + c)

    // 複数対象 3072 ÷ 4096 → 五捨五超入
    // ダブルバトル用なので無視

    // おやこあい(2発目) 1024 ÷ 4096 → 五捨五超入
    let d1 = DamageCalculationHelper.getOyakoAi(attackAbility)
    console.log('d1(おやこあい(2発目)):' + d1)
    
    let d = Math.ceil(c * d1 - 0.5)
    console.log('d:' + d)

    // 天気弱化 2048 ÷ 4096 → 五捨五超入
    let e1 = DamageCalculationHelper.weakenWeather(defencePokemonTypes, move, weather)
    console.log('e1(天気弱化):' + e1)

    let e = Math.ceil(d * e1 - 0.5)
    console.log('e:' + e)

    // 天気強化 6144 ÷ 4096 → 五捨五超入
    let f1 = DamageCalculationHelper.strengthenWeather(move, weather, defenceAbility)
    console.log('f1(天気強化):' + f1)
    
    let f = Math.ceil(e * f1 - 0.5)
    console.log('f:' + f)

    // 急所 6144 ÷ 4096 → 五捨五超入
    let g = f
    if (isCritical) {
      let g1 = 6144 / 4096
      g = Math.ceil(f * g1 - 0.5)
    }
    console.log('g(急所):' + g)

    // 乱数(0.85, 0.86, …… 0.99, 1.00 の何れか) → 切り捨て
    let h1 = Math.floor(g * 0.85)
    let h2 = Math.floor(g * 1.00)
    console.log('h1(乱数):' + h1)
    console.log('h2(乱数):' + h2)

    // タイプ一致 6144 ÷ 4096 → 五捨五超入 または てきおうりょく 8192 × 4096 → 五捨五超入
    const i = DamageCalculationHelper.typeMatchOrCapacity(attackPokemonTypes, move, attackAbility)
    console.log('i(タイプ一致):' + i)

    const i1 = Math.ceil(h1 * i - 0.5)
    const i2 = Math.ceil(h2 * i - 0.5)
    console.log('i1:' + h1)
    console.log('i2:' + h1)

    // タイプ相性 → 切り捨て
    // const damageN = DamageCalculationHelper.calcN(effective)
    console.log('effective(タイプ相性):' + effective)

    const j1 = Math.floor(i1 * effective)
    const j2 = Math.floor(i2 * effective)
    console.log('j1:' + j1)
    console.log('j2:' + j2)

    // やけど 2048 ÷ 4096 → 五捨五超入
    let k1 = j1
    let k2 = j2
    if (statusAilment === 'やけど') {
      k1 = Math.ceil(j1 * 2048 / 4096 - 0.5)
      k2 = Math.ceil(j2 * 2048 / 4096 - 0.5)  
    }
    console.log('j1(やけど判定後):' + j1)
    console.log('j2(やけど判定後):' + j2)

    // 【7】ダメージの補正値 ÷ 4096 → 五捨五超入
    const l = DamageCalculationHelperDamage.correctDamage(
      move, 
      wall, 
      attackAbility, 
      defenceAbility, 
      effective,
      isCritical,
      attackItem, 
      defenceItem, 
      isTokusei)
    console.log('l(ダメージの補正値):' + l)

    const l1 = Math.ceil(k1 * l / 4096 - 0.5)
    const l2 = Math.ceil(k2 * l / 4096 - 0.5)

    let damageMin = 0;
    let damageMax = 0;
    if (effective != 0.0) {
      if (l1 < 1) {
        damageMin = 1
      } else {
        damageMin = l1
      }
      if (l2 < 1) {
        damageMax = 1
      } else {
        damageMax = l2
      }
    }

    console.log('damageMin:' + damageMin)
    console.log('damageMax:' + damageMax)
    return {damageMin: damageMin, damageMax: damageMax} 
  }

  private getEffective(attackMoveType: MoveType, defencePokemonTypes: MoveType[]): number {
    const result = DamageCalculationHelper.getEffective(attackMoveType, defencePokemonTypes)
    return result
  }
}

class DamageCalculationParameter {
  constructor(
    public attackPokemon: PokemonWithEverything,
    public defencePokemon: PokemonWithEverything,
    public move: Move,
    public attackPokemonTypes: MoveType[],
    public defencePokemonTypes: MoveType[],
    public attackAbility: string,
    public defenceAbility: string,
    public version: GameVersion,
    public attackItem: string,
    public defenceItem: string,
    public isZ: boolean,
    public isZExclusive: boolean,
    public isCritical: boolean,
    public wall: string,
    public weather: string,
    public field: string,
    public statusAilment: string,
    public sport: string,
    public isTokusei: boolean,
    public attackIndividualValue: number,
    public attackEffortValue: number,
    public attackNature: number,
    public attackRank: number,
    public attackSpIndividualValue: number,
    public attackSpEffortValue: number,
    public attackSpNature: number,
    public defenceIndividualValue: number,
    public defenceEffortValue: number,
    public defenceNature: number,
    public defenceRank: number,
    public defenceSpIndividualValue: number,
    public defenceSpEffortValue: number,
    public defenceSpNature: number,
    public effective: number
  ) {}
}