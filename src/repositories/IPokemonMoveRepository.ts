import { GameVersion } from '../types';
import { PokemonMove } from '../models/data';

export interface IPokemonMoveRepository {
  find(id: string, version: GameVersion): PokemonMove[];
}