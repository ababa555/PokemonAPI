import { Router, Request } from 'express';

interface AbabaRequest extends Request {
  query: {
    name: string
  }
}

const router = Router()

router.get('/', (req, res, next) => {
  res.send(`<h1>test /</h1>`)
})

router.get('/1', (req, res, next) => {
  res.send(`<h1>test /1</h1>`)
})

router.get('/2', (req: AbabaRequest, res, next) => {
  console.log(req.query.name)
  res.send(`<h1>test /2</h1>`)
})

module.exports = router;