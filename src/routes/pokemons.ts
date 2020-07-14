import { Router, Request } from 'express';

import { PokemonNamesResponse } from '../models';
import { CsvHelper } from '../helpers/CsvHelper';

interface GetNamesRequest extends Request {
  query: {
    version: string,
    local_language_id: string,
    includeAnotherForm: string
  }
}

const router = Router()

router.get('/getNames', async (req: GetNamesRequest, res, next) => {
  let pokemonNames = CsvHelper.read('./src/csv/sm/pokemonNames.csv')
  let pokemons = CsvHelper.read('./src/csv/sm/pokemons.csv')

  const items: PokemonNamesResponse[] = []
  pokemons.forEach((pokemon: any) => {
    const target = pokemonNames.find((name: any) => {
      return name.pokemon_id === pokemon.id 
      && req.query.local_language_id ? name.local_language_id === req.query.local_language_id : null
    })
    const item = new PokemonNamesResponse(target.id, target.name)
    items.push(item)
  });

  res.json(items)
})

module.exports = router;