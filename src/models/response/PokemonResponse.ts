import { 
  PokemonAbilityResponse, 
  PokemonEvolutionChainResponse,
  PokemonMoveResponse,
  PokemonStatsResponse,
  PokemonTypeResponse
} from '.'

export class PokemonResponse {
  id: string;
  no: string;
  height: number;
  weight: number;
  order: number;
  isDefault: boolean;
  name: string;
  formName: string;
  pokemonAbilities: PokemonAbilityResponse[];
  pokemonEvolutionChains: PokemonEvolutionChainResponse[];
  pokemonMoves: PokemonMoveResponse[]
  pokemonStats: PokemonStatsResponse
  pokemonTypes: PokemonTypeResponse[]

  constructor(id: string, no: string, height: number, weight: number, order: number, isDefault: boolean,
    name: string, formName: string,
    pokemonAbilities: PokemonAbilityResponse[], pokemonEvolutionChains: PokemonEvolutionChainResponse[],
    pokemonMoves: PokemonMoveResponse[], pokemonStats: PokemonStatsResponse, 
    pokemonTypes: PokemonTypeResponse[]) {
    this.id = id;
    this.no = no;
    this.height = height;
    this.weight = weight;
    this.order = order;
    this.isDefault = isDefault;
    this.name = name;
    this.formName = formName;
    this.pokemonAbilities = pokemonAbilities
    this.pokemonEvolutionChains = pokemonEvolutionChains
    this.pokemonMoves = pokemonMoves
    this.pokemonStats = pokemonStats
    this.pokemonTypes = pokemonTypes
  }
}