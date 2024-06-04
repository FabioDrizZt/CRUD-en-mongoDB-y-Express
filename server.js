const express = require('express')
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb.js')
const app = express()
const port = process.env.PORT ?? 3000
const morgan = require('morgan')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Ruta principal
app.get('/', (req, res) => {
  res.json('Bienvenido a la API de peliculas !')
})
//Obtener todas las frutas
app.get('/frutas', async (req, res) => {
  const db = await connectToMongoDB()
  if (!db) {
    res.status(500).send('Error al conectarse a la BD')
  }

  try {
    frutas = await db.find().toArray()
    res.json(frutas)
  } catch (error) {
    res.status(500).send('Error al obtener las frutas')
  } finally {
    await disconnectFromMongoDB()
  }
})

//Inicializamos el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
