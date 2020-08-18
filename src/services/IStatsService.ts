import { PokemonCalcStatsResponse } from '../models';
import { GameVersion } from './../types';

export interface IStatsService {
  calc(pokemonId: string, version: GameVersion,
    hpIndividual: number, attackIndividual: number, defenseIndividual: number, spAttackIndividual: number, spDefenseIndividual: number, speedIndividual: number,
    hpEffort: number, attackEffort: number, defenseEffort: number, spAttackEffort: number, spDefenseEffort: number, speedEffort: number,
    attackNatureRevise: number, defenseNatureRevise: number, spAttackNatureRevise: number, spDefenseNatureRevise: number, speedNatureRevise: number): PokemonCalcStatsResponse;
}