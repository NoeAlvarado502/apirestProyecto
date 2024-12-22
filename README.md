# API REST en Node.js

## Descripción

Esta es una API REST desarrollada en Node.js utilizando varias tecnologías populares. Su arquitectura está dividida en carpetas siguiendo un enfoque modular y escalable. Las principales funcionalidades incluyen autenticación, manejo de datos, validaciones, y más.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para crear el servidor web.
- **Sequelize**: ORM para gestionar bases de datos.
- **Tedious**: Conector para bases de datos Microsoft SQL Server.
- **bcryptjs**: Encriptación de contraseñas.
- **jsonwebtoken**: Gestión de tokens JWT para autenticación.
- **dotenv**: Gestión de variables de entorno.
- **Nodemon**: Herramienta para recargar el servidor automáticamente durante el desarrollo.

## Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```
.
├── /src              # Contiene todo el código fuente
│   ├── /config       # Configuración del proyecto (bases de datos, variables de entorno)
│   ├── /controllers  # Controladores que manejan la lógica de cada endpoint
│   ├── /middlewares  # Middlewares para validaciones y seguridad
│   ├── /routes       # Definición de rutas y vinculación con los controladores
│   ├── /services     # Lógica de negocio
│   ├── /utils        # Funciones auxiliares y utilidades
│   ├── app.js        # Configuración inicial de la aplicación
│   ├── index.js      # Punto de entrada principal
├── .env              # Variables de entorno
├── .gitignore        # Archivos a ignorar por Git
├── package.json      # Dependecias y scripts del proyecto
├── README.me         # Documentación del proyecto
├── GDA00460-OT-NoeAlvarado.sql        # Script de la base de datos

```

## Script de base de datos

Ejecute por completo el script de la base de datos.

Creara estados, roles y usuario para el correcto funcionamiento del API.

Datos del usuario que fue creado en el script.
```
{
  "idRol": 1,            //idRol de ADMIN
  "email": "test@test",
  "password": "test"
}
```

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/NoeAlvarado502/apirestProyecto.git
   cd apirestProyecto.git
   ```

2. Instala las dependencias:

   ```bash
   npm install npm install bcryptjs dotenv express jsonwebtoken sequelize tedious
   npm install --save-dev nodemon
   ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto. Ejemplo:

  ```
  # Configuración del servidor
  PORT = 4000
  
  # Configuración de la base de datos
  DB_NAME= DatabaseName
  DB_USER= sa
  DB_PASSWORD= password
  DB_HOST= localhost
  DB_PORT= 1433
  DB_ENCRYPT= true
  DB_TRUST_CERT= true
  DB_LOGGING= false

  # Configuración de bcrypt
  BCRYPT_SALT_ROUNDS = 10

  # Configuración de JWT
  SECRET_JWT_KEY = secret
  JWT_EXPIRES_IN = 24h      //Según requisitos utilizar esta duración.
  ```
   
## Configuración

El archivo `src/config/config.js` es responsable de cargar las variables de entorno desde el archivo `.env` utilizando el paquete **dotenv**. Asegúrate de que todas las claves necesarias estén correctamente configuradas en tu archivo `.env`.

## Uso

### Modo desarrollo

Para un desarrollo más eficiente, utiliza **Nodemon** ejecutando:

```bash
npm run dev
```

Esto recargará automáticamente el servidor cuando detecte cambios en los archivos.

Asegúrte de tener el script configurado en tu archivo `package.json`:

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

## Endpoints

| Método | Endpoint                 | Descripción                             |
|--------|--------------------------|-----------------------------------------|
| POST   | `api/auth/register`      | Registro de nuevos usuarios             |
| POST   | `api/auth/login`         | Autenticación y generación de JWT       |
| POST   | `api/estados`            | Creación de nuevos estados              |
| PUT    | `api/estados`            | Actualización de un estado              |
| POST   | `api/categoriasproductos`| Creación de categorías de productos     |
| PUT    | `api/categoriasproductos`| Actualización de categorías de productos|
| POST   | `api/productos`          | Creación de nuevos productos            |
| PUT    | `api/productos`          | Actualización de un producto            |
| POST   | `api/ordenes`            | Creación de nuevas ordenes              |
| PUT    | `api/ordenes`            | Actualización de una orden              |

Todos los endpoints requieren enviar un Token en el encabezado, y que el usuario tenga el rol ADMIN, exceptuando el POST api/auth/login.

### POST `api/auth/register`

Este endpoint permite registrar un nuevo usuario en la aplicación.

#### Request

- **URL:** `api/auth/register`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "idRol": "integer",
  "nombre": "string",
  "email": "string",
  "password": "string",
  "telefono": "string",
  "direccion": "string",
  "fechaNacimiento": "string"
}
```

