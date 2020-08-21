import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonAbility } from './../models/data';
import { IPokemonAbilityRepository } from './IPokemonAbilityRepository';
import { CsvType, GameVersionType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from './../types';

@injectable()
export class PokemonAbilityRepository implements IPokemonAbilityRepository {
  public find(id: string, version: GameVersion): PokemonAbility[] {
    // pika_veeは特性がない
    if (version !== GameVersionType.PIKA_VEE) {
      return new Array<PokemonAbility>()
    }

    const pokemonAbilities = this.findImpl(version)

    const result = pokemonAbilities.filter((x:PokemonAbility) => x.pokemonId === id);
    return result
  }

  public findImpl(version: GameVersion): PokemonAbility[] {
    const pokemonAbilities = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_ABILITIES, version))

    const result: PokemonAbility[] = []

    pokemonAbilities.forEach((x: any) => {
      const pokemonName = new PokemonAbility(x.pokemonId, x.abilityName, x.isHidden)
      result.push(pokemonName)
    });
    return result
  }
}