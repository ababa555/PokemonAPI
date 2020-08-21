import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonName } from './../models/data';
import { IPokemonNameRepository } from './IPokemonNameRepository';
import { CsvType } from '../enumerators';
import { ArrayHelper, CsvHelper, StringHelper } from '../helpers';
import { GameVersion } from './../types';

@injectable()
export class PokemonNameRepository implements IPokemonNameRepository {
  public find(version: GameVersion, localLanguageId: string): PokemonName[] {
    const pokemonNames = this.findImpl(version)

    const result = pokemonNames.filter((x: any) => x.localLanguageId === localLanguageId);
    return result
  }

  public get(id: string, version: GameVersion, localLanguageId: string): PokemonName {
    const pokemonNames = this.findImpl(version)

    const result = ArrayHelper.ensure(pokemonNames.find((name: PokemonName) => {
      return name.pokemonId === id 
          && name.localLanguageId === localLanguageId
    }))
    return result
  }

  public findImpl(version: GameVersion): PokemonName[] {
    const pokemonNames = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_NAMES, version))

    const result: PokemonName[] = []

    pokemonNames.forEach((x: any) => {
      const pokemonName = new PokemonName(x.pokemonId, x.localLanguageId, x.name, x.formName)
      result.push(pokemonName)
    });
    return result
  }
}