# Sistema de gestión de tareas

Se Implementó un sistema para gestionar tareas que cuenta con un back-end hecho en Java/Spring Boot, como base de datos se usó una relacion (PostgreSQL).

Las funcionalidades son:
* Crear una tarea.
* Obtener el listado de tareas.
* Obtener el detalle de una tarea.
* Modificar una tarea.
* Cambiar el estado de una tarea
* Eliminar una tarea.

## Pasos para ejecutar el sistema

### Prerequisitos
Antes de empezar chequear si se tiene instalado:
* Docker y Docker compose
* Node
* Git

### Paso a paso
1. Navegar a la ruta del back end
```bash
cd task
```
2. Creá un archivo llamado .env en la raíz de la carpeta `task` y configurá las variables de entorno necesarias:
```.env
PORT=8080
DB_URL=jdbc:postgresql://postgres-db:5432/task-manager
DB_NAME=task-manager
DB_USER=user
DB_PASSWORD=password
FRONTEND_URL=http://localhost:5173
```
3. Levantar los servicios con Docker compose. Este comando descargará las imágenes, compilará la app mediante el Dockerfile de múltiples etapas y expondrá el backend:

```bash
docker compose up --build -d
```

4. Navegar a la ruta del front end desde el directorio raiz: 

```bash
cd task-front
```
5. Instalar dependencias

```bash
npm install
```

6. Crear un archivo .env

```env
VITE_API_URL=http://localhost:8080/api
```
7. Iniciar el servidor de desarrollo:
``` bash
npm run dev
```

Una vez completados los pasos, el frontend debería estar disponible en http://localhost:5173 comunicándose de forma transparente con el backend en el puerto 8080.

Algunos comandos utiles son:
* Apagar servicios del docker: `docker compose down` . 
* Apagar borrando los datos de la DB: `docker compose down -v` (útil si reestructurás entidades y querés limpiar el volumen persistente).
* 

## Decisiones tomadas.
### Con respecto al back-end: 
* **Arquitectura basada en capas**: Por las pocas tareas a implementar se optó por usar ésta arquitectura ya que me permite **separar responsabilidades**.
* Uso de **DTO**: Se optó por su uso principalmente para establecer que se recibe en las `request` y que se envia por `response` a través de la *API REST*.
* Se usaron **validaciones**: Se usó para validar datos que llegan desde el request. Lo podemos ver en el archivo de `TaskRequestDTO` .
* Cambiar un atributo como Status por PATCH y por Query Params: Opté por este metodo porque desde el lado del front es mas sencillo implementarlo ya que es la modificación de un solo atributo.
* Se implementa un **manejo de errores**: Nos permite capturar fallos que ocurren en tiempos de ejecución, como el id no encontrada al solicitar un recurso inexistente o al enviar datos inválidos en el cuerpo de la solicitud.
* Metodo PUT: Por temas de tiempo para la actualizacion es necesario mandar todos los campos que se necesitan para crear el producto. Se utiliza el mismo dto para crear como para actualizar. No se llegó a crear uno para actualizar especificamente.

### Con respecto al front-end:
* Se utiliza arquitectura basada en capas para maximizar la simplicidad.
* Su utiliza interfaces de Typescript para aliernos con los tipos de mi back end.
* Se puso toda la logica del form en el *TaskForm.tsx*. Lo ideal seria poner las logicas en archivos que empiezen por la palabra `use` en `/hooks`. Por motivos de tiempo del ejercicio se implemento todo en un solo lugar.
* Como solo se penso en mostrar una vista ("/") no fue necesario usar la libreria react router dom para manejar el enrutamiento.
* No se usó una vista exclusiva para detalles por tema de tiempo. Si se quiere ver el detalle de una tarea se puede ver la misma cuando elegis la opcion "Editar".

## Endpoints de la API

1. Crear una tarea: 

    - Metodo:`POST` 
    - URL: `/api/tasks`
    - Cuerpo ejemplo:
    ```json
        {
        "title": "Falla de red wifi en Laboratorio 1",
        "description": "El Access Point del fondo no está asignando direcciones IP. Reiniciar la interfaz PoE.",
        "priority": "HIGH",
        "dueDate": "2026-07-02T18:00:00"
        }
    ```

2. Obtener el listado de tareas.
 - Metodo:`GET` 
 - URL: `/api/tasks`

3. Obtener el detalle de una tarea.
 - Metodo:`GET` 
 - URL: `/api/tasks/{id}`

4. Modificar una tarea.
 - Metodo:`PUT` 
 - URL: `/api/tasks/{id}`
 - Cuerpo ejemplo :
  ```json
        {
        "title": "Falla de red wifi en Laboratorio 2",
        "description": "El Access Point de la planta baja, habitacion 3 fue desactivado.",
        "priority": "LOW",
        "dueDate": "2026-07-03T18:00:00"
        }
  ```

5. Cambiar el estado de una tarea.
 - Metodo:`PATCH` 
 - URL: `/api/tasks/${id}/status?status={status}`

6. Eliminar una tarea.
 - Metodo:`DELETE` 
 - URL: `/api/tasks/{id}`


## Futuras funcionalidades

### Lo que quedó pendiente 
* El listado deberá permitir, como mínimo:
    * Filtrar por estado.
    * Filtrar por prioridad.
    * Buscar por título.
    * Ordenar por fecha de vencimiento
* Version mobile del sistema (No llegaba con el tiempo a realizar una app mobile)

### Lo que se podría implementar
* Mostrar modal sobre los detalles de una tarea.
* Crear autenticacion de usuarios y separación de roles.
* Documentación de swagger para los endpoints.
* Test unitarios en el back
* Test de integracion de algun endpoint
* Test de componentes en React.


## Decisión del POR QUÉ se desarrollo lo que hay hasta el momento
En base al tiempo que habia que dedicarle al ejercicio (no más de 4 horas) priorice las funcionalidades que le agregan mas valor al producto y que lo hacen en cierta medida "funcional" para el usuario, ya que va a poder crear, editar, ver tareas y cambiar el estado de las mismas. Son features que hacen que el producto tenga valor al comienzo de su salida a producción. Las funcionalidades de filtrado, busqueda y ordenar serian un "plus" una vez terminada las funcionalidades elementales.

### Tiempo estimado
Horas dedicadas actualmente:
* Setup del proyecto + Documentacion + servidores: 2 horas.
* Codigo back end: 1 hora 30 minutos
* Codigo fron end: 1 hora 30 minutos 

Cabe aclarar que el codigo se desarrolló una vez se instalaron las dependencias para ambos proyectos, se preparó el docker-compose con la imagen de maven y la documentación se iba haciendo a la par del desarollo. Los servidores se escogieron al comienzo del desarrollo pero se puso en produccion una vez terminados los dos repositorios.

Por último cabe aclarar que se eligieron servidores para que todo esté en producción pero por temas de tiempo se decidió entregarlo y no se llegó a desplegar.

Lo elegido fue:
* Render para el back
* Vercel para el front
* Supabase para PostgreSQL