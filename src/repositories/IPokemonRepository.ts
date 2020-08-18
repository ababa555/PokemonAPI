import { GameVersion } from '../types';
import { Pokemon } from '../models/data';

export interface IPokemonRepository {
  find(version: GameVersion, includeAnotherForm: string): Pokemon[];
}