import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonMove, Move } from '../models/data';
import { IPokemonMoveRepository } from './IPokemonMoveRepository';
import { CsvType } from '../enumerators';
import { ArrayHelper, CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class PokemonMoveRepository implements IPokemonMoveRepository {
  public find(id: string, version: GameVersion): PokemonMove[] {
    const moves = this.findImpl(version)

    const result = moves.filter((x:PokemonMove) => x.pokemonId === id);
    return result
  }

  public findImpl(version: GameVersion): PokemonMove[] {
    const pokemonMoves = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_MOVES, version))
    const moves = CsvHelper.read(CsvHelper.filename(CsvType.MOVES, version))

    const result: PokemonMove[] = []

    pokemonMoves.forEach((x: any) => {
      const targetMove = ArrayHelper.ensure(moves.find((y: any) => x.moveName === y.name))
      const move = new Move(targetMove.id, targetMove.name, targetMove.type, targetMove.power1, targetMove.power2,
        targetMove.pp, targetMove.accuracy, targetMove.priority, targetMove.damageType, targetMove.isDirect, targetMove.canProtect)
      const pokemonMove = new PokemonMove(x.pokemonId, x.moveName, move)
      result.push(pokemonMove)
    });    
    return result
  }
}