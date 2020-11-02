import { Container } from "inversify";

import { TYPES } from "../services/types";
import { ICalculaionService, CalculaionService, IPokemonService, PokemonService, IPokemonNameService, PokemonNameService, IStatsService, StatsService } from "../services";
import { 
  IPokemonNameRepository, PokemonNameRepository, 
  IPokemonRepository, PokemonRepository,
  IPokemonAbilityRepository, PokemonAbilityRepository,
  IPokemonEvolutionChainRepository, PokemonEvolutionChainRepository,
  IPokemonMoveRepository, PokemonMoveRepository,
  IPokemonStatsRepository, PokemonStatsRepository,
  IPokemonTypeRepository, PokemonTypeRepository,
  IMoveRepository, MoveRepository
} from './../repositories';

import { PokemonController } from "../controllers/PokemonController";

const container = new Container();

container
.bind<PokemonController>(TYPES.PokemonController)
.to(PokemonController)
.inSingletonScope();

container
.bind<ICalculaionService>(TYPES.ICalculaionService)
.to(CalculaionService)
.inSingletonScope();

container
.bind<IPokemonService>(TYPES.IPokemonService)
.to(PokemonService)
.inSingletonScope();

container
.bind<IPokemonNameService>(TYPES.IPokemonNameService)
.to(PokemonNameService)
.inSingletonScope();

container
.bind<IStatsService>(TYPES.IStatsService)
.to(StatsService)
.inSingletonScope();

container
.bind<IPokemonRepository>(TYPES.IPokemonRepository)
.to(PokemonRepository)
.inSingletonScope();

container
.bind<IPokemonNameRepository>(TYPES.IPokemonNameRepository)
.to(PokemonNameRepository)
.inSingletonScope();

container
.bind<IPokemonAbilityRepository>(TYPES.IPokemonAbilityRepository)
.to(PokemonAbilityRepository)
.inSingletonScope();

container
.bind<IPokemonEvolutionChainRepository>(TYPES.IPokemonEvolutionChainRepository)
.to(PokemonEvolutionChainRepository)
.inSingletonScope();

container
.bind<IPokemonMoveRepository>(TYPES.IPokemonMoveRepository)
.to(PokemonMoveRepository)
.inSingletonScope();

container
.bind<IPokemonStatsRepository>(TYPES.IPokemonStatsRepository)
.to(PokemonStatsRepository)
.inSingletonScope();

container
.bind<IPokemonTypeRepository>(TYPES.IPokemonTypeRepository)
.to(PokemonTypeRepository)
.inSingletonScope();

container
.bind<IMoveRepository>(TYPES.IMoveRepository)
.to(MoveRepository)
.inSingletonScope();

export default container;
