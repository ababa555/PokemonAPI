import express, { Request, Response, NextFunction } from 'express'

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  next()
})

app.get('/health', (req, res, next) => {
  res.send(`<div>OK.</div>`)
})

app.use('/', require('./routes/names'))
app.use('/pokemons', require('./routes/pokemons'))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next()
})

app.listen(3000)