import { Router } from 'express';

const router = Router()

router.get('/', (req, res, next) => {
  res.send(`<h1>ababa /</h1>`)
})

router.get('/1', (req, res, next) => {
  res.send(`<h1>ababa /1</h1>`)
})

module.exports = router;