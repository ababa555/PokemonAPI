import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IPokemonNameService } from './IPokemonNameService';
import { PokemonNameResponse } from '../models';
import { CsvType } from '../enumerators';
import { CsvHelper, StringHelper } from '../helpers';

@injectable()
export class PokemonNameService implements IPokemonNameService {
  public findAll(version: string, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[] {
    const pokemonNames = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_NAMES, version))
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const result: PokemonNameResponse[] = []

    pokemons.filter((x: any) => {
      if (includeAnotherForm !== "1") {
        if (!StringHelper.ToBoolean(x.isDefault)) {
          return false
        }
      }
      return true
    }).forEach((pokemon: any) => {
      const target = pokemonNames.find((name: any) => {
        return name.pokemonId === pokemon.id 
        && name.localLanguageId === localLanguageId
      })
      const pokemonName = new PokemonNameResponse(target.pokemonId, target.localLanguageId, target.name, target.formName)
      result.push(pokemonName)
    });
    return result
  }
}