import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonNameService } from './IPokemonNameService';
import { IPokemonRepository, IPokemonNameRepository } from '../repositories'
import { Pokemon, PokemonName} from '../models/data';
import { PokemonNameResponse } from '../models/response';
import { ArrayHelper } from '../helpers';
import { GameVersion } from './../types';

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
      const target = ArrayHelper.ensure(pokemonNames.find((name: PokemonName) => {
        return name.pokemonId === pokemon.id 
        && name.localLanguageId === localLanguageId
      }))
      const pokemonName = new PokemonNameResponse(target.pokemonId, target.localLanguageId, target.name, target.formName)
      result.push(pokemonName)
    });

    return result
  }
}