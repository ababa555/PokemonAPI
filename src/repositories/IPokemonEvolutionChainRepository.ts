import { GameVersion } from '../types';
import { PokemonEvolutionChain } from '../models/data';

export interface IPokemonEvolutionChainRepository {
  find(id: string, version: GameVersion): PokemonEvolutionChain[];
}