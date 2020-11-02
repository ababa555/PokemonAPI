import { Move, PokemonName } from '../../models/data';
import { Move as MoveType } from '../../types';
import { MoveType as MoveEnum, DamageType } from '../../enumerators';
import { DamageCalculationHelper } from '.';

export class DamageCalculationHelper_correctPower {
  /**
   * 【1】威力の補正値 を取得します。
   * @returns 初期値：4096 として、特性に応じて威力を補正した値を返します。
   */
  static correctPower(attackPokemonName: PokemonName, move: Move, attackAbility: string, defenceAbility: string, attackPokemonTypes: MoveType[], statusAilment: string, 
    attackItem: string, field: string, weather: string, isZ: boolean, isZExclusive: boolean, sport: string) {
    let result = 4096;

    // かたやぶり
    if (DamageCalculationHelper.isKatayaburi(attackAbility, defenceAbility)) {
      return result;
    }

    if (attackAbility === 'ダークオーラ' || defenceAbility === 'ダークオーラ') {
      if (attackAbility === 'オーラブレイク' || defenceAbility === 'オーラブレイク') {
        if (move.typeId === MoveEnum.Dark) {
          result = result * Math.round(3072 / 4096 * 10) / 10
        }
      } else {
        if (move.typeId === MoveEnum.Dark) {
          result = result * Math.round(5448 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'フェアリーオーラ' || defenceAbility === 'フェアリーオーラ') {
      if (attackAbility === 'オーラブレイク' || defenceAbility === 'オーラブレイク') {
        if (move.typeId === MoveEnum.Fairy) {
          result = result * Math.round(3072 / 4096 * 10) / 10
        }
      } else {
        if (move.typeId === MoveEnum.Fairy) {
          result = result * Math.round(5448 / 4096 * 10) / 10
        }
      }
    }

    // Note:性別が同じか異なるかによって威力が変わるが、初期段階では性別は考慮しない
    // if (defenceAbility === 'とうそうしん') {
    //   if (attackSex == 2 || defenceSex == 2) {
    //     result = result * Math.round(4096 * 10) / 10
    //   } else if (attackSex === defenceSex) {
    //     result = result * Math.round(5120 / 4096 * 10) / 10
    //   } else if (attackSex != defenceSex) {
    //     result = result * Math.round(3072 / 4096 * 10) / 10
    //   }
    // }

    if (attackAbility === 'エレキスキン') {
      if (!isZ && !isZExclusive) {
        if (move.typeId === MoveEnum.Normal) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'スカイスキン') {
      if (!isZ && !isZExclusive) {
        if (move.typeId === MoveEnum.Normal) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'フェアリースキン') {
      if (!isZ && !isZExclusive) {
        if (move.typeId === MoveEnum.Normal) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'フリーズスキン') {
      if (!isZ && !isZExclusive) {
        if (move.typeId === MoveEnum.Normal) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'ノーマルスキン') {
      if (!isZ && !isZExclusive) {
        // ノーマルタイプ以外の技をノーマルタイプに変更し、威力を1.2倍にする。
        if (move.typeId !== MoveEnum.Normal) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'てつのこぶし') {
      if (move.name === 'れんぞくパンチ' || move.name === 'メガトンパンチ' || move.name === 'ほのおのパンチ' || 
      move.name === 'れいとうパンチ' || move.name === 'かみなりパンチ' || move.name === 'ピヨピヨパンチ' || 
      move.name === 'マッハパンチ' || move.name === 'ばくれつパンチ' || move.name === 'きあいパンチ' || 
      move.name === 'コメットパンチ' || move.name === 'シャドーパンチ' || move.name === 'スカイアッパー' || 
      move.name === 'アームハンマー' || move.name === 'バレットパンチ' || move.name === 'ドレインパンチ' || 
      move.name === 'アイスハンマー') {
        result = result * Math.round(4915 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'すてみ') {
      if (move.name === 'すてみタックル' || move.name === 'ウッドハンマー' || move.name === 'ブレイブバード' || 
      move.name === 'とっしん' || move.name === 'じごくぐるま' || move.name === 'ボルテッカー' || 
      move.name === 'フレアドライブ' || move.name === 'もろはのずつき' || move.name === 'とびげり' || 
      move.name === 'とびひざげり' || move.name === 'アフロブレイク' || move.name === 'ワイルドボルト') {
        result = result * Math.round(4915 / 4096 * 10) / 10
      }
    }

    // バッテリー
    // Note:ダブルバトル専用なので初期段階では考慮しない

    if (attackAbility === 'ちからずく') {
      if (move.name === 'ポイズンテール' || move.name === 'クロスポイズン' || move.name === 'ヘドロウェーブ' || move.name === 'ダブルニードル' || 
      move.name === 'どくばり' || move.name === 'ヘドロこうげき' || move.name === 'ヘドロばくだん' || move.name === 'どくづき' || 
      move.name === 'ダストシュート' || move.name === 'スモッグ' || move.name === 'ほのおのパンチ' || move.name === 'ひのこ' || 
      move.name === 'かえんほうしゃ' || move.name === 'だいもんじ' || move.name === 'ねっぷう' || move.name === 'かえんぐるま' || 
      move.name === 'ブレイズキック' || move.name === 'フレアドライブ' || move.name === 'あおいほのお' || move.name === 'ふんえん' || 
      move.name === 'かえんだん' || move.name === 'ねっとう' || move.name === 'せいなるほのお' || move.name === 'れんごく' || 
      move.name === 'れいとうパンチ' || move.name === 'れいとうビーム' || move.name === 'こなゆき' || move.name === 'ふぶき' || 
      move.name === 'フリーズドライ' || move.name === 'かみなりパンチ' || move.name === 'でんきショック' || move.name === '10まんボルト' || 
      move.name === 'ボルテッカー' || move.name === 'らいげき' || move.name === 'のしかかり' || move.name === 'したでなめる' || 
      move.name === 'スパーク' || move.name === 'りゅうのいぶき' || move.name === 'はっけい' || move.name === 'ほうでん' || 
      move.name === 'かみなり' || move.name === 'とびはねる' || move.name === 'でんじほう' || move.name === 'ほっぺすりすり' || 
      move.name === 'いにしえのうた' || move.name === 'サイケこうせん' || move.name === 'ねんりき' || move.name === 'シグナルビーム' || 
      move.name === 'ピヨピヨパンチ' || move.name === 'みずのはどう' || move.name === 'ロッククライム' || move.name === 'ぼうふう' || 
      move.name === 'ばくれつパンチ' || move.name === 'ホネこんぼう' || move.name === 'ひっさつまえば' || move.name === 'じんつうりき' || 
      move.name === 'ほのおのキバ' || move.name === 'こおりのキバ' || move.name === 'かみなりのキバ' || move.name === 'たきのぼり' || 
      move.name === 'あくのはどう' || move.name === 'ドラゴンダイブ' || move.name === 'しねんのずつき' || move.name === 'たつまき' || 
      move.name === 'まわしげり' || move.name === 'ずつき' || move.name === 'かみつく' || move.name === 'いわなだれ' || 
      move.name === 'ニードルアーム' || move.name === 'おどろかす' || move.name === 'エアスラッシュ' || move.name === 'アイアンヘッド' || 
      move.name === 'ゴッドバード' || move.name === 'ふみつけ' || move.name === 'いびき' || move.name === 'つららおとし' || 
      move.name === 'ハートスタンプ' || move.name === 'ハードローラー' || move.name === 'びりびりちくちく' || move.name === 'ねこだまし' || 
      move.name === 'オーロラビーム' || move.name === 'じゃれつく' || move.name === 'とびかかる' || move.name === 'トロピカルキック' || 
      move.name === 'かみくだく' || move.name === 'アイアンテール' || move.name === 'いわくだき' || move.name === 'ブレイククロー' || 
      move.name === 'シェルブレード' || move.name === 'アクアブレイク' || move.name === 'シャドーボーン' || move.name === 'ほのおのムチ' || 
      move.name === 'ミストボール' || move.name === 'むしのていこう' || move.name === 'バークアウト' || move.name === 'シードフレア' || 
      move.name === 'マジカルフレイム' || move.name === 'ムーンフォース' || move.name === 'アシッドボム' || move.name === 'ようかいえき' || 
      move.name === 'サイコキネシス' || move.name === 'むしのさざめき' || move.name === 'きあいだま' || move.name === 'エナジーボール' || 
      move.name === 'だいちのちから' || move.name === 'ラスターカノン' || move.name === 'シャドーボール' || move.name === 'ラスターパージ' || 
      move.name === 'バブルこうせん' || move.name === 'からみつく' || move.name === 'あわ' || move.name === 'こごえるかぜ' || 
      move.name === 'がんせきふうじ' || move.name === 'マッドショット' || move.name === 'こごえるせかい' || move.name === 'じならし' || 
      move.name === 'ローキック' || move.name === 'だくりゅう' || move.name === 'どろばくだん' || move.name === 'ミラーショット' || 
      move.name === 'ナイトバースト' || move.name === 'オクタンほう' || move.name === 'グラスミキサー' || move.name === 'どろかけ' || 
      move.name === 'メタルクロー' || move.name === 'コメットパンチ' || move.name === 'グロウパンチ' || move.name === 'ダイヤストーム' || 
      move.name === 'チャージビーム' || move.name === 'ニトロチャージ' || move.name === 'げんしのちから' || move.name === 'ぎんいろのかぜ' || 
      move.name === 'あやしいかぜ' || move.name === 'トライアタック' || move.name === 'ひみつのちから' || move.name === 'かげぬい' || 
      move.name === 'アンカーショット' || move.name === 'じごくづき' || move.name === 'ゴッドバード' || move.name === 'ロケットずつき') {
        result = result * Math.round(5325 / 4096 * 10) / 10
      }
    }

    if (attackAbility === 'すなのちから') {
      if (weather === 'すなあらし') {
        if (move.typeId === MoveEnum.Rock || move.typeId === MoveEnum.Ground || move.typeId === MoveEnum.Steel) {
          result = result * Math.round(5325 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'アナライズ') {
      result = result * Math.round(5325 / 4096 * 10) / 10
    }

    if (attackAbility === 'かたいツメ') {
      if (DamageCalculationHelper.isDirectAttack(move)) {
        result = result * Math.round(5325 / 4096 * 10) / 10
      }
    }

    // パンクロック
    // Note:後で考慮する

    // パワースポット
    // Note:後で考慮する

    if (attackAbility === 'テクニシャン') {
      if (move.name !== 'ふくろだたき' && move.name !== 'わるあがき') {
        let power = parseInt(move.power);
        if (power <= 60) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'ねつぼうそう') {
      if (statusAilment === 'やけど') {
        if (move.damageType === DamageType.SPECIAL) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'どくぼうそう') {
      if (statusAilment === 'どく' || statusAilment === 'もうどく') {
        if (move.damageType === DamageType.PHYSICAL) {
          result = result * Math.round(6144 / 4096 * 10) / 10
        }
      }
    }

    if (attackAbility === 'がんじょうあご') {
      if (move.name === 'かみつく' || move.name === 'かみくだく' || move.name === 'どくどくのキバ' || 
      move.name === 'ほのおのキバ' || move.name === 'かみなりのキバ' || move.name === 'こおりのキバ' || 
      move.name === 'ひっさつまえば' || move.name === 'サイコファング') {
        result = result * Math.round(6144 / 4096 * 10) / 10 
      }
    }

    if (attackAbility === 'メガランチャー') {
      if (move.name === 'りゅうのはどう' || move.name === 'みずのはどう' || move.name === 'あくのはどう' || 
      move.name === 'いやしのはどう' || move.name === 'はどうだん' || move.name === 'こんげんのはどう') {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    // はがねのせいしん
    // Note:後で考慮する

    if (defenceAbility === 'たいねつ') {
      if (move.typeId === MoveEnum.Fire) {
        result = result * Math.round(2048 / 4096 * 10) / 10 
      }
    }

    if (defenceAbility === 'かんそうはだ') {
      if (move.typeId === MoveEnum.Fire) {
        result = result * Math.round(5120 / 4096 * 10) / 10 
      }
    }

    // ちからのハチマキ
    // 物理技の威力が1.1倍
    if (attackItem === 'ちからのハチマキ') {
      if (move.damageType === DamageType.PHYSICAL) {
        result = result * Math.round(4505 / 4096 * 10) / 10 
      }
    }

    // ものしりメガネ
    // 特殊技の威力が1.1倍
    if (attackItem === 'ものしりメガネ') {
      if (move.damageType === DamageType.SPECIAL) {
        result = result * Math.round(4505 / 4096 * 10) / 10
      }
    }

    if (attackItem === 'プレート') {
      if (move.damageType === DamageType.SPECIAL) {
        result = result * Math.round(4915 / 4096 * 10) / 10
      }
    }

    // こんごうだま
    // ディアルガに持たせるとドラゴンとはがねタイプの技の威力が1.2倍
    if (attackItem === 'こんごうだま') {
      if (attackPokemonName.name === 'ディアルガ') {
        if (move.typeId === MoveEnum.Dragon || move.typeId === MoveEnum.Steel) {
          result = result * Math.round(4915 / 4096 * 10) / 10 
        }
      }
    }

    // しらたま
    // パルキアに持たせると、ドラゴンとみずタイプのわざの威力が1.2倍になる
    if (attackItem === 'しらたま') {
      if (attackPokemonName.name === 'パルキア') {
        if (move.typeId === MoveEnum.Dragon || move.typeId === MoveEnum.Water) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    // はっきんだま
    // ギラティナに持たせると、ドラゴンとゴーストタイプの技の威力が1.2倍
    if (attackItem === 'はっきんだま') {
      if (attackPokemonName.name === 'ギラティナ') {
        if (move.typeId === MoveEnum.Dragon || move.typeId === MoveEnum.Ghost) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    // こころのしずく
    // ラティアスかラティオスに持たせると、エスパー・ドラゴンタイプの技の威力が1.2倍になる
    if (attackItem === 'こころのしずく') {
      if (attackPokemonName.name === 'ラティアス' || attackPokemonName.name === 'ラティオス') {
        if (move.typeId === MoveEnum.Psychic || move.typeId === MoveEnum.Dragon) {
          result = result * Math.round(4915 / 4096 * 10) / 10
        }
      }
    }

    // ノーマルジュエル
    // [ノーマル]タイプのポケモンに持たせると、1度だけノーマルタイプの技の威力が1.3倍になる。効果を発揮すると無くなる
    if (attackItem === 'ノーマルジュエル') {
      if (attackPokemonTypes.some(typeId => typeId === MoveEnum.Normal)) {
        result = result * Math.round(5325 / 4096 * 10) / 10
      }
    }

    if (move.name === 'ソーラービーム' || move.name === 'ソーラーブレード') {
      if (weather === 'あめ' || weather === 'おおあめ' || weather === 'すなあらし' || weather === 'あられ') {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    // さきどり
    // はたきおとす
    // てだすけ
    // じゅうでん

    if (move.name === 'からげんき') {
      if (attackAbility === 'どく' || attackAbility === 'やけど' || attackAbility === 'まひ' || attackAbility === 'もうどく') {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    // しおみず
    // 相手の残りHPが最大値の半分以下なら威力が2倍になる

    if (move.name === 'ベノムショック') {
      if (defenceAbility === 'どく' || defenceAbility === 'もうどく') {
        result = result * Math.round(8192 / 4096 * 10) / 10
      }
    }

    // ベノムショック＋どく・もうどく
    // かたきうち＋前ターンに味方が倒されている
    // クロスサンダー＋クロスフレイムの後
    // クロスフレイム＋クロスサンダーの後


    // フィールド弱化
    // フィールド強化（Note:第7世代までは1.5倍だったが、技の威力が1.3倍に変更されたのを考慮していない）
    if (field === 'エレキフィールド') {
      if (move.typeId === MoveEnum.Electric) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

    if (field === 'グラスフィールド') {
      if (move.typeId === MoveEnum.Grass) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
      if (move.name === 'じしん' || move.name === 'じならし' || move.name === 'マグニチュード') {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (field === 'ミストフィールド') {
      if (move.typeId === MoveEnum.Grass) {
        result = result * Math.round(2048 / 4096 * 10) / 10
      }
    }

    if (field === 'ミストフィールド') {
      if (move.typeId === MoveEnum.Psychic) {
        result = result * Math.round(6144 / 4096 * 10) / 10
      }
    }

      // みずあそび
      if (sport === 'みずあそび') {
        if (move.typeId === MoveEnum.Fire) {
          result = result * Math.round(1352 / 4096 * 10) / 10
        }
      }

      // どろあそび
      if (sport === 'どろあそび') {
        if (move.typeId === MoveEnum.Electric) {
          result = result * Math.round(1352 / 4096 * 10) / 10
        }
      }

    return result
  }
}