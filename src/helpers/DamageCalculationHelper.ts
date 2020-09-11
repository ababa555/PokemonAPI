import { Move, PokemonType, PokemonName } from './../models/data';
import { Move as MoveType } from './../types';
import { MoveType as MoveEnum, DamageType } from './../enumerators';

export class DamageCalculationHelper {
  /**
   * 技が直接攻撃かどうかを判定します。
   * https://wiki.xn--rckteqa2e.com/wiki/%E7%9B%B4%E6%8E%A5%E6%94%BB%E6%92%83
   * @returns true:直接攻撃 false:直接攻撃ではない
   */
  IsDirectAttack(move: Move): boolean {
    if (move.damageType === DamageType.PHYSICAL) {
      // 直接攻撃に該当しない物理わざはかたいツメの対象
      if (move.name !== 'いわおとし' && move.name !== 'いわなだれ' && move.name !== 'うちおとす' && 
      move.name !== 'かげぬい' && move.name !== 'がんせきふうじ' && 
      move.name !== 'がんせきほう' && move.name !== 'グランドフォース' && move.name !== 'クロスサンダー' && 
      move.name !== 'こうげきしれい' && move.name !== 'こおりのつぶて' && move.name !== 'ゴッドバード' && 
      move.name !== 'サイコカッター' && move.name !== 'じしん' && move.name !== 'しぜんのめぐみ' && 
      move.name !== 'じならし' && move.name !== 'じばく' && move.name !== 'じわれ' && 
      move.name !== 'ストーンエッジ' && move.name !== 'すなじごく' && move.name !== 'せいなるほのお' && 
      move.name !== 'だいばくはつ' && move.name !== 'ダストシュート' && move.name !== 'タネばくだん' && 
      move.name !== 'タネマシンガン' && move.name !== 'ダブルニードル' && move.name !== 'タマゴばくだん' && 
      move.name !== 'たまなげ' && move.name !== 'つららおとし' && move.name !== 'つららばり' && 
      move.name !== 'どくばり' && move.name !== 'とげキャノン' && move.name !== 'なげつける' && 
      move.name !== 'ネコにこばん' && move.name !== 'はっぱカッター' && move.name !== 'はなふぶき' && 
      move.name !== 'ひみつのちから' && move.name !== 'フェイント' && move.name !== 'ふくろだたき' && 
      move.name !== 'フリーズボルト' && move.name !== 'プレゼント' && move.name !== 'ボーンラッシュ' && 
      move.name !== 'ホネこんぼう' && move.name !== 'ホネブーメラン' && move.name !== 'マグニチュード' && 
      move.name !== 'マグネットボム' && move.name !== 'ミサイルばり' && move.name !== 'みずしゅりけん' && 
      move.name !== 'メタルバースト' && move.name !== 'ロックブラスト') {
        return true;
      }
    }

    // 直接攻撃に該当する特殊わざはかたいツメの対象
    if (move.damageType === DamageType.SPECIAL) {
      if (move.name === 'いのちがけ' || move.name === 'きりふだ' || move.name === 'くさむすび' || 
      move.name === 'しぼりとる' || move.name === 'ドレインキッス' || move.name === 'はなびらのまい' || 
      move.name === 'まとわりつく') {
        return true;
      }
    }
    return false;
  }

