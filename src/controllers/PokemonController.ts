import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { TYPES } from '../services/types';
import { IPokemonService, IPokemonNameService, IStatsService, ICalculaionService } from '../services';
import { FindNamesRequest, GetPokemonRequest, GetPokemonByNoRequest, GetStatsRequest, CalcDamageRequest } from '../models/request';
import { PokemonResponse, PokemonNameResponse, PokemonCalcStatsResponse } from '../models/response';
import { PokemonWithEverything, PokemonName, PokemonStats } from '../models/data';
import { StringHelper } from './../helpers';
import { GameVersionType } from '../enumerators';

@injectable()
export class PokemonController {
  private service: IPokemonService;
  private pokemonNameService: IPokemonNameService;
  private statsService: IStatsService;
  private calculaionService: ICalculaionService;

  public constructor (
    @inject(TYPES.IPokemonService) service: IPokemonService,
    @inject(TYPES.IPokemonNameService) pokemonNameService: IPokemonNameService,
    @inject(TYPES.IStatsService) statsService: IStatsService,
    @inject(TYPES.ICalculaionService) calculaionService: ICalculaionService) {
      this.service = service;
      this.pokemonNameService = pokemonNameService;
      this.statsService = statsService;
      this.calculaionService = calculaionService;
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

  public calc(req: CalcDamageRequest, res: Response) {
    const attackPokemonId = req.query.attackPokemonId
    const defencePokemonId = req.query.defencePokemonId
    const version = StringHelper.ToGameVersion(req.query.version)
    const attackAbility = req.query.attackAbility
    const defenceAbility = req.query.defenceAbility
    const attackMoveName = req.query.attackMoveName
    const attackIndividualValue = parseInt(req.query.attackIndividualValue)
    const attackEffortValue = parseInt(req.query.attackEffortValue )
    const attackNature = parseInt(req.query.attackNature)
    const attackRank = parseInt(req.query.attackRank)
    const attackSpIndividualValue = parseInt(req.query.attackSpIndividualValue)
    const attackSpEffortValue = parseInt(req.query.attackSpEffortValue)
    const attackSpNature = parseInt(req.query.attackSpNature)
    const defenceHpIndividualValue = parseInt(req.query.defenceHpIndividualValue)
    const defenceHpEffortValue = parseInt(req.query.defenceHpEffortValue)
    const defenceIndividualValue = parseInt(req.query.defenceIndividualValue)
    const defenceEffortValue = parseInt(req.query.defenceEffortValue)
    const defenceNature = parseInt(req.query.defenceNature)
    const defenceRank = parseInt(req.query.defenceRank)
    const defenceSpIndividualValue = parseInt(req.query.defenceSpIndividualValue)
    const defenceSpEffortValue = parseInt(req.query.defenceSpEffortValue)
    const defenceSpNature = parseInt(req.query.defenceSpNature)
    const isCritical = StringHelper.ToBoolean(req.query.isCritical)
    const attackItem = req.query.attackItem
    const defenceItem = req.query.defenceItem
    const isZ = version === GameVersionType.SM ? StringHelper.ToBoolean(req.query.isZ) : false
    const isZExclusive = GameVersionType.SM ? StringHelper.ToBoolean(req.query.isZExclusive) :false
    const wall = req.query.wall
    const weather = req.query.weather
    const field = req.query.field
    const statusAilment = req.query.statusAilment
    const sport = req.query.sport
    const isTokusei = StringHelper.ToBoolean(req.query.isTokusei)

    const result: PokemonStats = this.calculaionService.calc(
      attackPokemonId,
      defencePokemonId,
      version,
      attackAbility,
      defenceAbility,
      attackMoveName,
      attackIndividualValue,
      attackEffortValue,
      attackNature,
      attackRank,
      attackSpIndividualValue,
      attackSpEffortValue,
      attackSpNature,
      defenceHpIndividualValue,
      defenceHpEffortValue,
      defenceIndividualValue,
      defenceEffortValue,
      defenceNature,
      defenceRank,
      defenceSpIndividualValue,
      defenceSpEffortValue,
      defenceSpNature,
      isCritical,
      attackItem,
      defenceItem,
      isZ,
      isZExclusive,
      wall,
      weather,
      field,
      statusAilment,
      sport,
      isTokusei)

    res.status(200).json("");
  }
}