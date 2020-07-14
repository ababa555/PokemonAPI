import { Container } from "inversify";

import { TYPES } from "../services/types";
import { IPokemonNameService, PokemonNameService } from "../services";
import { PokemonController } from "../controllers/PokemonController";

const container = new Container();

container
.bind<PokemonController>(TYPES.PokemonController)
.to(PokemonController)
.inSingletonScope();

container
.bind<IPokemonNameService>(TYPES.IPokemonNameService)
.to(PokemonNameService)
.inSingletonScope();

export default container;