  /**
   * かたやぶりで無視される特性かを判定します。
   * https://wiki.xn--rckteqa2e.com/wiki/%E3%81%8B%E3%81%9F%E3%82%84%E3%81%B6%E3%82%8A
   * @returns true:かたやぶりで無視される false:かたやぶりで無視されない
   */
  static IsKatayaburi(attackAbility: string, defenceAbility: string): boolean {
    if (attackAbility === 'かたやぶり' || attackAbility === 'ターボブレイズ' ||attackAbility === 'テラボルテージ') {
      if (defenceAbility === 'あついしぼう' || defenceAbility === 'あまのじゃく' || defenceAbility === 'アロマベール' || 
        defenceAbility === 'かいりきバサミ' || defenceAbility === 'カブトアーマー' || defenceAbility === 'がんじょう' || 
        defenceAbility === 'かんそうはだ' || defenceAbility === 'きゅうばん' || defenceAbility === 'くさのけがわ' || 
        defenceAbility === 'クリアボディ' || defenceAbility === 'シェルアーマー' || defenceAbility === 'しめりけ' || 
        defenceAbility === 'じゅうなん' || defenceAbility === 'じょおうのいげん' || defenceAbility === 'しろいけむり' || 
        defenceAbility === 'スイートベール' || defenceAbility === 'すいほう' || defenceAbility === 'すながくれ' || 
        defenceAbility === 'するどいめ' || defenceAbility === 'せいしんりょく' || defenceAbility === 'そうしょく' || 
        defenceAbility === 'たいねつ' || 'defenceAbility === たんじゅん' || defenceAbility === 'ちくでん' || 
        defenceAbility === 'ちどりあし' || defenceAbility === 'ちょすい' || defenceAbility === 'テレパシー' || 
        defenceAbility === 'でんきエンジン' || defenceAbility === 'てんねん' || 'どんかん' || 'ねんちゃく' || 'ハードロック' || 
        defenceAbility === 'ばけのかわ' || defenceAbility === 'はとむね' || defenceAbility === 'ビビッドボディ' || 
        defenceAbility === 'ひらいしん' || defenceAbility === 'ファーコート' || defenceAbility === 'フィルター' || 
        defenceAbility === 'ふしぎなうろこ' || defenceAbility === 'ふしぎなまもり' || defenceAbility === 'ふみん' || 
        defenceAbility === 'ふゆう' || defenceAbility === 'フラワーギフト' || defenceAbility === 'フラワーベール' || 
        defenceAbility === 'フレンドガード' || 'ヘヴィメタル' || defenceAbility === 'ぼうおん' || 
        defenceAbility === 'ぼうじん' || defenceAbility === 'ぼうだん' || defenceAbility === 'マイペース' || 
        defenceAbility === 'マグマのよろい' || defenceAbility === 'マジックミラー' || defenceAbility === 'マルチスケイル' || 
        defenceAbility === 'みずのベール' || defenceAbility === 'ミラクルスキン' || defenceAbility === 'めんえき' || 
        defenceAbility === 'もふもふ' || defenceAbility === 'もらいび' || defenceAbility === 'やるき' || 
        defenceAbility === 'ゆきがくれ' || defenceAbility === 'よびみず' || defenceAbility === 'ライトメタル' || 
        defenceAbility === 'リーフガード' || defenceAbility === 'りんぷん') {
          return true;
      }
    }
    return false;
  }

