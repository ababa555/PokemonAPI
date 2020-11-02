import { Request } from 'express';

export interface CalcDamageRequest extends Request {
  query: {
    attackPokemonId: string,            // 攻撃側のポケモンのID
    defencePokemonId: string,           // 防御側のポケモンのID
    version: string,                    // ゲームバージョン
    attackAbility: string,              // 攻撃側の特性
    defenceAbility: string,             // 防御側の特性
    attackMoveName: string,             // 攻撃側の技名
    attackIndividualValue: string,      // 攻撃側の個体値（こうげき）
    attackEffortValue: string,          // 攻撃側の努力値（こうげき）
    attackNature: string,               // 攻撃側の性格補正（こうげき）
    attackRank: string,                 // 攻撃側のランク
    attackSpIndividualValue: string,    // 攻撃側の個体値（とくこう）
    attackSpEffortValue: string,        // 攻撃側の努力値（とくこう）
    attackSpNature: string,             // 攻撃側の性格補正（とくこう）
    defenceHpIndividualValue: string,   // 防御側の個体値（HP）
    defenceHpEffortValue: string,       // 防御側の努力値（HP）
    defenceIndividualValue: string,     // 防御側の個体値（ぼうぎょ）
    defenceEffortValue: string,         // 防御側の努力値（ぼうぎょ）
    defenceNature: string,              // 防御側の性格補正（ぼうぎょ）
    defenceRank: string,                // 防御側のランク
    defenceSpIndividualValue: string,   // 防御側の個体値（とくぼう）
    defenceSpEffortValue: string,       // 防御側の個努力値（とくぼう）
    defenceSpNature: string,            // 防御側の性格補正（とくぼう）
    isCritical: string,                 // 急所
    attackItem: string,                 // 攻撃側のもちもの
    defenceItem: string,                // 防御側のもちもの
    isZ: string,                        // Z技
    isZExclusive: string,               // 専用Z技
    wall: string,                       // 壁（リフレクター、ひかりのかべ、オーロラベール）
    weather: string,                    // 天気
    field: string,                      // フィールド（エレキフィールド、グラスフィールド、ミストフィールド、サイコフィールド）
    statusAilment: string,              // ステータス異常
    sport: string,                      // （みずあそび、どろあそび）
    isTokusei: string                   // 特性を考慮するか
  }
}