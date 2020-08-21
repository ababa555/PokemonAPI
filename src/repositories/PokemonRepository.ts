import { ArrayHelper } from './../helpers/ArrayHelper';
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
    const pokemons = this.findImpl(version)

    const result = pokemons.filter((x: any) => {
      if (includeAnotherForm === "0") {
        if (!StringHelper.ToBoolean(x.isDefault)) {
          return false
        }
      }
      return true
    })

    return result
  }

  public get(id: string, version: GameVersion): Pokemon {
    const pokemons = this.findImpl(version)

    const result = ArrayHelper.ensure(pokemons.find((x: any) => {
      return x.id === id
    }))

    return result
  }

  public findByNo(no: string, version: GameVersion): Pokemon[] {
    const pokemons = this.findImpl(version)
    
    const result = pokemons.filter((x: any) => {
      return x.no === no
    })

    return result
  }

  public getByNo(no: string, version: GameVersion): Pokemon {
    const pokemons = this.find(version, "0")
    
    const result = ArrayHelper.ensure(pokemons.find((x: any) => {
      return x.no === no
    }))

    return result
  }

  private findImpl(version: GameVersion): Pokemon[] {
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const result: Pokemon[] = []

    pokemons.forEach((x: any) => {
      const pokemon = new Pokemon(x.id, x.no, x.height, x.weight, x.order, x.isDefault)
      result.push(pokemon)
    });

    return result
  }
}