  /**
   * わざのタイプが上書きされるかを判定します。
   * @returns 上書きするタイプ or null：上書き無し
   */
  overrideMoveType(move:Move, attackAbility:string, defenceAbility:string, weather:string, isZ: boolean) {

    if (defenceAbility != 'ノーてんき' && defenceAbility != 'エアロック') {
      if (move.name === 'ウェザーボール') {
        if (weather === 'にほんばれ') {
          return 'ほのお'
        }
        if (weather === 'あめ') {
          return 'みず'
        }
        if (weather === 'すなあらし') {
          return 'いわ'
        }
        if (weather === 'おおひでり') {
          return 'ほのお'
        }
        if (weather === 'おおあめ') {
          return 'みず'
        }
        if (weather === 'あられ') {
          return 'こおり'
        }
      }
    }

    if (attackAbility === 'エレキスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return 'でんき'
        }
      }
    }

    if (attackAbility === 'スカイスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return 'ひこう'
        }
      }
    }

    if (attackAbility === 'フェアリースキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return 'フェアリー'
        }
      }
    }

    if (attackAbility === 'フリーズスキン') {
      if (!isZ) {
        if (move.typeId === MoveEnum.Normal) {
          return 'こおり'
        }
      }
    }

    if (attackAbility === 'ノーマルスキン') {
      if (!isZ) {
        if (move.typeId !== MoveEnum.Normal) {
          return 'ノーマル'
        }
      }
    }
    return null
  }

  /**
   * わざ名が上書きされるかを判定します。
   * @returns 上書きするわざ名 or null：上書き無し
   */
  overrideMoveName(attackPokemonName: PokemonName, move: Move, isZ: boolean, isZExclusive: boolean) {
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
  overrideMovePower(attackPokemonName: PokemonName, move: Move, attackAbility: string, defenceAbility: string, weather: string, isZ: boolean, isZExclusive: boolean): number | null {
    
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

  /**
   * タイプによる無効を判定を判定します。
   * @returns true：無効 or false：有効
   */
  IsInvalidByType(move: Move, defenceId: string, defencePokemonTypes: PokemonType[]): boolean {
    // if (move.name === 'めざめるパワー') {
    //   let damages = Enumerable.from(typedamage)
    //   .where(x => x.Id == defenceId).select(x => x.Damages).singleOrDefault()
    //   let max = Enumerable.from(damages).max(x => x.Damage)
    //   let min = Enumerable.from(damages).min(x => x.Damage)
    //   damage = min + 'x' + '～'  + max + 'x'
    // }

    // いかりのこな(『くさ』タイプや特性『ぼうじん』のポケモンには無効)
    if (move.name === 'いかりのこな') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // おにび(『ほのお』タイプには無効)
    if (move.name === 'おにび') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Fire)) {
        return true
      }
    }

    // キノコのほうし(『くさ』タイプや特性『ぼうじん』のポケモンには無効)
    if (move.name === 'キノコのほうし') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // しびれごな	(『でんき』タイプや『くさ』タイプ、特性『ぼうじん』のポケモンには無効)
    if (move.name === 'しびれごな') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Electric) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // でんじは(『じめん』タイプや『でんき』タイプには無効)
    if (move.name === 'でんじは') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Ground) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Electric)) {
        return true
      }
    }

    // どくガス(『どく』タイプや『はがね』タイプには無効)
    if (move.name === 'どくガス') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Poison) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Steel)) {
        return true
      }
    }
    
    // どくどく(『どく』タイプや『はがね』タイプには無効)
    if (move.name === 'どくどく') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Poison) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Steel)) {
        return true
      }
    }

    // どくのこな(『どく』タイプや『はがね』タイプ、『くさ』タイプ、特性『ぼうじん』のポケモンには無効)
    if (move.name === 'どくのこな') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Poison) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Steel) ||
          defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // ねむりごな(『くさ』タイプや特性『ぼうじん』のポケモンには無効)
    if (move.name === 'ねむりごな') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // ふんじん(『くさ』タイプや特性『ぼうじん』のポケモンには無効)
    if (move.name === 'ふんじん') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // へびにらみ(『でんき』タイプには無効)
    if (move.name === 'へびにらみ') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Electric)) {
        return true
      }
    }

    // やどりぎのタネ(『くさ』タイプのポケモンには無効)
    if (move.name === 'やどりぎのタネ') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    // わたほうし(『くさ』タイプや特性『ぼうじん』のポケモンには無効)
    if (move.name === 'わたほうし') {
      if (defencePokemonTypes.some(x => x.typeId === MoveEnum.Grass)) {
        return true
      }
    }

    return false
  }

  /**
   * 特性による無効を判定を判定します。
   * @returns true：無効 or false：有効
   */
  static IsInvalidByAbility(move: Move, attackId: string, defencePokemonTypeIds: MoveType[], attackAbility: string, defenceAbility: string): boolean {
    // let damage = null
    // let attackPoke = Enumerable.from(data)
    // .where(x => x.Id == attackId).singleOrDefault()

    // let defencePoke = Enumerable.from(data)
    // .where(x => x.Id == defenceId).singleOrDefault()

    if (attackAbility === '' || defenceAbility === '') {
      return false
    }

    // かたやぶり
    if (this.IsKatayaburi(attackAbility, defenceAbility)) {
      return false;
    }

    // let damages = Enumerable.from(typedamage)
    // .where(x => x.Id == defenceId).select(x => x.Damages).singleOrDefault()

    // ふしぎなまもりの仕様
    // https://wiki.xn--rckteqa2e.com/wiki/%E3%81%B5%E3%81%97%E3%81%8E%E3%81%AA%E3%81%BE%E3%82%82%E3%82%8A
    if (defenceAbility === 'ふしぎなまもり') {
      if (move.damageType !== DamageType.STATUS) {
        // Note:めざめるパワーは面倒なのでとりあえず考慮しない
        if (move.name != 'めざめるパワー' && 
            move.name != 'シャドーレイ' && 
            move.name != 'メテオドライブ' && 
            move.name != 'フォトンゲイザー') {
          const effective = this.GetEffective(move.typeId, defencePokemonTypeIds)
          if (effective != 2 && effective != 4) {
            return true
          }
        }
      }
    }

    if (defenceAbility === 'アロマベール') {
      if (move.name === 'アンコール' || move.name === 'いちゃもん' || 
          move.name === 'かいふくふうじ' || move.name === 'かなしばり' || 
          move.name === 'ちょうはつ' || move.name === 'メロメロ') {
        return true;
      }
    }

    if (defenceAbility === 'かんそうはだ') {
      if (move.typeId === MoveEnum.Water) {
        return true
      }
    }

    if (defenceAbility === 'がんじょう') {
      if (move.name === 'じわれ' || move.name === 'ぜったいれいど' || 
          move.name === 'つのドリル' || move.name === 'ハサミギロチン') {
        return true
      }
    }

    if (defenceAbility === 'きゅうばん') {
      if (move.name === 'ふきとばし' || move.name === 'ほえる') {
        return true
      }
    }

    if (defenceAbility === 'かいりきバサミ') {
      // 相手のこうげきのみを下げるわざ
      if (move.name === 'あまえる'  || move.name === 'ちからをすいとる' || move.name === 'つぶらなひとみ' || 
      move.name === 'なかよくする' || move.name === 'なきごえ' || move.name === 'フェザーダンス') {
        return true
      }
    }

    if (defenceAbility === 'クリアボディ' || defenceAbility === 'メタルプロテクト' || 
        defenceAbility === 'しろいけむり') {
      // 相手のこうげきを下げるわざ
      if (move.name === 'あまえる' || move.name === 'おきみやげ' || move.name === 'おたけび' ||
      move.name === 'くすぐる' || move.name === 'すてゼリフ' || move.name === 'ちからをすいとる' ||
      move.name === 'つぶらなひとみ' || move.name === 'なかよくする' || move.name === 'なきごえ' ||
      move.name === 'なみだめ' || move.name === 'フェザーダンス' || move.name === 'ベノムトラップ') {
        return true
      }

      // 相手のとくこうを下げるわざ
      if (move.name === 'おきみやげ' || move.name === 'かいでんぱ' || move.name === 'すてゼリフ' || 
      move.name === 'ないしょばなし' || move.name === 'なみだめ' || move.name === 'ベノムトラップ' ||
      move.name === 'ゆうわく') {
        return true
      }

      // 相手のぼうぎょを下げるわざ
      if (move.name === 'いやなおと' || move.name === 'くすぐる' || move.name === 'しっぽをふる' || 
      move.name === 'にらみつける') {
        return true
      }

      // 相手のとくぼうを下げるわざ
      if (move.name === 'うそなき' || move.name === 'きんぞくおん') {
        return true
      }

      // 命中率を下げるわざ
      if (move.name === 'えんまく' || move.name === 'すなかけ' || move.name === 'スプーンまげ' ||
      move.name === 'フラッシュ') {
        return true
      }

      // 回避率を下げるわざ
      if (move.name === 'あまいかおり' || move.name === 'きりばらい') {
        return true
      }
    }

    if (defenceAbility === 'しめりけ') {
      if (move.name === 'じばく' || move.name === 'だいばくはつ' || move.name === 'ビッグリヘッド') {
        return true
      }
    }

    if (defenceAbility === 'じゅうなん') {
      if (move.name === 'しびれごな' || move.name === 'でんじは' || move.name === 'へびにらみ') {
        return true
      }
    }

    if (defenceAbility === 'じょおうのいげん') {
      if (move.name === 'ねこだまし' || move.name === 'しんそく' || move.name === 'フェイント' || 
          move.name === 'であいがしら' || move.name === 'アクアジェット' || move.name === 'つぶらなひとみ' || 
          move.name === 'バレットパンチ' || move.name === 'こおりのつぶて' || move.name === 'マッハパンチ' || 
          move.name === 'でんこうせっか' || move.name === 'かげうち' || move.name === 'しんくうは' || 
          move.name === 'ふいうち' || move.name === 'みずしゅりけん' || move.name === 'アクセルロック') {
        return true
      }
    }
    
    if (defenceAbility === 'スイートベール') {
      if (move.name === 'あくび' || move.name === 'あくまのキッス' || move.name === 'うたう' || move.name === 'キノコのほうし' ||
          move.name === 'くさぶえ' || move.name === 'さいみんじゅつ' || move.name === 'ダークホール' || move.name === 'ねむりごな') {
        return true
      }
    }

    if (defenceAbility === 'すいほう') {
      if (move.name === 'おにび') {
        return true
      }
    }
    
    if (defenceAbility === 'するどいめ') {
      if (move.name === 'えんまく' || move.name === 'すなかけ' || move.name === 'スプーンまげ' || move.name === 'フラッシュ') {
        return true
      }
    }

    if (defenceAbility === 'ぜったいねむり') {
      // こおらせるわざ
      // 変化技なし

      // どくにするわざ
      if (move.name === 'サイコシフト' || move.name === 'どくのいと' || move.name === 'どくのこな' ||
          move.name === 'どくびし') {
        return true
      }

      // まひさせるわざ
      if (move.name === 'しびれごな' || move.name === 'でんじは' || move.name === 'へびにらみ') {
        return true
      }
      
      // やけどにするわざ
      if (move.name === 'おにび') {
        return true
      }

      if (move.name === 'あくび' || move.name === 'あくまのキッス' || move.name === 'うたう' || move.name === 'キノコのほうし' ||
          move.name === 'くさぶえ' || move.name === 'さいみんじゅつ' || move.name === 'ダークホール' || move.name === 'ねむりごな') {
        return true
      }
    }
    
    if (defenceAbility === 'そうしょく') {
      if (move.typeId === MoveEnum.Grass) {
        return true
      }
    }

    if (defenceAbility === 'ちくでん') {
      if (move.typeId === MoveEnum.Electric) {
        return true
      }
    }

    if (defenceAbility === 'ちょすい') {
      if (move.typeId === MoveEnum.Water) {
        return true
      }
    }

    if (defenceAbility === 'でんきエンジン') {
      if (move.typeId === MoveEnum.Electric) {
        return true
      }
    }

    if (defenceAbility === 'どんかん') {
      if (move.name === 'メロメロ' || move.name === 'ちょうはつ' || move.name === 'ゆうわく') {
        return true
      }
    }

    if (defenceAbility === 'ひらいしん') {
      if (move.typeId === MoveEnum.Electric) {
        return true
      }
    }

    if (defenceAbility === 'ビビッドボディ') {
      if (move.name === 'ねこだまし' || move.name === 'しんそく' || move.name === 'フェイント' || 
          move.name === 'であいがしら' || move.name === 'アクアジェット' || move.name === 'つぶらなひとみ' || 
          move.name === 'バレットパンチ' || move.name === 'こおりのつぶて' || move.name === 'マッハパンチ' || 
          move.name === 'でんこうせっか' || move.name === 'かげうち' || move.name === 'しんくうは' || 
          move.name === 'ふいうち' || move.name === 'みずしゅりけん' || move.name === 'アクセルロック') {
        return true
      }
    }

    if (defenceAbility === 'ふみん') {
      if (move.name === 'あくび' || move.name === 'あくまのキッス' || move.name === 'うたう' || move.name === 'キノコのほうし' ||
          move.name === 'くさぶえ' || move.name === 'さいみんじゅつ' || move.name === 'ダークホール' || move.name === 'ねむりごな') {
        return true
      }
    }

    if (defenceAbility === 'ふゆう') {
      if (move.typeId === MoveEnum.Ground) {
        return true
      }
    }

    // フラワーベール
    // 味方すべての『くさ』タイプのポケモンは、味方自身以外の技や特性によって能力ランクを下げられず、
    // 状態異常にもならない。
    // 無視

    if (defenceAbility === 'ヘドロえき') {
      if (move.name === 'きゅうけつ' || move.name === 'ギガドレイン' || move.name === 'すいとる' || 
          move.name === 'ドレインキッス' || move.name === 'ドレインパンチ' || move.name === 'メガドレイン' ||
          move.name === 'やどりぎのタネ') {
        return true
      }
    }

    if (defenceAbility === 'ぼうおん') {
      if (move.name === 'いびき' || move.name === 'いやしのすず' || move.name === 'いやなおと' || 
          move.name === 'うたう' || move.name === 'うたかたのアリア' || move.name === 'エコーボイス' || 
          move.name === 'おしゃべり' || move.name === 'おたけび' || move.name === 'きんぞくおん' || 
          move.name === 'くさぶえ' || move.name === 'さわぐ' || move.name === 'スケイルノイズ' || 
          move.name === 'すてゼリフ' || move.name === 'チャームボイス' || move.name === 'ちょうおんぱ' || 
          move.name === 'ないしょばなし' || move.name === 'なきごえ' || move.name === 'バークアウト' || 
          move.name === 'ハイパーボイス' || move.name === 'ばくおんぱ' || move.name === 'ほえる' || 
          move.name === 'ほろびのうた' || move.name === 'むしのさざめき' || move.name === 'りんしょう' || 
          move.name === 'ブレイジングソウルビート') {
        return true
      }
    }

    if (defenceAbility === 'ぼうじん') {
      if (move.name === 'いかりのこな' || move.name === 'キノコのほうし' || move.name === 'しびれごな' || 
          move.name === 'どくのこな' || move.name === 'ねむりごな' || move.name === 'ふんじん' || 
          move.name === 'わたほうし') {
        return true
      }
    }

    if (defenceAbility === 'ぼうだん') {
      if (move.name === 'アイスボール' || move.name === 'アシッドボム' || move.name === 'ウェザーボール' || 
          move.name === 'エナジーボール' || move.name === 'エレキボール' || move.name === 'オクタンほう' || 
          move.name === 'かえんだん' || move.name === 'かふんだんご' || move.name === 'がんせきほう' || 
          move.name === 'きあいだま' || move.name === 'くちばしキャノン' || move.name === 'ジャイロボール' || 
          move.name === 'シャドーボール' || move.name === 'タネばくだん' || move.name === 'タネマシンガン' || 
          move.name === 'タマゴばくだん' || move.name === 'たまなげ' || move.name === 'でんじほう' || 
          move.name === 'どろばくだん' || move.name === 'はどうだん' || move.name === 'ヘドロばくだん' || 
          move.name === 'マグネットボム' || move.name === 'ミストボール' || move.name === 'ロックブラスト') {
        return true
      }
    }

    if (defenceAbility === 'ポイズンヒール') {
      if (move.name === 'サイコシフト' || move.name === 'どくのいと' || move.name === 'どくのこな' ||
          move.name === 'どくびし') {
        return true
      }
    }

    if (defenceAbility === 'マイペース') {
      // 「いばる」と「おだてる」はとりあえず外しておく
      if (move.name === 'あやしいひかり' || move.name === 'ダークパニック' || move.name === 'ちょうおんぱ' ||
          move.name === 'てんしのキッス' || move.name === 'フラフラダンス') {
        return true
      }
    }

    if (defenceAbility === 'マグマのよろい') {
      // こおらせる変化技なし 
    }

    if (defenceAbility === 'マジックミラー') {
      if (move.name === 'うたう' || move.name === 'ねむりごな' || move.name === 'さいみんじゅつ' || 
      move.name === 'あくまのキッス' || move.name === 'キノコのほうし' || move.name === 'くさぶえ' || 
      move.name === 'ダークホール' || move.name === 'どくどく' || move.name === 'どくのこな' || 
      move.name === 'どくガス' || move.name === 'しびれごな' || move.name === 'でんじは' || 
      move.name === 'へびにらみ' || move.name === 'おにび' || move.name === 'ちょうおんぱ' || 
      move.name === 'あやしいひかり' || move.name === 'てんしのキッス' || move.name === 'いばる' || 
      move.name === 'おだてる' || move.name === 'なきごえ' || move.name === 'しっぽをふる' || 
      move.name === 'にらみつける' || move.name === 'いとをはく' || move.name === 'すなかけ' || 
      move.name === 'えんまく' || move.name === 'スプーンまげ' || move.name === 'フラッシュ' || 
      move.name === 'あまいかおり' || move.name === 'あまえる' || move.name === 'フェザーダンス' || 
      move.name === 'いやなおと' || move.name === 'わたほうし' || move.name === 'こわいかお' || 
      move.name === 'うそなき' || move.name === 'きんぞくおん' || move.name === 'くすぐる' || 
      move.name === 'ゆうわく' || move.name === 'やどりぎのタネ' || move.name === 'クモのす' || 
      move.name === 'くろいまなざし' || move.name === 'とおせんぼう' || move.name === 'メロメロ' || 
      move.name === 'あくび' || move.name === 'いえき' || move.name === 'なやみのタネ' || 
      move.name === 'ふきとばし' || move.name === 'ほえる' || move.name === 'かなしばり' || 
      move.name === 'アンコール' || move.name === 'うらみ' || move.name === 'まきびし' || 
      move.name === 'みやぶる' || move.name === 'かぎわける' || move.name === 'いちゃもん' || 
      move.name === 'ちょうはつ' || move.name === 'ミラクルアイ' || move.name === 'さしおさえ' || 
      move.name === 'かいふくふうじ' || move.name === 'どくびし' || move.name === 'きりばらい' || 
      move.name === 'ステルスロック' || move.name === 'テレキネシス' || move.name === 'みずびたし' || 
      move.name === 'シンプルビーム' || move.name === 'なかまづくり' || move.name === 'いやしのはどう') {
        return true
      }
    }

    if (defenceAbility === 'みずのベール') {
      if (move.name === 'おにび') {
        return true
      }
    }

    if (defenceAbility === 'めんえき') {
      if (move.name === 'サイコシフト' || move.name === 'どくのいと' || move.name === 'どくのこな' ||
          move.name === 'どくびし') {
        return true
      }
    }

    if (defenceAbility === 'もらいび') {
      if (move.typeId === MoveEnum.Fire) {
        return true
      }
    }

    if (defenceAbility === 'やるき') {
      if (move.name === 'あくび' || move.name === 'あくまのキッス' || move.name === 'うたう' || move.name === 'キノコのほうし' ||
          move.name === 'くさぶえ' || move.name === 'さいみんじゅつ' || move.name === 'ダークホール' || move.name === 'ねむりごな') {
        return true
      }
    }

    if (defenceAbility === 'よびみず') {
      if (move.typeId === MoveEnum.Water) {
        return true
      }
    }

    return false
  }

  /**
   * 技の効果を取得します。
   * @returns 技の効果（0 or 0.25 or 0.5 or 1 or 2 or 4）
   */
  static GetEffective(attackMoveTypeId: MoveType, defencePokemonTypeIds: MoveType[]): number {
    const effectiveMap = new Map<[ MoveType, MoveType ], number>();
    // ノーマル
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Rock], 0.5)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Ghost], 0)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Normal, MoveEnum.Fairy], 1)
    // ほのお
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Water], 0.5)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Grass], 2)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Ice], 2)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Bug], 2)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Rock], 0.5)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Dragon], 0.5)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Steel], 2)
    effectiveMap.set([MoveEnum.Fire, MoveEnum.Fairy], 1)
    // みず
    effectiveMap.set([MoveEnum.Water, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Fire], 2)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Water], 0.5)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Grass], 0.5)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Ground], 2)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Rock], 2)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Dragon], 0.5)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Steel], 1)
    effectiveMap.set([MoveEnum.Water, MoveEnum.Fairy], 1)
    // でんき
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Water], 2)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Electric], 0.5)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Grass], 0.5)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Ground], 0)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Flying], 2)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Dragon], 0.5)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Steel], 1)
    effectiveMap.set([MoveEnum.Electric, MoveEnum.Fairy], 1)
    // くさ
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Water], 2)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Grass], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Poison], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Ground], 2)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Flying], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Bug], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Rock], 2)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Dragon], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Grass, MoveEnum.Fairy], 1)
    // こおり
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Water], 0.5)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Grass], 2)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Ice], 0.5)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Ground], 2)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Flying], 2)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Dragon], 2)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Ice, MoveEnum.Fairy], 1)
    // かくとう
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Normal], 2)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Ice], 2)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Poison], 0.5)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Flying], 0.5)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Psychic], 0.5)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Bug], 0.5)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Rock], 2)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Ghost], 0)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Dark], 2)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Steel], 2)
    effectiveMap.set([MoveEnum.Fighting, MoveEnum.Fairy], 0.5)
    // どく
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Grass], 2)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Poison], 0.5)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Ground], 0.5)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Rock], 0.5)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Ghost], 0.5)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Steel], 0)
    effectiveMap.set([MoveEnum.Poison, MoveEnum.Fairy], 0.5)
    // じめん
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Fire], 2)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Electric], 2)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Grass], 0.5)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Poison], 2)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Flying], 0)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Bug], 0.5)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Rock], 2)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Steel], 2)
    effectiveMap.set([MoveEnum.Ground, MoveEnum.Fairy], 1)
    // ひこう
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Electric], 0.5)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Grass], 2)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Fighting], 2)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Bug], 2)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Rock], 0.5)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Flying, MoveEnum.Fairy], 1)
    // エスパー
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Fighting], 2)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Poison], 2)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Psychic], 0.5)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Dark], 0)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Psychic, MoveEnum.Fairy], 1)
    // むし
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Grass], 2)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Fighting], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Poison], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Flying], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Psychic], 2)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Ghost], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Dark], 2)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Bug, MoveEnum.Fairy], 0.5)
    // いわ
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Fire], 2)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Ice], 2)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Fighting], 0.5)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Ground], 0.5)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Flying], 2)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Bug], 2)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Rock, MoveEnum.Fairy], 1)
    // ゴースト
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Normal], 0)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Psychic], 2)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Ghost], 2)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Dark], 0.5)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Steel], 1)
    effectiveMap.set([MoveEnum.Ghost, MoveEnum.Fairy], 1)
    // ドラゴン
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Dragon], 2)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Dragon, MoveEnum.Fairy], 0)
    // あく
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Fire], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Fighting], 0.5)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Psychic], 2)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Ghost], 2)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Dark], 0.5)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Steel], 1)
    effectiveMap.set([MoveEnum.Dark, MoveEnum.Fairy], 0.5)
    // はがね
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Water], 0.5)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Electric], 0.5)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Ice], 2)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Fighting], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Poison], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Rock], 2)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Dragon], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Dark], 1)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Steel, MoveEnum.Fairy], 2)
    // フェアリー
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Normal], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Fire], 0.5)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Water], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Electric], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Grass], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Ice], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Fighting], 2)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Poison], 0.5)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Ground], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Flying], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Psychic], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Bug], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Rock], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Ghost], 1)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Dragon], 2)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Dark], 2)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Steel], 0.5)
    effectiveMap.set([MoveEnum.Fairy, MoveEnum.Fairy], 1)

    let result = 1
    defencePokemonTypeIds.forEach(defencePokemonTypeId => {
      const effective = effectiveMap.get([attackMoveTypeId, defencePokemonTypeId])
      if (effective) {
        result *= effective
      }
    })

    return result;
  }
}


