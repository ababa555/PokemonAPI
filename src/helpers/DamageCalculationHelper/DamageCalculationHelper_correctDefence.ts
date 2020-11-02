import { Move, PokemonName } from '../../models/data';
import { DamageType } from '../../enumerators';
import { DamageCalculationHelper } from '.';

export class DamageCalculationHelper_correctDefence {
  // 【5】防御の補正値
  static correctDefence(defencePokemonName: PokemonName, move: Move, attackAbility: string, defenceAbility: string, defenceItem: string, weather: string, statusAilment: string, field: string) {
    let result = 4096;

    // かたやぶり
    if (DamageCalculationHelper.isKatayaburi(attackAbility, defenceAbility)) {
      return result;
    }

    if (defenceAbility === 'フラワーギフト') {
      if (move.damageType === DamageType.SPECIAL) {
        if (weather === 'にほんばれ' || weather === 'おおひでり') {
          result = result * Math.round(6144  / 4096 * 10) / 10
        }
      }
    }

    if (defenceAbility === 'ふしぎなうろこ') {
      if (move.damageType === DamageType.PHYSICAL) {
        if (statusAilment === 'ねむり' || statusAilment === 'どく' || statusAilment === 'もうどく' ||
        statusAilment === 'まひ' || statusAilment === 'やけど' || statusAilment === 'こおり') {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (defenceAbility === 'くさのけがわ') {
      if (field === 'グラスフィールド') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (defenceAbility === 'ファーコート') {
      if (move.damageType === DamageType.PHYSICAL) {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    if (defenceItem === 'しんかのきせき') {
      if (move.damageType !== DamageType.STATUS) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (defenceItem === 'とつげきチョッキ') {
      if (move.damageType === DamageType.SPECIAL) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (defenceItem === 'しんかいのウロコ') {
      if (defencePokemonName.name === 'パールル') {
        if (move.damageType === DamageType.SPECIAL) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }
      }
    }

    if (defenceItem === 'メタルパウダー') {
      if (defencePokemonName.name === 'メタモン') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(8192 / 4096 * 10) / 10
        }
      }
    }
    return result;
  }
}