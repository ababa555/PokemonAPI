import { Request } from 'express';

export interface GetPokemonByNoRequest extends Request {
  query: {
    no: string,
    version: string, 
    localLanguageId: string
  }
}