// if (attackAbility === 'うるおいボイス') {
//   if (move.name === 'いびき' || move.name === 'いやしのすず' || 
//       move.name === 'いやなおと' || move.name === 'うたう' || 
//       move.name === 'うたかたのアリア' || move.name === 'エコーボイス' || 
//       move.name === 'おしゃべり' || move.name === 'おたけび' || 
//       move.name === 'きんぞくおん' || move.name === 'くさぶえ' || 
//       move.name === 'さわぐ' || move.name === 'スケイルノイズ' || 
//       move.name === 'すてゼリフ' || move.name === 'チャームボイス' || 
//       move.name === 'ちょうおんぱ' || move.name === 'ないしょばなし' || 
//       move.name === 'なきごえ' || move.name === 'バークアウト' || 
//       move.name === 'ハイパーボイス' || move.name === 'ばくおんぱ' || 
//       move.name === 'ほえる' || move.name === 'ほろびのうた' || 
//       move.name === 'むしのさざめき' || move.name === 'りんしょう') {
//     // 水タイプになった場合のダメージを取得
//     const effective = this.GetEffective(MoveEnum.Water, defencePokemonTypeIds)
    
//     if (damage != damage2) {
//       damage = damageUtil.calc(damage2)
//     }
//     if (move.DamageType == 0) {
//       damage = '-'
//     }
//   }
// }

