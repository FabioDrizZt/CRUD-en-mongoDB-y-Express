
# API de Películas

Este repositorio contiene una API desarrollada con Express y MongoDB que permite gestionar una colección de películas. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las películas almacenadas en una base de datos MongoDB.

## Instalación

Para instalar y ejecutar este proyecto, sigue los siguientes pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/FabioDrizZt/CRUD-en-mongoDB-y-Express.git
    cd CRUD-en-mongoDB-y-Express
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias:
    ```env
    PORT=3000
    MONGODB_URI=tu_cadena_de_conexion_a_mongodb
    ```

4. Inicia el servidor:
    ```sh
    npm start
    ```

El servidor se iniciará en `http://localhost:3000`.

## Endpoints

### Ruta principal

- `GET /`
    - Respuesta: Mensaje de bienvenida a la API.

### Obtener todas las películas

- `GET /peliculas`
    - Parámetros de consulta opcionales:
        - `genero`: Filtra las películas por género.
    - Respuesta: Lista de todas las películas o filtradas por género.

### Obtener una película por ID

- `GET /peliculas/:id`
    - Parámetros:
        - `id`: ID de la película.
    - Respuesta: Detalles de la película correspondiente al ID proporcionado.

### Agregar una nueva película

- `POST /peliculas`
    - Cuerpo de la solicitud: Objeto JSON que representa la película a agregar.
    - Respuesta: Película agregada con éxito.

### Borrar una película por ID

- `DELETE /peliculas/:id`
    - Parámetros:
        - `id`: ID de la película.
    - Respuesta: Mensaje indicando el éxito o fracaso de la operación.

### Modificar/Actualizar una película

- `PATCH /peliculas/:id`
    - Parámetros:
        - `id`: ID de la película.
    - Cuerpo de la solicitud: Objeto JSON con los campos a actualizar.
    - Respuesta: Película actualizada con éxito o mensaje de error.

## Middleware

- `express.json()`: Analiza las solicitudes entrantes con cargas útiles JSON.
- `morgan('dev')`: Registro de solicitudes HTTP.
- Conexión a MongoDB: Se conecta a la base de datos MongoDB en cada solicitud a la ruta `/peliculas` y se desconecta al finalizar la respuesta.

## Validación

- `validarPeli`: Función de validación para asegurarse de que los datos de la película sean correctos al crear una nueva película.
- `validarPeliParcialmente`: Función de validación para asegurarse de que los datos de la película sean correctos al actualizar una película.

## Estructura del proyecto

- `src/mongodb.js`: Módulo para conectar y desconectar de la base de datos MongoDB.
- `schemas/pelis.js`: Módulo para la validación de los datos de las películas.

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

```sh
npm start
```

El servidor estará disponible en `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
