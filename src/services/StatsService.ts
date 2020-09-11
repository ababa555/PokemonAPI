import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IStatsService } from './IStatsService';
import { IPokemonStatsRepository } from './../repositories';
import { PokemonStats } from '../models/data';
import { GameVersionType } from './../enumerators';
import { GameVersion } from './../types';
import { TYPES } from './types';

// 計算式参考
// https://yakkun.com/dp/system.htm#calc
@injectable()
export class StatsService implements IStatsService {
  private pokemonStatsRepository: IPokemonStatsRepository;

  public constructor (
    @inject(TYPES.IPokemonStatsRepository) pokemonStatsRepository: IPokemonStatsRepository) {
      this.pokemonStatsRepository = pokemonStatsRepository;
    }

  public calc(pokemonId: string, version: GameVersion, 
    hpIndividual: number, attackIndividual: number, defenseIndividual: number, spAttackIndividual: number, spDefenseIndividual: number, speedIndividual: number,
    hpEffort: number, attackEffort: number, defenseEffort: number, spAttackEffort: number, spDefenseEffort: number, speedEffort: number,
    attackNature: number, defenseNature: number, spAttackNature: number, spDefenseNature: number, speedNature: number,
    option: number | undefined): PokemonStats {
    
    // 種族値
    const stats = this.pokemonStatsRepository.get(pokemonId, version)

    let hp: number
    if (version === GameVersionType.PIKA_VEE) {
      hp = this.calcHPByPikaVee(stats.hp, hpIndividual)
    } else if (version === GameVersionType.SWSH) {
      hp = this.calcHP(stats.hp, hpIndividual, hpEffort)
      // ソードシールドはダイマックス補正が設定される
      if (option !== undefined) {
        const dynamax = 1.50 + option * 0.05
        hp *= dynamax
      }
    } else {
      hp = this.calcHP(stats.hp, hpIndividual, hpEffort)
    }

    let attack: number
    let defense: number
    let spAttack: number
    let spDefense: number
    let speed: number
    if (version === GameVersionType.PIKA_VEE) {
      attack = this.calcOtherByPikaVee(stats.attack, attackIndividual, attackNature)
      defense = this.calcOtherByPikaVee(stats.defense, defenseIndividual, defenseNature)
      spAttack = this.calcOtherByPikaVee(stats.spAttack, spAttackIndividual, spAttackNature)
      spDefense = this.calcOtherByPikaVee(stats.spDefense, spDefenseIndividual, spDefenseNature)
      speed = this.calcOtherByPikaVee(stats.speed, speedIndividual, speedNature)
    } else {
      attack = this.calcOther(stats.attack, attackIndividual, attackEffort, attackNature)
      defense = this.calcOther(stats.defense, defenseIndividual, defenseEffort, defenseNature)
      spAttack = this.calcOther(stats.spAttack, spAttackIndividual, spAttackEffort, spAttackNature)
      spDefense = this.calcOther(stats.spDefense, spDefenseIndividual, spDefenseEffort, spDefenseNature)
      speed = this.calcOther(stats.speed, speedIndividual, speedEffort, speedNature)
    }

    const result = new PokemonStats(pokemonId, hp, attack, defense, spAttack, spDefense, speed)
    return result
  }

  // HPを計算します
  private calcHP(stats: number, individual: number, effort: number): number {
    // (種族値×2＋個体値＋努力値÷4)×レベル÷100＋レベル＋10
    const result = Math.floor(Math.floor((stats * 2 + individual + Math.floor(effort / 4))) / 2) + 60
    return result
  }

  // HPを計算します(ピカブイ)
  private calcHPByPikaVee(stats: number, individual: number): number {
    // (種族値×2＋個体値＋努力値÷4)×レベル÷100＋レベル＋10
    const result = Math.floor((stats * 2 + individual) / 2) + 60
    return result
  }

  // HP以外のステータスを計算します
  private calcOther(stats: number, individual: number, effort: number, nature: number): number {
    // {(種族値×2＋個体値＋努力値÷4)×レベル÷100＋5}×性格補正
    var temp1 = Math.floor(stats * 2) + individual + Math.floor(effort / 4);
    var temp2 = Math.floor(Math.floor(temp1 * 50) / 100) + 5;
    var result = Math.floor(temp2 * nature);
    return result
  }

  // HP以外のステータスを計算します
  private calcOtherByPikaVee(stats: number, individual: number, nature: number): number {
    // {(種族値×2＋個体値)×レベル÷100＋5}×性格補正×なつき度補正＋覚醒値
    var temp1 = Math.floor(stats * 2) + individual;
    var temp2 = Math.floor(Math.floor(temp1 * 50) / 100) + 5;
    var result = Math.floor(temp2 * nature);
    return result
  }
}