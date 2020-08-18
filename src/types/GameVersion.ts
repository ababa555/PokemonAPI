import { GameVersionType } from './../enumerators';

export type GameVersion = typeof GameVersionType[keyof typeof GameVersionType];