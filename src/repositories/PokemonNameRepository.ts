import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonName } from './../models/data';
import { IPokemonNameRepository } from './IPokemonNameRepository';
import { CsvType } from '../enumerators';
import { CsvHelper, StringHelper } from '../helpers';
import { GameVersion } from './../types';

@injectable()
export class PokemonNameRepository implements IPokemonNameRepository {
  public find(version: GameVersion, localLanguageId: string): PokemonName[] {
    const pokemonNames = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_NAMES, version))

    const result: PokemonName[] = []

    pokemonNames.filter((x: any) => x.localLanguageId === localLanguageId).forEach((x: any) => {
      const pokemonName = new PokemonName(x.pokemonId, x.localLanguageId, x.name, x.formName)
      result.push(pokemonName)
    });

    return result
  }
}