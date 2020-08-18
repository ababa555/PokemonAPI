export class PokemonStats {
  pokemonId: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;

  constructor(pokemonId: string, hp: number, attack: number, defense: number, spAttack: number, spDefense: number, speed: number) {
    this.pokemonId = pokemonId;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAttack = spAttack;
    this.spDefense = spDefense;
    this.speed = speed;
  }
}