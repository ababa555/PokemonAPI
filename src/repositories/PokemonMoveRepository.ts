import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { PokemonMove } from '../models/data';
import { IPokemonMoveRepository } from './IPokemonMoveRepository';
import { CsvType } from '../enumerators';
import { CsvHelper } from '../helpers';
import { GameVersion } from '../types';

@injectable()
export class PokemonMoveRepository implements IPokemonMoveRepository {
  public find(id: string, version: GameVersion): PokemonMove[] {
    const moves = this.findImpl(version)

    const result = moves.filter((x:PokemonMove) => x.pokemonId === id);
    return result
  }

  public findImpl(version: GameVersion): PokemonMove[] {
    const moves = CsvHelper.read(CsvHelper.filename(CsvType.POKEMON_MOVES, version))

    const result: PokemonMove[] = []

    moves.forEach((x: any) => {
      const move = new PokemonMove(x.pokemonId, x.moveName)
      result.push(move)
    });
    return result
  }
}