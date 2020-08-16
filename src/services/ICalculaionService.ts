import { PokemonNameResponse } from '../models';

export interface ICalculaionService {
  stats(version: string, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[];
}