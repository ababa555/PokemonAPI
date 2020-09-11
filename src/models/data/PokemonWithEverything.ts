import { Pokemon, PokemonName, PokemonAbility, PokemonEvolutionChain, PokemonMove, PokemonStats, PokemonType } from '.'

export class PokemonWithEverything {
  pokemon: Pokemon;
  pokemonName: PokemonName;
  pokemonAbilities: PokemonAbility[];
  pokemonEvolutionChains: PokemonEvolutionChain[];
  pokemonMoves: PokemonMove[];
  pokemonStats: PokemonStats;
  pokemonTypes: PokemonType[];

  constructor(pokemon: Pokemon,
    pokemonName: PokemonName,
    pokemonAbilities: PokemonAbility[],
    pokemonEvolutionChains: PokemonEvolutionChain[],
    pokemonMoves: PokemonMove[],
    pokemonStats: PokemonStats, 
    pokemonTypes: PokemonType[]) {
    this.pokemon = pokemon;
    this.pokemonName = pokemonName; 
    this.pokemonAbilities = pokemonAbilities;
    this.pokemonEvolutionChains = pokemonEvolutionChains
    this.pokemonMoves = pokemonMoves
    this.pokemonStats = pokemonStats
    this.pokemonTypes = pokemonTypes
  }
}