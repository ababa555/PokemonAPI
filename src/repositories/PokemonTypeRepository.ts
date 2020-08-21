import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonType } from '../models/data';
import { IPokemonTypeRepository } from './IPokemonTypeRepository';
import { CsvType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class PokemonTypeRepository implements IPokemonTypeRepository {
  public find(id: string, version: GameVersion): PokemonType[] {
    const types = this.findImpl(version)

    const result = types.filter((x:PokemonType) => x.pokemonId === id);
    return result
  }

  public findImpl(version: GameVersion): PokemonType[] {
    const statses = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_TYPES, version))

    const result: PokemonType[] = []

    statses.forEach((x: any) => {
      const stats = new PokemonType(x.pokemonId, x.typeId)
      result.push(stats)
    });
    return result
  }
}