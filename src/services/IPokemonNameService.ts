import { PokemonName } from '../models/data';
import { GameVersion } from './../types';

export interface IPokemonNameService {
  find(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonName[];
}