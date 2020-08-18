export class PokemonName {
  pokemonId: string;
  localLanguageId: string;
  name: string;
  formName: string;

  constructor(pokemonId: string, localLanguageId: string, name: string, formName: string) {
    this.pokemonId = pokemonId;
    this.localLanguageId = localLanguageId;
    this.name = name;
    this.formName = formName;
  }
}