import { PokemonResponse } from '../models';

export interface IPokemonService {
  get(id: string, version: string, localLanguageId: string): PokemonResponse;

  getByNo(no: string, version: string, localLanguageId: string): PokemonResponse[];
}