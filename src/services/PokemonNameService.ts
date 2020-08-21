import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonNameService } from './IPokemonNameService';
import { IPokemonRepository, IPokemonNameRepository } from '../repositories'
import { Pokemon } from '../models/data';
import { PokemonNameResponse } from '../models/response';
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

  public find(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[] {
    const pokemons = this.repository.find(version, includeAnotherForm)
    const pokemonNames = this.nameRepository.find(version, localLanguageId)
  
    const result: PokemonNameResponse[] = []

    pokemons.forEach((pokemon: Pokemon) => {
      const pokemonName = ArrayHelper.ensure(
        pokemonNames.find(x => x.pokemonId === pokemon.id && x.localLanguageId === localLanguageId))
      const response = new PokemonNameResponse(pokemonName.pokemonId, pokemonName.localLanguageId, pokemonName.name, pokemonName.formName)
      result.push(response)
    });

    return result
  }
}