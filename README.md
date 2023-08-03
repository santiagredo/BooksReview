# Books Review

Proyecto alojado en:
https://booksreview.onrender.com/

Tener en cuenta que puede tardas varios segundos en cargar la página la primera vez que se hace la solicitud, ya que se usó la versión gratuita de alojamiento.

Este proyecto, llamado Books Review, es una prueba técnica de Controlbox en la cual se creó una página sencilla para dejar reseñas de libros. La página cuenta con funcionalidades de autenticación, autorización, creación de usuarios, restablecimiento de contraseñas, búsqueda de libros por categoría, autor o título, filtrado de libros por categoría y la posibilidad para los usuarios de ver y eliminar sus propias reseñas.

## Tecnologías Utilizadas

- Frontend:
  - TypeScript
  - React
  - Vite (Single Page Application)
  
- Backend:
  - TypeScript
  - NestJS
  - MongoDB (utilizando MongoDB Atlas)

## Configuración Local

Para ejecutar el proyecto localmente, sigue los siguientes pasos:

### Frontend

1. En el directorio `frontend`, en el archivo `network.ts`, asegúrate de descomentar la línea de localhost y comentar la otra URL con la dirección de despliegue. Esto es necesario para que la aplicación se comunique correctamente con el backend local.

2. Abre una terminal y navega al directorio `frontend`.

3. Ejecuta el comando `npm install` para instalar las dependencias.

4. Luego, ejecuta `npm run dev` en la consola. Esto iniciará la aplicación en http://localhost:5173/.

### Backend

1. Crea un archivo `.env` en el directorio raíz de `backend`, al mismo nivel que `package.json`.

2. Agrega las siguientes constantes al archivo `.env`:

```
DATABASE_USERNAME=your_mongo_atlas_username
DATABASE_PASSWORD=your_mongo_atlas_password
DATABASE_CLUSTER_NAME=your_mongo_atlas_cluster_name

DATABASE_NAME=your_database_name

DATABASE_USERS_COLLECTION_NAME=your_users_collection_name

JWT_SECRET=your_jwt_secret
```

Asegúrate de reemplazar los valores `your_mongo_atlas_username`, `your_mongo_atlas_password`, `your_mongo_atlas_cluster_name`, `your_database_name`, `your_users_collection_name` y `your_jwt_secret` con tus propias credenciales y preferencias.

3. Abre una terminal y navega al directorio `backend`.

4. Ejecuta el comando `npm install` para instalar las dependencias.

5. Luego, ejecuta `npm run start:prod` o `npm run start:dev` para iniciar la API.

Una vez realizado estos pasos, la aplicación debería estar funcionando correctamente.

## Tiempo de Desarrollo Estimado y Actual

El tiempo estimado para desarrollar el proyecto fue:

- Backend y Base de Datos: 20 horas
- Frontend: 10 horas

El tiempo actual utilizado para el desarrollo ha sido:

- Backend y Base de Datos: 18 horas y 50 minutos
- Frontend: 17 horas

El desarrollo del proyecto ha tomado más tiempo del estimado debido a ciertas complejidades en el diseño y la lógica de las funcionalidades del frontend. Además, se han encontrado desafíos en la planificación inicial de la base de datos, lo que llevó a algunas reescrituras de código. Aunque se han enfrentado imprevistos, el proyecto ha sido exitosamente completado y está listo para su uso.

Por último, se ha identificado que el uso de server-side rendering en lugar de client-side podría haber sido una opción más eficiente para la presentación de la página y se tomará en cuenta para futuros proyectos.



# English:

# Books Review

Project hosted at:
https://booksreview.onrender.com/

Please note that the page may take several seconds to load the first time you make a request, as the free hosting version was used.

This project, called Books Review, is a technical test for Controlbox in which a simple page was created for leaving book reviews. The page includes functionalities for authentication, authorization, user creation, password reset, book search by category, author, or title, filtering books by category, and the ability for users to view and delete their own reviews.

## Technologies Used

- Frontend:
  - TypeScript
  - React
  - Vite (Single Page Application)
  
- Backend:
  - TypeScript
  - NestJS
  - MongoDB (using MongoDB Atlas)

## Local Setup

To run the project locally, follow these steps:

### Frontend

1. In the `frontend` directory, in the `network.ts` file, make sure to uncomment the localhost line and comment the other URL with the deployment address. This is necessary for the application to communicate correctly with the local backend.

2. Open a terminal and navigate to the `frontend` directory.

3. Run the command `npm install` to install the dependencies.

4. Then, run `npm run dev` in the console. This will start the application at http://localhost:5173/.

### Backend

1. Create a `.env` file in the root directory of the `backend`, at the same level as `package.json`.

2. Add the following constants to the `.env` file:

```
DATABASE_USERNAME=your_mongo_atlas_username
DATABASE_PASSWORD=your_mongo_atlas_password
DATABASE_CLUSTER_NAME=your_mongo_atlas_cluster_name

DATABASE_NAME=your_database_name

DATABASE_USERS_COLLECTION_NAME=your_users_collection_name

JWT_SECRET=your_jwt_secret
```

Be sure to replace the values `your_mongo_atlas_username`, `your_mongo_atlas_password`, `your_mongo_atlas_cluster_name`, `your_database_name`, `your_users_collection_name`, and `your_jwt_secret` with your own credentials and preferences.

3. Open a terminal and navigate to the `backend` directory.

4. Run the command `npm install` to install the dependencies.

5. Then, run `npm run start:prod` or `npm run start:dev` to start the API.

Once these steps are completed, the application should be up and running correctly.

## Estimated and Actual Development Time

The estimated time to develop the project was:

- Backend and Database: 20 hours
- Frontend: 10 hours

The actual time used for development has been:

- Backend and Database: 18 hours and 50 minutes
- Frontend: 17 hours

The project took longer than estimated due to certain complexities in the design and logic of frontend functionalities. Additionally, there were challenges in the initial planning of the database, which led to some code rewrites. Despite facing unforeseen issues, the project has been successfully completed and is ready for use.

Lastly, it has been identified that using server-side rendering instead of client-side could have been a more efficient option for the page presentation, and this will be considered for future projects.
