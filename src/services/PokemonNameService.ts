import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonNameService } from './IPokemonNameService';
import { IPokemonRepository, IPokemonNameRepository } from '../repositories'
import { Pokemon } from '../models/data';
import { PokemonName } from '../models/data';
import { GameVersion } from './../types';
import { ArrayHelper } from './../helpers';

@injectable()
export class PokemonNameService implements IPokemonNameService {
  private repository: IPokemonRepository;
  private nameRepository: IPokemonNameRepository;

  public constructor (
    @inject(TYPES.IPokemonRepository) repository: IPokemonRepository,
    @inject(TYPES.IPokemonNameRepository) nameRepository: IPokemonNameRepository) {
      this.repository = repository;
      this.nameRepository = nameRepository
  }

  public find(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonName[] {
    const pokemons = this.repository.find(version, includeAnotherForm)
    const pokemonNames = this.nameRepository.find(version, localLanguageId)
  
    const result: PokemonName[] = []

    pokemons.forEach((pokemon: Pokemon) => {
      const pokemonName = ArrayHelper.ensure(
        pokemonNames.find(x => x.pokemonId === pokemon.id && x.localLanguageId === localLanguageId))
      result.push(pokemonName)
    });

    return result
  }
}