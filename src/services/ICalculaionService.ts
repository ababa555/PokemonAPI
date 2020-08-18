import { PokemonNameResponse } from '../models';
import { GameVersion } from './../types';

export interface ICalculaionService {
  stats(version: GameVersion, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[];
}