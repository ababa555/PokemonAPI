import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { IPokemonService } from './';
import { PokemonResponse } from '../models';
import { CsvType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from './../types';
import { GameVersionType } from './../enumerators';
import { PokemonTypeResponse, PokemonStatsResponse, PokemonMoveResponse, PokemonEvolutionChainResponse, PokemonAbilityResponse } from './../models/response';

@injectable()
export class PokemonService implements IPokemonService {
  public get(id: string, version: GameVersion, localLanguageId: string): PokemonResponse {
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const targetPokemon = pokemons.find((x: any) => {
      return x.id === id
    })

    const result = this.getPokemon(targetPokemon, version, localLanguageId)
    return result
  }

  public getByNo(no: string, version: GameVersion, localLanguageId: string): PokemonResponse[] {
    const pokemons = CsvHelper.read(CsvHelper.filename(CsvType.POKEMONS, version))

    const targetPokemons = pokemons.filter((x: any) => {
      return x.no === no
    })

    const result : PokemonResponse[] = []

    targetPokemons.forEach((targetPokemon: any) => {
      const pokemon = this.getPokemon(targetPokemon, version, localLanguageId)
      result.push(pokemon)
    })
    
    return result
  }

  private getPokemon(pokemon: any, version: GameVersion, localLanguageId: string): PokemonResponse {

    // 特性
    const abilities : PokemonAbilityResponse[] = []
    // pika_veeは特性がない
    if (version !== GameVersionType.PIKA_VEE) {
      const csvAbilities = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_ABILITIES, version))
      csvAbilities.filter((x:any) => x.pokemonId === pokemon.id).forEach((x:any) => {
        const ability = new PokemonAbilityResponse(x.pokemonId, x.abilityName, x.isHidden)
        abilities.push(ability)
      });
    }

    // 進化情報
    const evolutionChains : PokemonEvolutionChainResponse[] = []
    const csvEvolutionChains = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_EVOLUTION_CHAINS, version))
    csvEvolutionChains.filter((x:any) => x.pokemonId === pokemon.id).forEach((x:any) => {
      const evolutionChain = new PokemonEvolutionChainResponse(x.pokemonId, x.evolutionChainId, x.order)
      evolutionChains.push(evolutionChain)
    });

    // 技
    const moves : PokemonMoveResponse[] = []
    const csvMoves = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_MOVES, version))
    csvMoves.filter((x:any) => x.pokemonId === pokemon.id).forEach((x:any) => {
      const move = new PokemonMoveResponse(x.pokemonId, x.moveName, x.move)
      moves.push(move)
    });

    // 名前
    const csvNames = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_NAMES, version))
    const pokemonName = csvNames.find((name: any) => {
      return name.pokemonId === pokemon.id 
      && name.localLanguageId === localLanguageId
    })

    // ステータス
    const csvStatses = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_STATSES, version))
    const targetStats = csvStatses.find((x:any) => x.pokemonId === pokemon.id)
    const stats = new PokemonStatsResponse(targetStats.pokemonId, targetStats.hp, targetStats.attack, targetStats.defense, targetStats.spAttack, targetStats.spDefense, targetStats.speed)

    // タイプ
    const csvTypes = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_TYPES, version))
    const types : PokemonTypeResponse[] = []
    csvTypes.filter((x:any) => x.pokemonId === pokemon.id).forEach((x:any) => {
      const type = new PokemonTypeResponse(x.pokemonId, x.typeId)
      types.push(type)
    });

    const result = new PokemonResponse(
      pokemon.id, pokemon.no, pokemon.height, pokemon.weight, pokemon.order, pokemon.isDefault,
      pokemonName.name, pokemonName.formName,
      abilities, evolutionChains, moves, stats, types)

    return result
  }
}