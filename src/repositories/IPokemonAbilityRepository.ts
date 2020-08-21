import { GameVersion } from '../types';
import { PokemonAbility } from '../models/data';

export interface IPokemonAbilityRepository {
  find(id: string, version: GameVersion): PokemonAbility[];
}