import { Container } from "inversify";

import { TYPES } from "../services/types";
import { IPokemonService, PokemonService, IPokemonNameService, PokemonNameService, IStatsService, StatsService } from "../services";
import { IPokemonNameRepository, PokemonNameRepository, IPokemonRepository, PokemonRepository } from './../repositories';

import { PokemonController } from "../controllers/PokemonController";

const container = new Container();

container
.bind<PokemonController>(TYPES.PokemonController)
.to(PokemonController)
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

export default container;