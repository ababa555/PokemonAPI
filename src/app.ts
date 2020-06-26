import express, { Request, Response, NextFunction } from 'express'

interface AbabaRequest extends Request {
  body: {
    name: string
  },
  params: {
    hogehoge: string
  }
}

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  next()
})

app.get('/', (req, res, next) => {
  res.send(`<h1>hello</h1>`)
})

// app.get('/hoge', (req, res, next) => {
//   let page = req.query.page;
//   let limit = req.query.limit;
// });

app.post('/post', (req: AbabaRequest, res, next) => {
  console.log(req.body)
  res.send(`<h1>${req.body.name}</h1>`)
})

app.post('/post2/:hogehoge', (req: AbabaRequest, res, next) => {
  console.log(req.params.hogehoge)
  res.send(`<h1>test /3</h1>`)
})

app.use('/', require('./routes/ababa'));
app.use('/test', require('./routes/test'))
app.use('/pokemons', require('./routes/pokemons'))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next()
})

app.listen(3000)