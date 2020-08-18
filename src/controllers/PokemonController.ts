import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService, IPokemonNameService, IStatsService } from '../services';
import { FindAllNamesRequest, GetPokemonRequest, GetPokemonByNoRequest, GetStatsRequest } from '../models/request';
import { PokemonResponse, PokemonNameResponse, PokemonStatsResponse } from '../models/response';
import { StringHelper } from './../helpers';

@injectable()
export class PokemonController {
  private service: IPokemonService;
  private pokemonNameService: IPokemonNameService;
  private statsService: IStatsService;

  public constructor (
    @inject(TYPES.IPokemonService) service: IPokemonService,
    @inject(TYPES.IPokemonNameService) pokemonNameService: IPokemonNameService,
    @inject(TYPES.IStatsService) statsService: IStatsService) {
      this.service = service;
      this.pokemonNameService = pokemonNameService;
      this.statsService = statsService;
  }

  public findAll(req: FindAllNamesRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonNameResponse[] = this.pokemonNameService.findAll(
      version, req.query.localLanguageId, req.query.includeAnotherForm);
    res.status(200).json(result);
  }

  public get(req: GetPokemonRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonResponse = this.service.get(
      req.query.id, version, req.query.localLanguageId);
    res.status(200).json(result);
  }

  public getByNo(req: GetPokemonByNoRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonResponse[] = this.service.getByNo(
      req.query.no, version, req.query.localLanguageId);
    res.status(200).json(result);
  }

  public getStats(req: GetStatsRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const hpIndividual = parseInt(req.query.hpIndividual);
    const attackIndividual = parseInt(req.query.attackIndividual);
    const defenseIndividual = parseInt(req.query.defenseIndividual);
    const spAttackIndividual = parseInt(req.query.spAttackIndividual);
    const spDefenseIndividual = parseInt(req.query.spDefenseIndividual);
    const speedIndividual = parseInt(req.query.speedIndividual);
    const hpEffort = parseInt(req.query.hpEffort);
    const attackEffort = parseInt(req.query.attackEffort);
    const defenseEffort = parseInt(req.query.defenseEffort);
    const spAttackEffort = parseInt(req.query.spAttackEffort);
    const spDefenseEffort = parseInt(req.query.spDefenseEffort);
    const speedEffort = parseInt(req.query.speedEffort);
    const attackNature = parseFloat(req.query.attackNature);
    const defenseNature = parseFloat(req.query.defenseNature);
    const spAttackNature = parseFloat(req.query.spAttackNature);
    const spDefenseNature = parseFloat(req.query.spDefenseNature);
    const speedNature = parseFloat(req.query.speedNature);

    const result: PokemonStatsResponse = this.statsService.calc(
      req.query.pokemonId,
      version,
      hpIndividual,
      attackIndividual,
      defenseIndividual,
      spAttackIndividual,
      spDefenseIndividual,
      speedIndividual,
      hpEffort,
      attackEffort,
      defenseEffort,
      spAttackEffort,
      spDefenseEffort,
      speedEffort,
      attackNature,
      defenseNature,
      spAttackNature,
      spDefenseNature,
      speedNature);

    res.status(200).json(result);
  }
}