// if (attackAbility === 'エレキスキン') {
//   if (move.MoveType === 'ノーマル') {
//     // でんきタイプになった場合のダメージを取得
//     let damage2 = Enumerable.from(damages).where(x => x.AttackType == 'でんき').select(x => x.Damage).singleOrDefault()
    
//     if (damage != damage2) {
//       damage = damageUtil.calc(damage2)
//     }
//     if (move.DamageType == 0) {
//       damage = '-'
//     }
//   }
// }

// if (attackAbility === 'きもったま') {
//   // 防御側のポケモンタイプ
//   if (defencePoke.MoveType1 === 'ゴースト' || defencePoke.MoveType2 === 'ゴースト') {
//     if (move.MoveType === 'ノーマル' || move.MoveType === 'かくとう') {
//       damage = '1x'
//     }
//   }
// }

// if (attackAbility === 'スカイスキン') {
//   if (move.MoveType === 'ノーマル') {
//     // でんきタイプになった場合のダメージを取得
//     let damage2 = Enumerable.from(damages).where(x => x.AttackType == 'ひこう').select(x => x.Damage).singleOrDefault()
    
//     if (damage != damage2) {
//       damage = damageUtil.calc(damage2)
//     }
//     if (move.DamageType == 0) {
//       damage = '-'
//     }
//   }
// }

