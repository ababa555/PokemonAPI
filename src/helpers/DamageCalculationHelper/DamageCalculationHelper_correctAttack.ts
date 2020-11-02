import { Move, PokemonName } from '../../models/data';
import { MoveType as MoveEnum, DamageType } from '../../enumerators';

export class DamageCalculationHelper_correctAttack {
  // 【3】攻撃の補正値
  static correctAttack(attackPokemonName: PokemonName, move: Move, attackAbility: string, weather: string, statusAilment: string, attackItem: string, isTokusei: boolean): number {
    var result = 4096;

    // let attackPoke = Enumerable.from(data)
    // .where(x => x.Id == attackId).singleOrDefault()

    if (attackAbility === 'スロースタート') {
      // 戦闘に出ると5ターンの間攻撃・素早さの値が半分になる
      if (move.damageType === DamageType.PHYSICAL) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'よわき') {
      // HPが半分になると攻撃・特攻半減。
      if (move.damageType !== DamageType.STATUS) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'フラワーギフト') {
      if (move.damageType === DamageType.PHYSICAL) {
        if (weather === 'にほんばれ' || weather === 'おおひでり') {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'こんじょう') {
      if (move.damageType === DamageType.PHYSICAL) {
        if (statusAilment === 'ねむり' || statusAilment === 'どく' || statusAilment === 'もうどく' ||
        statusAilment === 'まひ' || statusAilment === 'やけど' || statusAilment === 'こおり') {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (isTokusei) {
      // 自分の体力が1/3以下のとき、くさタイプの技を使用する場合に攻撃･特攻が1.5倍になる
      if (attackAbility === 'しんりょく') {
        if (move.typeId === MoveEnum.Grass) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }

      // 自分の体力が1/3以下のとき、ほのおタイプの技を使用する場合に攻撃･特攻が1.5倍になる
      if (attackAbility === 'もうか') {
        if (move.typeId === MoveEnum.Fire) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }

      // 自分の体力が1/3以下のとき、みずタイプの技を使用する場合に攻撃･特攻が1.5倍になる
      if (attackAbility === 'げきりゅう') {
        if (move.typeId === MoveEnum.Water) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }

      // 自分の体力が1/3以下のとき、むしタイプの技を使用する場合に攻撃･特攻が1.5倍になる
      if (attackAbility === 'むしのしらせ') {
        if (move.typeId === MoveEnum.Bug) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }

      // ほのおタイプの技を使用した場合に攻撃･特攻を1.5倍にしてダメージ計算を行うようになる
      if (attackAbility === 'もらいび') {
        if (move.typeId === MoveEnum.Fire) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'サンパワー') {
      if (move.damageType === DamageType.SPECIAL) {
        if (weather === 'にほんばれ' || weather === 'おおひでり') {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    // プラス
    // マイナス
    // ダブルバトル専用

    if (attackAbility === 'はがねつかい') {
      if (move.typeId === MoveEnum.Steel) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'ちからもち' || attackAbility === 'ヨガパワー') {
      if (move.damageType === DamageType.PHYSICAL) {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'すいほう') {
      if (move.typeId === MoveEnum.Water) {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    if (isTokusei) {
      // 交代で出てきた相手へ物理技を使用した際、ダメージ計算で攻撃を2倍にして計算する
      if (attackAbility === 'はりこみ') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }
      }
    }    

    if (attackAbility === 'あついしぼう') {
      if (move.typeId === MoveEnum.Fire || move.typeId === MoveEnum.Ice) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'すいほう') {
      if (move.typeId === MoveEnum.Fire) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (attackItem === 'こだわりハチマキ') {
      if (move.damageType === DamageType.PHYSICAL) {
        result = result * Math.round(6144 / 4096 * 10) / 10 
      }
    }
    
    if (attackItem === 'こだわりメガネ') {
      if (move.damageType === DamageType.SPECIAL) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (attackItem === 'ふといホネ') {
      if (attackPokemonName.name === 'カラカラ' || attackPokemonName.name === 'ガラガラ') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }  
      }
    }

    if (attackItem === 'しんかいのキバ') {
      if (attackPokemonName.name === 'パールル') {
        if (move.damageType === DamageType.SPECIAL) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }  
      }
    }
 
    if (attackItem === 'でんきだま') {
      if (attackPokemonName.name === 'ピカチュウ') {
        if (move.damageType !== DamageType.STATUS) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }  
      }
    }

    return result;
  }
}