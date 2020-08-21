import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonStats } from '../models/data';
import { IPokemonStatsRepository } from './IPokemonStatsRepository';
import { CsvType } from '../enumerators';
import { ArrayHelper, CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class PokemonStatsRepository implements IPokemonStatsRepository {
  public get(id: string, version: GameVersion): PokemonStats {
    const moves = this.findImpl(version)

    const result = ArrayHelper.ensure(moves.find((x:PokemonStats) => x.pokemonId === id));
    return result
  }

  public findImpl(version: GameVersion): PokemonStats[] {
    const statses = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_STATSES, version))

    const result: PokemonStats[] = []

    statses.forEach((x: any) => {
      const stats = new PokemonStats(x.pokemonId, x.hp, x.attack, x.defense, x.spAttack, x.spDefense, x.speed)
      result.push(stats)
    });
    return result
  }
}