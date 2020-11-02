import { Move, PokemonStats } from '../../models/data';
import { DamageType } from '../../enumerators';

export class DamageCalculationHelper_stats {
  /**
   * 攻撃側のこうげき(とくこう)を取得します。
   * @returns 攻撃側のこうげき(とくこう)
   */
  static attackRank(attackPokemonStats: PokemonStats, move: Move, 
    attackIndividualValue: number, attackEffortValue: number, attackNature: number,
    attackSpIndividualValue: number, attackSpEffortValue: number, attackSpNature: number): number {

    if (move.damageType === DamageType.PHYSICAL) {
      const attack = attackPokemonStats.attack
      return this.calcOther(attack, attackIndividualValue, attackEffortValue, attackNature)
    } else if(move.damageType === DamageType.SPECIAL) {
      const spAttack = attackPokemonStats.spAttack
      return this.calcOther(spAttack, attackSpIndividualValue, attackSpEffortValue, attackSpNature)
    }
    
    throw new Error("このケースは無いはず")
  }

  /**
   * 防御側のぼうぎょ(とくぼう)を取得します。
   * @returns 防御側のぼうぎょ(とくぼう)
   */
  static defenceRank(defencePokemonStats: PokemonStats, move: Move, 
    defenceIndividualValue: number, defenceEffortValue: number, defenceNature: number,
    defenceSpIndividualValue: number, defenceSpEffortValue: number, defenceSpNature: number): number {

    let useDefence = false;
    if (move.damageType === DamageType.PHYSICAL) {
      useDefence = true;
    } else if (move.damageType === DamageType.SPECIAL) {
      useDefence = false;
    } else {
      return 0;
    }

    if (move.name === 'サイコショック' || move.name === 'サイコブレイク' || move.name === 'しんぴのつるぎ') {
      useDefence = true;
    }

    // ぼうぎょでダメージを判定
    if (useDefence) {
      const defense = defencePokemonStats.defense
      return this.calcOther(defense, defenceIndividualValue, defenceEffortValue, defenceNature)
    // とくぼうでダメージを判定
    } else {
      const spDefense = defencePokemonStats.spDefense
      return this.calcOther(spDefense, defenceSpIndividualValue, defenceSpEffortValue, defenceSpNature)
    }
  }

  static defenceHp(defencePokemonStats: PokemonStats, defenceHpIndividualValue: number, defenceHpEffortValue: number): number {
    const hp = defencePokemonStats.hp
    return this.calcHp(hp, defenceHpIndividualValue, defenceHpEffortValue)
  }

  static getRank(rank: number, isCritical: boolean, isAttack: boolean): number {
    if (isCritical) {
      if (isAttack) {
        // 急所時は不利なランク補正が働いている場合は無視する
        if (rank < 0) {
          return this.calcRank(0)
        }
      } else {
        // 急所時は相手のダメージ軽減補正を無視する
        if (rank > 0) {
          return this.calcRank(0)
        }
      }
    }
    return this.calcRank(rank);
  }

  static calcRank(rank: number): number {
    switch (rank) {
      case 6:
        return 8/2;
      case 5:
        return 7/2;
      case 4:
        return 6/2;
      case 3:
        return 5/2;
      case 2:
        return 4/2;
      case 1:
        return 3/2;
      case 0:
        return 2/2;
      case -1:
        return 2/3;
      case -2:
        return 2/4;
      case -3:
        return 2/5;
      case -4:
        return 2/6;
      case -5:
        return 2/7;
      case -6:
        return 2/8;
      default:
        return 1;
    }
  }

  static calcHp(statsHp: number, individualValue: number, effortValue: number): number {
    if (statsHp == 1) return 1;

    // (種族値+個体値/2+努力値/8)+60
    return Math.floor((statsHp + 1.0 * individualValue / 2 + 1.0 * effortValue / 8) + 60);
  }

  static calcOther(stats: number, individualValue: number, effortValue: number, nature: number): number {
    // let natureN = 1.0
    // if (nature === '↑') {
    //   natureN = 1.1
    // } else if (nature === '→') {
    //   natureN = 1.0
    // } else if (nature === '↓'){
    //   natureN = 0.9
    // }

    // {(種族値×2+個体値+努力値/4)×(レベル/100)+5}×性格補正
    let t1 = Math.floor(stats * 2 + individualValue + 1.0 * effortValue / 4)
    let t2 = Math.floor(t1 * 1.0 * 50 / 100) + 5
    let result = Math.floor(t2 * nature)
    return result
  }
}