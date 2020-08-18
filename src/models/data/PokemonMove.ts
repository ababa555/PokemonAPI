export class PokemonMove {
  pokemonId: string;
  moveName: string;

  constructor(pokemonId: string, moveName: string) {
    this.pokemonId = pokemonId;
    this.moveName = moveName;
  }
}