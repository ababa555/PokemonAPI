import { PokemonNameResponse } from '../models';
import { GameVersion } from './../types';

export interface IPokemonNameService {
  find(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[];
}