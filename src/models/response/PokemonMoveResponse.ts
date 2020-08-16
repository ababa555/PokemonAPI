import { MoveResponse }  from '.'

export class PokemonMoveResponse {
  pokemonId: string;
  moveName: string;
  move: MoveResponse;

  constructor(pokemonId: string, moveName: string, move: MoveResponse) {
    this.pokemonId = pokemonId;
    this.moveName = moveName;
    this.move = move;
  }
}