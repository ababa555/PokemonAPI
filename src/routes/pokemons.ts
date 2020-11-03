import { Router, Request } from 'express';

import container from '../startup/container';
import { TYPES } from '../services/types';
import { PokemonController } from '../controllers/PokemonController';
import { GetPokemonRequest, GetPokemonByNoRequest, GetStatsRequest, CalcDamageRequest } from '../models/request';

const router = Router()

const pokemonControllerContainer = container.get<PokemonController>(
  TYPES.PokemonController
);

// http://localhost:3000/pokemons?id=n1&version=1&localLanguageId=1
router.get('/', async (req: GetPokemonRequest, res, next) => {
  pokemonControllerContainer.get(req, res);
})

// http://localhost:3000/pokemons/no?no=003&version=1&localLanguageId=1
router.get('/no', async (req: GetPokemonByNoRequest, res, next) => {
  pokemonControllerContainer.getByNo(req, res);
})

// http://localhost:3000/pokemons/stats?pokemonId=n1&version=1&hpIndividual=31&attackIndividual=31&defenseIndividual=31&spAttackIndividual=31&spDefenseIndividual=31&speedIndividual=31&hpEffort=252&attackEffort=252&defenseEffort=252&spAttackEffort=252&spDefenseEffort=252&speedEffort=252&attackNature=1.1&defenseNature=1.1&spAttackNature=1.1&spDefenseNature=1.1&speedNature=1.1
router.get('/stats', async (req: GetStatsRequest, res, next) => {
  pokemonControllerContainer.getStats(req, res);
})

// http://localhost:3000/pokemons/calc?attackPokemonId=n1&defencePokemonId=n2&version=1&attackAbility=&defenceAbility=&attackMoveName=はっぱカッター&attackIndividualValue=31&attackEffortValue=200&attackNature=1&attackRank=0&attackSpIndividualValue=31&attackSpEffortValue=200&attackSpNature=1&defenceHpIndividualValue=31&defenceHpEffortValue=200&defenceIndividualValue=1&defenceEffortValue=31&defenceNature=200&defenceRank=1&defenceSpIndividualValue=31&defenceSpEffortValue=200&defenceSpNature=1&isCritical=false&attackItem=&defenceItem=&isZ=false&isZExclusive=false&wall=&weather=&field=&statusAilment=&sport=&isTokusei=true
router.get('/calc', async (req: CalcDamageRequest, res, next) => {
  pokemonControllerContainer.calc(req, res);
})

module.exports = router;