export class PokemonNameResponse {
  pokemonId: string;
  localLanguageId: number;
  name: string;
  formName: string;

  constructor(pokemonId: string, localLanguageId: number, name: string, formName: string) {
    this.pokemonId = pokemonId;
    this.localLanguageId = localLanguageId;
    this.name = name;
    this.formName = formName;
  }
}