### POST `api/auth/login`

Este endpoint permite a un usuario autenticarse en la aplicación y obtener un token JWT para acceder a recursos protegidos.

#### Request

- **URL:** `api/auth/login`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

- **Código de estado:** 200 OK
- **Cuerpo de la respuesta:**

```json
{
  "message": "Inicio de sesión exitoso.",
  "token": "string"
}
```

#### Response

- **Código de estado:** 201 Created
- **Cuerpo de la respuesta:**

```json
{
  "message": "Usuario registrado exitosamente."
}
```

### POST `api/estados`

Este endpoint permite crear un nuevo estado.

#### Request

- **URL:** `api/estados`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "nombre": "string"
}
```

#### Response

- **Código de estado:** 201 Created
- **Cuerpo de la respuesta:**

```json
{
  "message": "Estado creado exitosamente"
}
```

### PUT `api/estados`

Este endpoint permite actualizar un estado existente.

#### Request

- **URL:** `api/estados`
- **Método HTTP:** PUT
- **Cuerpo de la solicitud:**

```json
{
  "idEstado": "integer",
  "nombre": "string"
}
```

#### Response

- **Código de estado:** 200 OK
- **Cuerpo de la respuesta:**

```json
{
  "message": "Estado actualizado exitosamente"
}
```

### POST `api/categoriasproductos`

Este endpoint permite crear una nueva categoría de producto.

#### Request

- **URL:** `api/categoriasproductos`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "nombre": "string"
}
```

#### Response

- **Código de estado:** 201 Created
- **Cuerpo de la respuesta:**

```json
{
  "message": "Categoría creada exitosamente"
}
```

### PUT `api/categoriasproductos`

Este endpoint permite actualizar una categoría de producto existente.

#### Request

- **URL:** `api/categoriasproductos`
- **Método HTTP:** PUT
- **Cuerpo de la solicitud:**

```json
{
  "idCategoriaProducto": "integer",
  "idEstado": "integer",
  "nombre": "string"
}
```

#### Response

- **Código de estado:** 200 OK
- **Cuerpo de la respuesta:**

```json
{
  "message": "Categoría actualizada exitosamente"
}
```

### POST `api/productos`

Este endpoint permite crear un nuevo producto.

#### Request

- **URL:** `api/productos`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "idCategoriaProducto": "integer",
  "nombre": "string",
  "marca": "string",
  "codigo": "string",
  "stock": "integer",
  "precio": "number",
  "imagen": "string"
}
```

#### Response

- **Código de estado:** 201 Created
- **Cuerpo de la respuesta:**

```json
{
  "message": "Producto creado exitosamente"
}
```

### PUT `api/productos`

Este endpoint permite actualizar un producto existente.

#### Request

- **URL:** `api/productos`
- **Método HTTP:** PUT
- **Cuerpo de la solicitud:**

```json
{
  "idProducto": "integer",
  "idEstado": "integer",
  "idCategoriaProducto": "integer",
  "nombre": "sting",
  "marca": "sting",
  "codigo": "string",
  "stock": "integer",
  "precio": "number",
  "imagen": "string"
}
```

#### Response

- **Código de estado:** 200 OK
- **Cuerpo de la respuesta:**

```json
{
  "message": "Orden actualizada exitosamente"
}
```

### POST `api/ordenes`

Este endpoint permite crear una nueva orden de compra. El campo `detallesOrden` puede contener múltiples objetos que representen los productos y sus respectivas cantidades.

#### Request

- **URL:** `api/ordenes`
- **Método HTTP:** POST
- **Cuerpo de la solicitud:**

```json
{
  "idUsuario": "integer",
  "fechaEntrega": "string",
  "detallesOrden": [
    {
      "idProducto": "integer",
      "cantidad": "integer"
    },
    {
      "idProducto": "integer",
      "cantidad": "integer"
    }
  ]
}
```

#### Response

- **Código de estado:** 201 Created
- **Cuerpo de la respuesta:**

```json
{
  "message": "Orden creada exitosamente",
  "total": "number"
}
```

### PUT `api/ordenes`

Este endpoint permite actualizar una orden existente.

#### Request

- **URL:** `api/ordenes`
- **Método HTTP:** PUT
- **Cuerpo de la solicitud:**

```json
{
  "idOrden": "integer",
  "idEstado": "integer",
  "idUsuario": "integer",
  "fechaEntrega": "string"
}
```

#### Response

- **Código de estado:** 200 OK
- **Cuerpo de la respuesta:**

```json
{
  "message": "Orden actualizada exitosamente"
}
```
