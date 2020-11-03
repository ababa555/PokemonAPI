import { Move } from '../../models/data';
import { MoveType as MoveEnum,DamageType } from '../../enumerators';
import { DamageCalculationHelper } from '.';

export class DamageCalculationHelper_correctDamage {
  // 【7】ダメージの補正値
  static correctDamage(move: Move, wall: string, attackAbility: string, defenceAbility: string, effective: number, isCritical: boolean, attackItem: string, defenceItem: string, isTokusei: boolean) {
    let result = 4096;
    console.log(wall)
    if (wall === 'リフレクター') {     
      if (move.name != 'かわらわり' && move.name != 'サイコファング' &&
          move.name != 'サイコショック' && move.name != 'サイコブレイク' && move.name != 'しんぴのつるぎ') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(2048 / 4096 * 10) / 10
        }
      }
    } else if (wall === 'リフレクター') {
      if (move.damageType === DamageType.SPECIAL) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    } else if (wall === 'オーロラベール') {
      if (move.name != 'かわらわり' && move.name != 'サイコファング') {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'ブレインフォース') {
      if (effective === 2.0 || effective === 4.0) {
        result = result * Math.round(5120 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'スナイパー') {
      if (isCritical) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'いろめがね') {
      if (effective === 0.5 || effective === 0.25) {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    } 

    if (isTokusei) {
      // HP満タンのとき受けるダメージ0.5倍
      if (defenceAbility === 'マルチスケイル') {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }

      if (defenceAbility === 'ファントムガード') {
        // HP満タンのとき受けるダメージ0.5倍
        // 「かたやぶり」で無効にされない
        result = result * Math.round(2048 / 4096 * 10) / 10
      } 
    }

    if (defenceAbility === 'もふもふ') {
      if (DamageCalculationHelper.isDirectAttack(move)) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    // フレンドガード
    // ダブルバトル専用特性。
    // 他の味方が受けるダメージ3/4倍。

    if (defenceAbility === 'ハードロック' || defenceAbility === 'フィルター' || 
    defenceAbility === 'プリズムアーマー') {
      if (effective === 2.0 || effective === 4.0) {
        result = result * Math.round(3072 / 4096 * 10) / 10
      }
    }

    if (defenceAbility === 'もふもふ') {
      if (move.typeId === MoveEnum.Fire) {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    // メトロノーム
    // 〇発目で威力が変わるので難しい

    // たつじんのおび
    if (attackItem === 'たつじんのおび') {
      if (effective === 2.0 || effective === 4.0) {
        result = result * Math.round(4915 / 4096 * 10) / 10
      }
    }

    // いのちのたま
    if (attackItem === 'いのちのたま') {
      if (move.damageType !== DamageType.STATUS) {
        result = result * Math.round(5324 / 4096 * 10) / 10
      }
    }

    // 半減きのみ
    if (defenceItem === '半減きのみ') {
      if (effective === 2.0 || effective === 4.0) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    return result
  }
}