const TYPES = {
  IPokemonService: Symbol.for("IPokemonService"),
  IPokemonNameService: Symbol.for("IPokemonNameService"),
  IPokemonRepository: Symbol.for("IPokemonRepository"),
  IPokemonNameRepository: Symbol.for("IPokemonNameRepository"),
  IPokemonAbilityRepository: Symbol.for("IPokemonAbilityRepository"),
  IPokemonEvolutionChainRepository: Symbol.for("IPokemonEvolutionChainRepository"),
  IPokemonMoveRepository: Symbol.for("IPokemonMoveRepository"),
  IPokemonStatsRepository: Symbol.for("IPokemonStatsRepository"),
  IPokemonTypeRepository: Symbol.for("IPokemonTypeRepository"),
  IMoveRepository: Symbol.for("IMoveRepository"),
  IStatsService: Symbol.for("IStatsService"),
  ICalculaionService: Symbol.for("ICalculaionService"),
  PokemonController: Symbol.for('PokemonController'),
};

export { TYPES };