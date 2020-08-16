export class PokemonTypeResponse {
  pokemonId: string;
  typeId: string;

  constructor(pokemonId: string, typeId: string) {
    this.pokemonId = pokemonId;
    this.typeId = typeId;
  }
}