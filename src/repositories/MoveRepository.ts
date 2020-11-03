import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { Move } from '../models/data';
import { IMoveRepository } from './IMoveRepository';
import { CsvType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class MoveRepository implements IMoveRepository {
  public find(version: GameVersion): Move[] {
    const moves = this.findImpl(version)
    return moves
  }

  public findImpl(version: GameVersion): Move[] {
    const moves = CsvHelper.read(CsvHelper.filename(CsvType.MOVES, version))
    const result: Move[] = []

    moves.forEach((x: any) => {
      const move = new Move(x.id, x.name, x.type, x.power1, x.power2,
        x.pp, x.accuracy, x.priority, x.damageType, x.isDirect, x.canProtect)
      result.push(move)
    });
    return result
  }
}