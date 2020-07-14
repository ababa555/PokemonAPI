import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IPokemonNameService } from './IPokemonNameService';
import { PokemonNamesResponse } from '../models';
import { CsvType } from '../enumerators';
import { CsvHelper, StringHelper } from '../helpers';

@injectable()
export class PokemonNameService implements IPokemonNameService {
  public findAll(version: string, localLanguageId: string, includeAnotherForm: string): PokemonNamesResponse[] {
    const pokemonNames = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_NAMES, version))
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const list: PokemonNamesResponse[] = []
  
    pokemons.forEach((pokemon: any) => {
      if (includeAnotherForm !== "1") {
        if (!StringHelper.ToBoolean(pokemon.isDefault)) {
          return
        }
      }

      const target = pokemonNames.find((name: any) => {
        return name.pokemonId === pokemon.id 
        && name.localLanguageId === localLanguageId
      })
      const item = new PokemonNamesResponse(target.pokemonId, target.name)
      list.push(item)
    });
    return list
  }
}