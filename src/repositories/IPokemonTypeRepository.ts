import { GameVersion } from '../types';
import { PokemonType } from '../models/data';

export interface IPokemonTypeRepository {
  find(id: string, version: GameVersion): PokemonType[];
}