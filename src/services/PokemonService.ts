import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService } from './';
import { IPokemonAbilityRepository, IPokemonEvolutionChainRepository, IPokemonMoveRepository, IMoveRepository, IPokemonRepository, IPokemonNameRepository, IPokemonStatsRepository, IPokemonTypeRepository } from '../repositories'
import { ArrayHelper } from '../helpers';
import { GameVersion } from './../types';
import { PokemonResponse, PokemonTypeResponse, PokemonStatsResponse, PokemonMoveResponse, MoveResponse, PokemonEvolutionChainResponse, PokemonAbilityResponse } from './../models/response';
import { Pokemon, PokemonAbility, PokemonEvolutionChain, PokemonMove, Move, PokemonName, PokemonStats, PokemonType } from './../models/data';

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

  public get(id: string, version: GameVersion, localLanguageId: string): PokemonResponse {
    const pokemon = this.repository.get(id, version)

    const result = this.getPokemon(pokemon, version, localLanguageId)
    return result
  }

  public getByNo(no: string, version: GameVersion, localLanguageId: string): PokemonResponse[] {
    const pokemons = this.repository.findByNo(no, version)

    const result : PokemonResponse[] = []

    pokemons.forEach((targetPokemon: Pokemon) => {
      const pokemon = this.getPokemon(targetPokemon, version, localLanguageId)
      result.push(pokemon)
    })
    
    return result
  }

  private getPokemon(pokemon: any, version: GameVersion, localLanguageId: string): PokemonResponse {
    // 特性
    const abilities : PokemonAbilityResponse[] = []
    const abilitiesData = this.pokemonAbilityRepository.find(pokemon.id, version)
    abilitiesData.forEach((x:PokemonAbility) => {
      const ability = new PokemonAbilityResponse(x.pokemonId, x.abilityName, x.isHidden)
      abilities.push(ability)
    });
    

    // 進化情報
    const evolutionChains : PokemonEvolutionChainResponse[] = []
    const evolutionChainsData = this.pokemonEvolutionChainRepository.find(pokemon.id, version)
    evolutionChainsData.forEach((x:any) => {
      const evolutionChain = new PokemonEvolutionChainResponse(x.pokemonId, x.evolutionChainId, x.order)
      evolutionChains.push(evolutionChain)
    });

    // 技
    const moves : PokemonMoveResponse[] = []
    const movesData = this.pokemonMoveRepository.find(pokemon.id, version);
    const moveList = this.moveRepository.find(version)
    movesData.forEach((x:PokemonMove) => {
      const targetMove = ArrayHelper.ensure(moveList.find(x => x.name === x.name))
      const moveData = new MoveResponse(targetMove.id, targetMove.name, targetMove.typeId, targetMove.power, targetMove.power2,
        targetMove.pp, targetMove.accuracy, targetMove.priority, targetMove.damageType, targetMove.isDirect, targetMove.canProtect)
      const move = new PokemonMoveResponse(x.pokemonId, x.moveName, moveData)
      moves.push(move)
    });

    // 名前
    const pokemonName = this.pokemonNameRepository.get(pokemon.id, version, localLanguageId)

    // ステータス
    const stats = this.pokemonStatsRepository.get(pokemon.id, version)
    
    // タイプ
    const types = this.pokemonTypeRepository.find(pokemon.id, version)

    const result = new PokemonResponse(
      pokemon.id, pokemon.no, pokemon.height, pokemon.weight, pokemon.order, pokemon.isDefault,
      pokemonName.name, pokemonName.formName,
      abilities, evolutionChains, moves, stats, types)

    return result
  }
}