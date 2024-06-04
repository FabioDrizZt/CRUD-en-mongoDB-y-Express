const express = require('express')
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb.js')
const app = express()
const port = process.env.PORT ?? 3000
const morgan = require('morgan')
const { ObjectId } = require('mongodb')
const { validarPeli, validarPeliParcialmente } = require('./schemas/pelis')
const crypto = require('node:crypto')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

app.use('/peliculas', connectToMongoDB, async (req, res, next) => {
  // esperar a que finalicen todas las rutas para hacer la desconexión
  res.on('finish', async () => {
    await disconnectFromMongoDB()
  })
  next()
})

//Ruta principal
app.get('/', (req, res) => {
  res.json('Bienvenido a la API de peliculas !')
})

//Obtener todas las peliculas
app.get('/peliculas', async (req, res) => {
  const { genero } = req.query
  try {
    const peliculas = !genero
      ? await req.db.find().toArray()
      : await req.db
          .find({ genre: { $regex: genero, $options: 'i' } })
          .toArray()

    res.json(peliculas)
  } catch (error) {
    res.status(500).send('Error al obtener las peliculas')
  }
})

//Mostrar una peli por id
app.get('/peliculas/:id', async (req, res) => {
  const { id } = req.params
  const objectId = new ObjectId(id)
  const pelicula = await req.db.findOne({ _id: objectId })
  if (pelicula) return res.json(pelicula)
  res.status(404).json({ message: 'Peli no encontrada' })
})

//Agregar una peli
app.post('/peliculas', async (req, res) => {
  const resultado = validarPeli(req.body)

  if (!resultado.success) return res.status(400).json(resultado.error.message)

  // Agregar id interno es opcional en este caso ya que mongodb tambien genera su propio uuid
  const nuevaPeli = {
    id: crypto.randomUUID(),
    ...resultado.data,
  }

  try {
    await req.db.insertOne(nuevaPeli)
    res.json(nuevaPeli)
  } catch {
    return res.status(500).json({ message: 'Error al agregar la peli' })
  }
})

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
