import { Request } from 'express';

export interface GetStatsRequest extends Request {
  query: {
    pokemonId: string,
    version: string,
    hpIndividual: string,
    attackIndividual: string,
    defenseIndividual: string,
    spAttackIndividual: string,
    spDefenseIndividual: string,
    speedIndividual: string,
    hpEffort: string,
    attackEffort: string,
    defenseEffort: string,
    spAttackEffort: string,
    spDefenseEffort: string,
    speedEffort: string,
    attackNature: string,
    defenseNature: string,
    spAttackNature: string,
    spDefenseNature: string,
    speedNature: string,
    option: string  // swsh:ダイマックスレベル
  }
}