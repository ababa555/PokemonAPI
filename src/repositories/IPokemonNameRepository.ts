import { GameVersion } from './../types';
import { PokemonName } from '../models/data';

export interface IPokemonNameRepository {
  find(version: GameVersion, localLanguageId: string): PokemonName[];
}