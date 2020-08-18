import { PokemonNameResponse } from '../models';
import { GameVersion } from './../types';

export interface IPokemonNameService {
  findAll(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[];
}