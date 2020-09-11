import { PokemonWithEverything } from '../models/data';
import { GameVersion } from './../types';

export interface IPokemonService {
  get(id: string, version: GameVersion, localLanguageId: string): PokemonWithEverything;

  getByNo(no: string, version: GameVersion, localLanguageId: string): PokemonWithEverything[];
}