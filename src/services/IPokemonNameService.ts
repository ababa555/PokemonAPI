import { PokemonNameResponse } from '../models';

export interface IPokemonNameService {
  findAll(version: string, localLanguageId: string, includeAnotherForm: string): PokemonNameResponse[];
}