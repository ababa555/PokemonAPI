import { Router } from 'express';

const router = Router()

router.get('/2', (req, res, next) => {
  res.send(`<h1>ababa /2</h1>`)
})

module.exports = router;