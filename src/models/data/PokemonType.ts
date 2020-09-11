import { Move as MoveType } from '../../types';

export class PokemonType {
  pokemonId: string;
  typeId: MoveType;

  constructor(pokemonId: string, typeId: MoveType) {
    this.pokemonId = pokemonId;
    this.typeId = typeId;
  }
}