// if (attackAbility === 'ノーマルスキン') {
//   // ノーマルタイプになった場合のダメージを取得
//   let damage2 = Enumerable.from(damages).where(x => x.AttackType == 'ノーマル').select(x => x.Damage).singleOrDefault()
  
//   if (damage != damage2) {
//     damage = damageUtil.calc(damage2)
//   }
//   if (move.DamageType == 0) {
//     damage = '-'
//   }
// }

// if (attackAbility === 'フェアリースキン') {
//   if (move.MoveType === 'ノーマル') {
//     // フェアリータイプになった場合のダメージを取得
//     let damage2 = Enumerable.from(damages).where(x => x.AttackType == 'フェアリー').select(x => x.Damage).singleOrDefault()
    
//     if (damage != damage2) {
//       damage = damageUtil.calc(damage2)
//     }
//     if (move.DamageType == 0) {
//       damage = '-'
//     }
//   }
// }


// if (attackAbility === 'ふしょく') {
//   if (defencePoke.MoveType1 === 'どく' || defencePoke.MoveType2 === 'どく' ||
//       defencePoke.MoveType1 === 'はがね' || defencePoke.MoveType2 === 'はがね')
//   // どくにするわざ
//   if (move.name === 'サイコシフト' || move.name === 'どくのいと' || move.name === 'どくのこな' ||
//       move.name === 'どくびし') {
//     damage = '-'
//   }
// }

// if (attackAbility === 'フリーズスキン') {
//   if (move.MoveType === 'ノーマル') {
//     // こおりタイプになった場合のダメージを取得
//     let damage2 = Enumerable.from(damages).where(x => x.AttackType == 'こおり').select(x => x.Damage).singleOrDefault()
    
//     if (damage != damage2) {
//       damage = damageUtil.calc(damage2)
//     }
//     if (move.DamageType == 0) {
//       damage = '-'
//     }
//   }
// }