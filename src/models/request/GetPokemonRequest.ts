import { Request } from 'express';

export interface GetPokemonRequest extends Request {
  query: {
    id: string,
    version: string, 
    localLanguageId: string
  }
}