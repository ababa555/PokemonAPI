import { GameVersion } from '../types';
import { Move } from '../models/data';

export interface IMoveRepository {
  find(version: GameVersion): Move[];
}