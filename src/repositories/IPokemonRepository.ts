import { GameVersion } from '../types';
import { Pokemon } from '../models/data';

export interface IPokemonRepository {
  find(version: GameVersion, includeAnotherForm: string): Pokemon[];

  findByNo(no: string, version: GameVersion): Pokemon[];

  get(id: string, version: GameVersion): Pokemon;

  getByNo(no: string, version: GameVersion): Pokemon;
}