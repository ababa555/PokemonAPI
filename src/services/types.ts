const TYPES = {
  IPokemonService: Symbol.for("IPokemonService"),
  IPokemonNameService: Symbol.for("IPokemonNameService"),
  IPokemonRepository: Symbol.for("IPokemonRepository"),
  IPokemonNameRepository: Symbol.for("IPokemonNameRepository"),
  IStatsService: Symbol.for("IStatsService"),
  PokemonController: Symbol.for('PokemonController'),
};

export { TYPES };