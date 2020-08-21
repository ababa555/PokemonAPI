import { GameVersion } from '../types';
import { PokemonStats } from '../models/data';

export interface IPokemonStatsRepository {
  get(id: string, version: GameVersion): PokemonStats;
}