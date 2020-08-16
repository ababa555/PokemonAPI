export class PokemonAbilityResponse {
  pokemonId: string;
  abilityName: string;
  isHidden: boolean;

  constructor(pokemonId: string, abilityName: string, isHidden: boolean) {
    this.pokemonId = pokemonId;
    this.abilityName = abilityName;
    this.isHidden = isHidden;
  }
}