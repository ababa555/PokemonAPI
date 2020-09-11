import { Move } from '.';

export class PokemonMove {
  pokemonId: string;
  moveName: string;
  move: Move;

  constructor(pokemonId: string, moveName: string, move: Move) {
    this.pokemonId = pokemonId;
    this.moveName = moveName;
    this.move = move;
  }
}