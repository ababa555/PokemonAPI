export class PokemonEvolutionChainResponse {
  pokemonId: string;
  evolutionChainId: string;
  order: number;

  constructor(pokemonId: string, evolutionChainId: string, order: number) {
    this.pokemonId = pokemonId;
    this.evolutionChainId = evolutionChainId;
    this.order = order;
  }
}