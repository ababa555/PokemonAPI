import { GameVersion } from './../types';

export interface ICalculaionService {
  calc(attackPokemonId: string, defencePokemonId: string, version: GameVersion,
    attackAbility: string, defenceAbility: string, attackMoveName: string,
    attackIndividualValue: number, attackEffortValue: number, attackNature: number, attackRank: number,
    attackSpIndividualValue: number, attackSpEffortValue: number, attackSpNature: number,
    defenceHpIndividualValue: number, defenceHpEffortValue: number,
    defenceIndividualValue: number, defenceEffortValue: number, defenceNature: number, defenceRank: number,
    defenceSpIndividualValue: number, defenceSpEffortValue: number, defenceSpNature: number,
    isCritical: boolean,
    attackItem: string, defenceItem: string,
    isZ: boolean, isZExclusive: boolean, wall: string, weather: string, field: string, statusAilment: string, sport: string, isTokusei: boolean): any;
}