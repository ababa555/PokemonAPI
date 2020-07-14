import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonNameService } from '../services';
import { PokemonNamesResponse, FindAllNamesRequest } from '../models';

@injectable()
export class PokemonController {
  private service: IPokemonNameService;

  public constructor (
    @inject(TYPES.IPokemonNameService) 
    service: IPokemonNameService) {
      this.service = service;
  }

  public findAll(req: FindAllNamesRequest, res: Response) {
    const result: PokemonNamesResponse[] = this.service.findAll(
      req.query.version, req.query.localLanguageId, req.query.includeAnotherForm);
    res.status(200).json(result);
  }
}