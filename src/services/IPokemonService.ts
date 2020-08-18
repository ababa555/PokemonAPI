import { PokemonResponse } from '../models';
import { GameVersion } from './../types';

export interface IPokemonService {
  get(id: string, version: GameVersion, localLanguageId: string): PokemonResponse;

  getByNo(no: string, version: GameVersion, localLanguageId: string): PokemonResponse[];
}