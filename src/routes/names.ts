import { Router, Request } from 'express';

import container from '../startup/container';
import { TYPES } from '../services/types';
import { PokemonController } from '../controllers/PokemonController';
import { FindNamesRequest } from '../models';

const router = Router()

const pokemonControllerContainer = container.get<PokemonController>(
  TYPES.PokemonController
);

// http://localhost:3000/names?version=1&localLanguageId=1&includeAnotherForm=0
router.get('/names', async (req: FindNamesRequest, res, next) => {
  pokemonControllerContainer.findName(req, res);
})

module.exports = router;