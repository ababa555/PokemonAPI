import { MoveType } from '../enumerators';

export type Move = typeof MoveType[keyof typeof MoveType];