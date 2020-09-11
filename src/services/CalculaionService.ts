import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService } from './IPokemonService';
import { IPokemonAbilityRepository, IPokemonEvolutionChainRepository, IPokemonMoveRepository, IMoveRepository, IPokemonRepository, IPokemonNameRepository, IPokemonStatsRepository, IPokemonTypeRepository } from '../repositories'
import { ArrayHelper, DamageCalculationHelper } from '../helpers';
import { Move as MoveType, GameVersion } from './../types';
import { MoveType as MoveEnum } from './../enumerators';
import { PokemonResponse, PokemonTypeResponse, PokemonStatsResponse, PokemonMoveResponse, MoveResponse, PokemonEvolutionChainResponse, PokemonAbilityResponse } from './../models/response';
import { Pokemon, PokemonAbility, PokemonEvolutionChain, PokemonMove, Move, PokemonName, PokemonStats, PokemonType } from './../models/data';

// 計算式参考
// https://pokemon-wiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F#modify_values
export class CalculaionService {
  private service: IPokemonService;
  private repository: IPokemonRepository;
  private pokemonNameRepository: IPokemonNameRepository;
  private pokemonAbilityRepository: IPokemonAbilityRepository;
  private pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository;
  private pokemonMoveRepository: IPokemonMoveRepository;
  private pokemonStatsRepository: IPokemonStatsRepository;
  private pokemonTypeRepository: IPokemonTypeRepository;
  private moveRepository: IMoveRepository;

  public constructor (
    @inject(TYPES.IPokemonService) service: IPokemonService,
    @inject(TYPES.IPokemonRepository) repository: IPokemonRepository,
    @inject(TYPES.IPokemonNameRepository) pokemonNameRepository: IPokemonNameRepository,
    @inject(TYPES.IPokemonAbilityRepository) pokemonAbilityRepository: IPokemonAbilityRepository,
    @inject(TYPES.IPokemonEvolutionChainRepository) pokemonEvolutionChainRepository: IPokemonEvolutionChainRepository,
    @inject(TYPES.IPokemonMoveRepository) pokemonMoveRepository: IPokemonMoveRepository,
    @inject(TYPES.IPokemonStatsRepository) pokemonStatsRepository: IPokemonStatsRepository,
    @inject(TYPES.IPokemonTypeRepository) pokemonTypeRepository: IPokemonTypeRepository,
    @inject(TYPES.IMoveRepository) moveRepository: IMoveRepository) {
      this.service = service;
      this.repository = repository;
      this.pokemonNameRepository = pokemonNameRepository;
      this.pokemonAbilityRepository = pokemonAbilityRepository;
      this.pokemonEvolutionChainRepository = pokemonEvolutionChainRepository;
      this.pokemonMoveRepository = pokemonMoveRepository;
      this.pokemonStatsRepository = pokemonStatsRepository;
      this.pokemonTypeRepository = pokemonTypeRepository;
      this.moveRepository = moveRepository;
  }

  public calc(attackPokemonId: string, defencePokemonId: string, 
    attackPokemonAbility: string, defencePokemonAbility: string, 
    attackMoveName: string, version: GameVersion) {

    const attackPokemon = this.service.get(attackPokemonId, version, "1")
    const defencePokemon = this.service.get(defencePokemonId, version, "1")

    const attackMove = ArrayHelper.ensure(attackPokemon.pokemonMoves.find(x => x.moveName === attackMoveName))

    // タイプ相性
    const attackMoveTypeId = attackMove.move.typeId
    const defencePokemonTypeIds = defencePokemon.pokemonTypes.map(x => x.typeId)
    const effective = this.getEffective(attackMoveTypeId, defencePokemonTypeIds);

    // Note:invalidByTypeでやっていた目覚めるパワーの判定をどっかでやる
    // Note:〇〇スキンとかを考慮する
  }

  private getEffective(attackMoveTypeId: MoveType, defencePokemonTypeIds: MoveType[]): number {
    const result = DamageCalculationHelper.GetEffective(attackMoveTypeId, defencePokemonTypeIds)
    return result
  }
}