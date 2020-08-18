import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { Pokemon } from './../models/data';
import { IPokemonRepository } from './IPokemonRepository';
import { CsvType } from '../enumerators';
import { CsvHelper, StringHelper } from '../helpers';
import { GameVersion } from './../types';

@injectable()
export class PokemonRepository implements IPokemonRepository {
  public find(version: GameVersion, includeAnotherForm: string): Pokemon[] {
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const result: Pokemon[] = []

    pokemons.filter((x: any) => {
      if (includeAnotherForm !== "1") {
        if (!StringHelper.ToBoolean(x.isDefault)) {
          return false
        }
      }
      return true
    }).forEach((x: any) => {
      const pokemon = new Pokemon(x.id, x.no, x.height, x.weight, x.order, x.isDefault)
      result.push(pokemon)
    });

    return result
  }
}