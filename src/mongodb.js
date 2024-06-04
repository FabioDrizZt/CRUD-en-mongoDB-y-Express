process.loadEnvFile() // Cargamos las variables de entorno desde el archivo .env
const { MongoClient } = require('mongodb')

//Obtenemos la URI desde las variables de entorno
const URI = process.env.MONGODB_URLSTRING
//Hacemos la conexión del cliente
const client = new MongoClient(URI)
const DATABASE_NAME = process.env.DATABASE_NAME
const COLLECTION_NAME = process.env.COLLECTION_NAME

async function connectToMongoDB() {
  try {
    await client.connect()
    console.log('Conectandose a mongoDB')
    const db = client.db(DATABASE_NAME).collection(COLLECTION_NAME)
    return db
  } catch (error) {
    console.error('Error al conectar a MongoDB')
    return null
  }
}

async function disconnectFromMongoDB() {
  try {
    await client.close()
    console.log('Desconectandose de mongoDB')
  } catch (error) {
    console.error('Error al desconectar de MongoDB')
  }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB }
