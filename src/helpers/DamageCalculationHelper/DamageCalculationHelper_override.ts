import { Move, PokemonName } from '../../models/data';
import { DamageType, MoveType as MoveEnum } from '../../enumerators';
import { Move as MoveType } from '../../types';

export class DamageCalculationHelper_override {
  /**
   * わざのタイプが上書きされるかを判定します。
   * @returns 上書きするタイプ or null：上書き無し
   */
  static moveType(move:Move, attackAbility:string, defenceAbility:string, weather:string, isZ: boolean): MoveType | null {

    if (defenceAbility != 'ノーてんき' && defenceAbility != 'エアロック') {
      if (move.name === 'ウェザーボール') {
        if (weather === 'にほんばれ') {
          return MoveEnum.Fire
        }
        if (weather === 'あめ') {
          return MoveEnum.Water
        }
        if (weather === 'すなあらし') {
          return MoveEnum.Rock
        }
        if (weather === 'おおひでり') {
          return MoveEnum.Fire
        }
        if (weather === 'おおあめ') {
          return MoveEnum.Water
        }
        if (weather === 'あられ') {
          return MoveEnum.Ice
        }
      }
    }

    if (attackAbility === 'エレキスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return MoveEnum.Electric
        }
      }
    }

    if (attackAbility === 'スカイスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return MoveEnum.Flying
        }
      }
    }

    if (attackAbility === 'フェアリースキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return MoveEnum.Fairy
        }
      }
    }

    if (attackAbility === 'フリーズスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return MoveEnum.Ice
        }
      }
    }

    if (attackAbility === 'ノーマルスキン') {
      if (!isZ) {
        if (move.typeId !== MoveEnum.Normal) {
          return MoveEnum.Normal
        }
      }
    }
    return null
  }

  /**
   * わざ名が上書きされるかを判定します。
   * @returns 上書きするわざ名 or null：上書き無し
   */
  static moveName(attackPokemonName: PokemonName, move: Move, isZ: boolean, isZExclusive: boolean) {
    const pokemonName = attackPokemonName.name
    const pokemonFormName = attackPokemonName.formName
    
    if (isZExclusive) {
      if (pokemonName === 'ピカチュウ') {
        if (move.name === 'ボルテッカー') {
          return 'ひっさつのピカチュート'
        }
      }
      if (pokemonName === 'サトシのピカチュウ') {
        if (move.name === '１０まんボルト') {
          return '１０００まんボルト'
        }
      }
      if (pokemonName === 'ライチュウ' && pokemonFormName === 'アローラのすがた') {
        if (move.name === '１０まんボルト') {
          return 'ライトニングサーフライド'
        }
      }
      if (pokemonName === 'カビゴン') {
        if (move.name === 'ギガインパクト') {
          return 'ほんきをだすこうげき'
        }
      }
      if (pokemonName === 'ミュウ') {
        if (move.name === 'サイコキネシス') {
          return 'オリジンズスーパーノヴァ'
        }
      }
      if (pokemonName === 'ジュナイパー') {
        if (move.name === 'かげぬい') {
          return 'シャドーアローズストライク'
        }
      }
      if (pokemonName === 'ガオガエン') {
        if (move.name === 'ＤＤラリアット') {
          return 'ハイパーダーククラッシャー'
        }
      }
      if (pokemonName === 'アシレーヌ') {
        if (move.name === 'うたかたのアリア') {
          return 'わだつみのシンフォニア'
        }
      }
      if (pokemonName === 'ルガルガン') {
        if (move.name === 'ストーンエッジ') {
          return 'ラジアルエッジストーム'
        }
      }
      if (pokemonName === 'ミミッキュ') {
        if (move.name === 'じゃれつく') {
          return 'ぽかぼかフレンドタイム'
        }
      }
      if (pokemonName === 'ジャラランガ') {
        if (move.name === 'スケイルノイズ') {
          return 'ブレイジングソウルビート'
        }
      }
      if (pokemonName === 'カプ・コケコ' || pokemonName === 'カプ・テテフ' ||
          pokemonName === 'カプ・ブルル' || pokemonName === 'カプ・レヒレ') {
        if (move.name === 'しぜんのいかり') {
          // 相手の残りHPの3/4のダメージを与える。
          return 'ガーディアン・デ・アローラ'
        }
      }
      if (pokemonName === 'ソルガレオ') {
        if (move.name === 'メテオドライブ') {
          // 相手の特性を無視して攻撃する
          return 'サンシャインスマッシャー'
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'たそがれのたてがみ(日食)') {
        if (move.name === 'メテオドライブ') {
          // 相手の特性を無視して攻撃する
          return 'サンシャインスマッシャー'
        }
      }
      if (pokemonName === 'ルナアーラ') {
        if (move.name === 'シャドーレイ') {
          // 相手の特性を無視して攻撃する
          return 'ムーンライトブラスター'
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'あかつきのつばさ(月食)') {
        if (move.name === 'シャドーレイ') {
          // 相手の特性を無視して攻撃する
          return 'ムーンライトブラスター'
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'ウルトラネクロズマ') {
        if (move.name === 'フォトンゲイザー') {
          return 'てんこがすめつぼうのひかり'
        }
      }
      if (pokemonName === 'マーシャドー') {
        if (move.name === 'シャドースチール') {
          return 'しちせいだっこんたい'
        }
      }
    }

    if (isZ) {
      if (move.damageType === DamageType.STATUS) {
        return null
      }
      
      if (move.typeId === MoveEnum.Normal) {
        return 'ウルトラダッシュアタック'
      }
      if (move.typeId === MoveEnum.Fire) {
        return 'ダイナミックフルフレイム'
      }
      if (move.typeId === MoveEnum.Water) {
        return 'スーパーアクアトルネード'
      }
      if (move.typeId === MoveEnum.Grass) {
        return 'ブルームシャインエクストラ'
      }
      if (move.typeId === MoveEnum.Electric) {
        return 'スパーキングギガボルト'
      }
      if (move.typeId === MoveEnum.Ice) {
        return 'レイジングジオフリーズ'
      }
      if (move.typeId === MoveEnum.Fighting) {
        return 'ぜんりょくむそうげきれつけん'
      }
      if (move.typeId === MoveEnum.Poison) {
        return 'アシッドポイズンデリート'
      }
      if (move.typeId === MoveEnum.Ground) {
        return 'ライジングランドオーバー'
      }
      if (move.typeId === MoveEnum.Flying) {
        return 'ファイナルダイブクラッシュ'
      }
      if (move.typeId === MoveEnum.Psychic) {
        return 'マキシマムサイブレイカー'
      }
      if (move.typeId === MoveEnum.Bug) {
        return 'ぜったいほしょくかいてんざん'
      }
      if (move.typeId === MoveEnum.Rock) {
        return 'ワールズエンドフォール'
      }
      if (move.typeId === MoveEnum.Ghost) {
        return 'むげんあんやへのいざない'
      }
      if (move.typeId === MoveEnum.Dragon) {
        return 'アルティメットドラゴンバーン'
      }
      if (move.typeId === MoveEnum.Dark) {
        return 'ブラックホールイクリプス'
      }
      if (move.typeId === MoveEnum.Steel) {
        return 'ちょうぜつらせんれんげき'
      }
      if (move.typeId === MoveEnum.Fairy) {
        return 'ラブリースターインパクト'
      }
    }

    return null
  }

  /**
   * わざの威力が上書きされるかを判定します。
   * @returns 上書きしたわざの威力 or null：上書き無し
   */
  static movePower(attackPokemonName: PokemonName, move: Move, defenceAbility: string, weather: string, isZ: boolean, isZExclusive: boolean): number | null {
    
    if (move.damageType === DamageType.STATUS) {
      return null;
    }

    if (!isZ && !isZExclusive) {
      if (move.name === 'ウェザーボール') {
        if (defenceAbility != 'ノーてんき' && defenceAbility != 'エアロック') {
          if (weather === 'にほんばれ' || weather === 'あめ' || weather === 'すなあらし' ||
            weather === 'おおひでり' || weather === 'おおあめ' || weather === 'あられ') {
            return 100
          }
        }
      }
    }

    const pokemonName = attackPokemonName.name
    const pokemonFormName = attackPokemonName.formName

    if (isZExclusive) {
      if (pokemonName === 'ピカチュウ') {
        if (move.name === 'ボルテッカー') {
          return 210
        }
      }
      if (pokemonName === 'サトシのピカチュウ') {
        if (move.name === '１０まんボルト') {
          return 195
        }
      }
      if (pokemonName === 'ライチュウ' && pokemonFormName === 'アローラのすがた') {
        if (move.name === '１０まんボルト') {
          return 175
        }
      }
      if (pokemonName === 'カビゴン') {
        if (move.name === 'ギガインパクト') {
          return 210
        }
      }
      if (pokemonName === 'ミュウ') {
        if (move.name === 'サイコキネシス') {
          return 185
        }
      }
      if (pokemonName === 'ジュナイパー') {
        if (move.name === 'かげぬい') {
          return 180
        }
      }
      if (pokemonName === 'ガオガエン') {
        if (move.name === 'ＤＤラリアット') {
          return 180
        }
      }
      if (pokemonName === 'アシレーヌ') {
        if (move.name === 'うたかたのアリア') {
          return 195
        }
      }
      if (pokemonName === 'ルガルガン') {
        if (move.name === 'ストーンエッジ') {
          return 190
        }
      }
      if (pokemonName === 'ミミッキュ') {
        if (move.name === 'じゃれつく') {
          return 190
        }
      }
      if (pokemonName === 'ジャラランガ') {
        if (move.name === 'スケイルノイズ') {
          return 185
        }
      }
      if (pokemonName === 'カプ・コケコ' || pokemonName === 'カプ・テテフ' ||
          pokemonName === 'カプ・ブルル' || pokemonName === 'カプ・レヒレ') {
        if (move.name === 'しぜんのいかり') {
          // 相手の残りHPの3/4のダメージを与える。
        }
      }
      if (pokemonName === 'ソルガレオ') {
        if (move.name === 'メテオドライブ') {
          // 相手の特性を無視して攻撃する
          return 200
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'たそがれのたてがみ(日食)') {
        if (move.name === 'メテオドライブ') {
          // 相手の特性を無視して攻撃する
          return 200
        }
      }
      if (pokemonName === 'ルナアーラ') {
        if (move.name === 'シャドーレイ') {
          // 相手の特性を無視して攻撃する
          return 200
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'あかつきのつばさ(月食)') {
        if (move.name === 'シャドーレイ') {
          // 相手の特性を無視して攻撃する
          return 200
        }
      }
      if (pokemonName === 'ネクロズマ' && pokemonFormName === 'ウルトラネクロズマ') {
        if (move.name === 'フォトンゲイザー') {
          return 200
        }
      }
      if (pokemonName === 'マーシャドー') {
        if (move.name === 'シャドースチール') {
          return 195
        }
      }
    }

    if (isZ) {
      if (move.name === 'メガドレイン') {
        return 120
      }
      if (move.name === 'Vジェネレート') {
        return 220
      }
      if (move.name === 'コアパニッシャー') {
        return 140
      }
      if (move.name === 'サウザンアロー') {
        return 180
      }
      if (move.name === 'グランドフォース') {
        return 185
      }
      if (move.name === 'マルチアタック') {
        return 185
      }
      if (move.name === 'フライングプレス') {
        return 170
      }
      if (move.name === 'ギアソーサー') {
        return 180
      }
      if (move.name === 'スイープビンタ') {
        return 140
      }
      if (move.name === 'タネマシンガン') {
        return 140
      }
      if (move.name === 'ダブルアタック') {
        return 140
      }
      if (move.name === 'つららばり') {
        return 140
      }
      if (move.name === 'ボーンラッシュ') {
        return 140
      }
      if (move.name === 'ミサイルばり') {
        return 140
      }
      if (move.name === 'ロックブラスト') {
        return 140
      }
      if (move.name === 'アシストパワー') {
        return 160
      }
      if (move.name === 'ウェザーボール') {
        return 160
      }
      if (move.name === 'たたりめ') {
        return 160
      }
      if (move.name === 'つけあがる') {
        return 160
      }
      if (move.name === 'エレキボール') {
        return 160
      }
      if (move.name === 'おしおき') {
        return 160
      }
      if (move.name === 'おんがえし') {
        return 160
      }
      if (move.name === 'きしかいせい') {
        return 160
      }
      if (move.name === 'きりふだ') {
        return 160
      }
      if (move.name === 'くさむすび') {
        return 160
      }
      if (move.name === 'けたぐり') {
        return 160
      }
      if (move.name === 'しぜんのめぐみ') {
        return 160
      }
      if (move.name === 'じたばた') {
        return 160
      }
      if (move.name === 'しぼりとる') {
        return 180
      }
      if (move.name === 'ジャイロボール') {
        return 160
      }
      if (move.name === 'にぎりつぶす') {
        return 180
      }
      if (move.name === 'ヒートスタンプ') {
        return 160
      }
      if (move.name === 'ヘビーボンバー') {
        return 160
      }
      if (move.name === 'マグニチュード') {
        return 140
      }
      if (move.name === 'やつあたり') {
        return 160
      }
      if (move.name === 'サイコウェーブ') {
        return 100
      }
      if (move.name === 'ソニックブーム') {
        return 100
      }
      if (move.name === 'ちきゅうなげ') {
        return 100
      }
      if (move.name === 'ナイトヘッド') {
        return 100
      }
      if (move.name === 'りゅうのいかり') {
        return 100
      }
      if (move.name === 'いかりのまえば') {
        return 100
      }
      if (move.name === 'いのちがけ') {
        return 180
      }
      if (move.name === 'がむしゃら') {
        return 160
      }
      if (move.name === 'しぜんのいかり') {
        return 100
      }
      if (move.name === 'カウンター') {
        return 100
      }
      if (move.name === 'ミラーコート') {
        return 100
      }
      if (move.name === 'メタルバースト') {
        return 100
      }
      if (move.name === 'じわれ') {
        return 180
      }
      if (move.name === 'ぜったいれいど') {
        return 180
      }
      if (move.name === 'つのドリル') {
        return 180
      }
      if (move.name === 'ハサミギロチン') {
        return 180
      }

      const movePower = parseInt(move.power)
      if (movePower >= 140 && 250 <= movePower) {
        return 200
      }
      if (movePower >= 130 && 139 <= movePower) {
        return 195
      }
      if (movePower >= 120 && 129 <= movePower) {
        return 190
      }
      if (movePower >= 110 && 119 <= movePower) {
        return 185
      }
      if (movePower >= 100 && 109 <= movePower) {
        return 180
      }
      if (movePower >= 90 && 99 <= movePower) {
        return 175
      }
      if (movePower >= 80 && 89 <= movePower) {
        return 160
      }
      if (movePower >= 70 && 79 <= movePower) {
        return 140
      }
      if (movePower >= 60 && 69 <= movePower) {
        return 120
      }
      if (movePower >= 10 && 59 <= movePower) {
        return 100
      }
    }
    return null;
  }
}