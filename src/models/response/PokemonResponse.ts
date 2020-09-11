import { 
  PokemonAbilityResponse, 
  PokemonEvolutionChainResponse,
  PokemonMoveResponse,
  PokemonStatsResponse,
  PokemonTypeResponse,
  MoveResponse
} from '.'

import { Pokemon, PokemonName, PokemonAbility, PokemonEvolutionChain, PokemonMove, PokemonStats, PokemonType } from '../data'

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

  constructor(pokemon: Pokemon,
    pokemonName: PokemonName,
    pokemonAbilities: PokemonAbility[],
    pokemonEvolutionChains: PokemonEvolutionChain[],
    pokemonMoves: PokemonMove[],
    pokemonStats: PokemonStats, 
    pokemonTypes: PokemonType[]) {
      this.id = pokemon.id;
      this.no = pokemon.no;
      this.height = pokemon.height;
      this.weight = pokemon.weight;
      this.order = pokemon.order;
      this.isDefault = pokemon.isDefault;
      this.name = pokemonName.name;
      this.formName = pokemonName.formName;

      this.pokemonAbilities = pokemonAbilities.map((x:PokemonAbility) => {
        return new PokemonAbilityResponse(x.pokemonId, x.abilityName, x.isHidden)
      });

      this.pokemonEvolutionChains = pokemonEvolutionChains.map((x:PokemonEvolutionChain) => {
        return new PokemonEvolutionChainResponse(x.pokemonId, x.evolutionChainId, x.order)
      });

      this.pokemonMoves = pokemonMoves.map((x:PokemonMove) => {
        return new PokemonMoveResponse(
          x.pokemonId, 
          x.moveName, 
          new MoveResponse(
            x.move.id,
            x.move.name,
            x.move.typeId,
            x.move.power,
            x.move.power2,
            x.move.pp,
            x.move.accuracy,
            x.move.priority,
            x.move.damageType,
            x.move.isDirect,
            x.move.canProtect
          ))
      });
      
      this.pokemonStats = new PokemonStats(
        pokemonStats.pokemonId,
        pokemonStats.hp,
        pokemonStats.attack,
        pokemonStats.defense,
        pokemonStats.spAttack,
        pokemonStats.spDefense,
        pokemonStats.speed)
      
      this.pokemonTypes = pokemonTypes.map((x:PokemonType) => {
        return new PokemonTypeResponse(x.pokemonId, x.typeId)
      });
  }
}