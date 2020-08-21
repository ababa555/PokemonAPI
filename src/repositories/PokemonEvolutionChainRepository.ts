import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonEvolutionChain } from '../models/data';
import { IPokemonEvolutionChainRepository } from './IPokemonEvolutionChainRepository';
import { CsvType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class PokemonEvolutionChainRepository implements IPokemonEvolutionChainRepository {
  public find(id: string, version: GameVersion): PokemonEvolutionChain[] {
    const evolutionChains = this.findImpl(version)

    const result = evolutionChains.filter((x:PokemonEvolutionChain) => x.pokemonId === id);
    return result
  }

  public findImpl(version: GameVersion): PokemonEvolutionChain[] {
    const evolutionChains = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_EVOLUTION_CHAINS, version))

    const result: PokemonEvolutionChain[] = []

    evolutionChains.forEach((x: any) => {
      const evolutionChain = new PokemonEvolutionChain(x.pokemonId, x.evolutionChainId, x.order)
      result.push(evolutionChain)
    });
    return result
  }
}