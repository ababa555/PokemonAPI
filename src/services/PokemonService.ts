import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService } from './';
import { IPokemonAbilityRepository, IPokemonEvolutionChainRepository, IPokemonMoveRepository, IMoveRepository, IPokemonRepository, IPokemonNameRepository, IPokemonStatsRepository, IPokemonTypeRepository } from '../repositories'
import { ArrayHelper } from '../helpers';
import { GameVersion } from './../types';
import { PokemonWithEverything, Pokemon, PokemonMove, Move } from './../models/data';

@injectable()
export class PokemonService implements IPokemonService {
  private repository: IPokemonRepository;
  private pokemonNameRepository: IPokemonNameRepository;
  private pokemonAbilityRepository: IPokemonAbilityRepository;
  private pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository;
  private pokemonMoveRepository: IPokemonMoveRepository;
  private pokemonStatsRepository: IPokemonStatsRepository;
  private pokemonTypeRepository: IPokemonTypeRepository;
  private moveRepository: IMoveRepository;

  public constructor (
    @inject(TYPES.IPokemonRepository) repository: IPokemonRepository,
    @inject(TYPES.IPokemonNameRepository) pokemonNameRepository: IPokemonNameRepository,
    @inject(TYPES.IPokemonAbilityRepository) pokemonAbilityRepository: IPokemonAbilityRepository,
    @inject(TYPES.IPokemonEvolutionChainRepository) pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository,
    @inject(TYPES.IPokemonMoveRepository) pokemonMoveRepository: IPokemonMoveRepository,
    @inject(TYPES.IPokemonStatsRepository) pokemonStatsRepository: IPokemonStatsRepository,
    @inject(TYPES.IPokemonTypeRepository) pokemonTypeRepository: IPokemonTypeRepository,
    @inject(TYPES.IMoveRepository) moveRepository: IMoveRepository) {
      this.repository = repository;
      this.pokemonNameRepository = pokemonNameRepository;
      this.pokemonAbilityRepository = pokemonAbilityRepository;
      this.pokemonEvolutionChainRepository = pokemonEvolutionChainRepository;
      this.pokemonMoveRepository = pokemonMoveRepository;
      this.pokemonStatsRepository = pokemonStatsRepository;
      this.pokemonTypeRepository = pokemonTypeRepository;
      this.moveRepository = moveRepository;
  }

  public get(id: string, version: GameVersion, localLanguageId: string): PokemonWithEverything {
    const pokemon = this.repository.get(id, version)

    const result = this.getPokemon(pokemon, version, localLanguageId)
    return result
  }

  public getByNo(no: string, version: GameVersion, localLanguageId: string): PokemonWithEverything[] {
    const pokemons = this.repository.findByNo(no, version)

    const result : PokemonWithEverything[] = []

    pokemons.forEach((targetPokemon: Pokemon) => {
      const pokemon = this.getPokemon(targetPokemon, version, localLanguageId)
      result.push(pokemon)
    })
    
    return result
  }

  private getPokemon(pokemon: Pokemon, version: GameVersion, localLanguageId: string): PokemonWithEverything {
    // 特性
    const abilities = this.pokemonAbilityRepository.find(pokemon.id, version)

    // 進化情報
    const evolutionChains = this.pokemonEvolutionChainRepository.find(pokemon.id, version)

    // 技
    const moves = this.pokemonMoveRepository.find(pokemon.id, version);
    const allMoves = this.moveRepository.find(version)
    moves.forEach((rememberMove: PokemonMove) => {
      const move = ArrayHelper.ensure(allMoves.find(x => x.name === rememberMove.moveName))
      rememberMove.move = move
    });

    // 名前
    const pokemonName = this.pokemonNameRepository.get(pokemon.id, version, localLanguageId)

    // ステータス
    const stats = this.pokemonStatsRepository.get(pokemon.id, version)
    
    // タイプ
    const types = this.pokemonTypeRepository.find(pokemon.id, version)

    return new PokemonWithEverything(pokemon, pokemonName, abilities, evolutionChains, moves, stats, types);
  }
}