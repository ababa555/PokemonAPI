import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService, IPokemonNameService, IStatsService } from '../services';
import { FindNamesRequest, GetPokemonRequest, GetPokemonByNoRequest, GetStatsRequest } from '../models/request';
import { PokemonResponse, PokemonNameResponse, PokemonCalcStatsResponse } from '../models/response';
import { PokemonWithEverything, PokemonName, PokemonStats } from '../models/data';
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

  public findName(req: FindNamesRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonName[] = this.pokemonNameService.find(
      version, req.query.localLanguageId, req.query.includeAnotherForm);

    const response: PokemonNameResponse[] = []
    result.forEach((x: PokemonName) => {
      const pokemonName = new PokemonNameResponse(x.pokemonId, x.localLanguageId, x.name, x.formName)
      response.push(pokemonName)
    });

    res.status(200).json(response);
  }

  public get(req: GetPokemonRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonWithEverything = this.service.get(req.query.id, version, req.query.localLanguageId);

    const response = new PokemonResponse(
      result.pokemon, result.pokemonName, result.pokemonAbilities, 
      result.pokemonEvolutionChains, result.pokemonMoves, result.pokemonStats,
      result.pokemonTypes);
    
    res.status(200).json(response);
  }

  public getByNo(req: GetPokemonByNoRequest, res: Response) {
    const version = StringHelper.ToGameVersion(req.query.version)
    const result: PokemonWithEverything[] = this.service.getByNo(
      req.query.no, version, req.query.localLanguageId);

    const response = result.map(x => {
      return new PokemonResponse(
        x.pokemon, x.pokemonName, x.pokemonAbilities, 
        x.pokemonEvolutionChains, x.pokemonMoves, x.pokemonStats,
        x.pokemonTypes);
    })
  
    res.status(200).json(response);
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
    const option = parseFloat(req.query.option);

    const result: PokemonStats = this.statsService.calc(
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
      speedNature,
      option);

    const response = new PokemonCalcStatsResponse(
      result.pokemonId,
      result.hp, result.attack, result.defense, result.spAttack, result.spDefense, result.speed,
      hpIndividual, attackIndividual, defenseIndividual, spAttackIndividual, spDefenseIndividual, speedIndividual,
      hpEffort, attackEffort, defenseEffort, spAttackEffort, spDefenseEffort, speedEffort,
      attackNature, defenseNature, spAttackNature, spDefenseNature, speedNature
    );

    res.status(200).json(response);
  }
}