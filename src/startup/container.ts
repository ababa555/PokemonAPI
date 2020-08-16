import { Container } from "inversify";

import { TYPES } from "../services/types";
import { IPokemonService, PokemonService, IPokemonNameService, PokemonNameService, IStatsService, StatsService } from "../services";
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

export default container;