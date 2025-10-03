# PawMatch Platform

La plataforma PawMatch impulsa la adopcion responsable y habilita una tienda solidaria para mascotas. El repositorio adopta un monorepo que coordina la API de servicios y el frontend de experiencia interactiva, garantizando un flujo profesional listo para publicarse en GitHub.

## Contenido
- [Arquitectura general](#arquitectura-general)
- [Tecnologias clave](#tecnologias-clave)
- [Inicio rapido](#inicio-rapido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [API PawMatch](#api-pawmatch)
- [Frontend web](#frontend-web)
- [Calidad y buenas practicas](#calidad-y-buenas-practicas)

## Arquitectura general
El repositorio organiza sus aplicaciones bajo el directorio `apps/`.

```text
apps/
  api/
    src/
      app/               # Configuracion de Express y middlewares
      config/            # Carga de variables y conexion a MongoDB
      modules/           # Dominios: auth, pets, products, requests, users
      middlewares/       # Autenticacion, validacion y manejo de errores
      routes/            # Enrutador principal /api/v1
      shared/            # Utilitarios comunes (HttpError)
      utils/             # Servicios auxiliares (correo SMTP)
    .env.example          
    package.json
  web/
    src/
      app/               # Punto de entrada de React
      components/        # Layout principal, Navbar, Footer
      modules/home/      # Componentes, datos y pagina de inicio
    public/
    package.json
```

La raiz incorpora `package.json` con scripts compuestos y `./gitignore` para excluir artefactos de build.

## Tecnologias clave
- API: Node.js 20+, Express 5, Mongoose 8, JWT, Nodemailer, helmet, cors
- Frontend: React 19, Vite 7, Tailwind CSS 3, React Icons
- Calidad: ESLint (configuracion dedicada por aplicacion)

## Inicio rapido
1. **Requisitos**: Node.js 20 o superior y MongoDB accesible.
2. **Instalacion de dependencias** (desde la raiz del repositorio):
   ```bash
   npm install --prefix apps/api
   npm install --prefix apps/web
   ```
3. **Variables de entorno**: duplicar `apps/api/.env.example` y actualizar valores sensibles (`MONGO_URI`, `JWT_SECRET`, credenciales SMTP si se desea correo).
4. **Ejecucion local**:
   - API: `npm run dev:api`
   - Frontend: `npm run dev:web`
5. **Produccion minima**:
   - API: `npm run start:api`
   - Frontend: `npm run build:web` seguido de `npm --prefix apps/web run preview` o despliegue estatico.

## Variables de entorno
La API consume los siguientes valores (ver `apps/api/.env.example`):

| Variable            | Descripcion                                                         | Predeterminado                |
| ------------------- | ------------------------------------------------------------------- | ----------------------------- |
| `PORT`              | Puerto expuesto por Express                                          | `4000`                        |
| `API_PREFIX`        | Prefijo comun para rutas REST                                        | `/api/v1`                     |
| `MONGO_URI`         | Cadena de conexion a MongoDB                                         | `mongodb://127.0.0.1:27017`   |
| `MONGO_DB`          | Nombre de base de datos                                              | `pawmatch`                    |
| `JWT_SECRET`        | Clave para firmar tokens JWT                                         | `supersecret`                 |
| `JWT_EXPIRES_IN`    | Validez de token                                                     | `7d`                          |
| `BCRYPT_SALT_ROUNDS`| Rondas de hash de contrasenas                                        | `10`                          |
| `CORS_ORIGINS`      | Lista separada por comas de origenes permitidos                      | `http://localhost:5173`       |
| `SMTP_*`            | Credenciales y configuracion de correo transaccional (opcional)      | vacio                         |

## Scripts disponibles
Scripts orquestados desde la raiz (`package.json`):

| Script             | Proposito                                      |
| ------------------ | ---------------------------------------------- |
| `npm run dev:api`  | Inicia la API en modo desarrollo con Nodemon   |
| `npm run start:api`| Inicia la API en modo produccion               |
| `npm run lint:api` | Ejecuta ESLint sobre `apps/api`                |
| `npm run dev:web`  | Levanta Vite con hot reload                    |
| `npm run build:web`| Construye el frontend para distribucion        |
| `npm run lint:web` | Valida estandares de codigo en `apps/web`      |

## API PawMatch
- **Salud**: `GET /health` devuelve estado del servicio.
- **Autenticacion** (`/api/v1/auth`): registro, login y perfil autenticado.
- **Mascotas** (`/api/v1/pets`): listado, detalle, creacion, edicion y eliminacion (operaciones protegidas para rol `admin`).
- **Productos** (`/api/v1/products`): catalogo solidario con filtros por categoria y estado.
- **Solicitudes** (`/api/v1/requests`): gestion de solicitudes de adopcion, timeline de seguimiento y notificaciones por correo.

El middleware de autenticacion reside en `apps/api/src/middlewares/auth.middleware.js` y la capa de validaciones utiliza `express-validator` encapsulado en `validateRequest`.

## Frontend web
La interfaz React organiza la pagina de inicio bajo `apps/web/src/modules/home`.

- `components/` agrupa secciones modulares (Carrusel, About, Support, Contacto, Banner).
- `data/` centraliza textos, imagenes y llamados a la accion reutilizables.
- `components/layout/` provee `Navbar`, `Footer` y `MainLayout` para envolver paginas.

El estilo se apoya en Tailwind CSS, con tipografias y colores definidos en `tailwind.config.js`.

## Calidad y buenas practicas
- La plataforma se beneficia de ESLint en cada aplicacion para sostener un estilo consistente.
- El repositorio ignora `node_modules`, archivos `.env` y compilados a traves de `.gitignore`.
- Se recomienda ejecutar los scripts de linting antes de publicar un Pull Request.
- Las pruebas unitarias pueden incorporarse en `apps/api/tests` o `apps/web/src/__tests__` segun la necesidad del equipo.

El repositorio queda listo para versionarse en GitHub, con estructura clara, comandos documentados y ejemplos de configuracion reproducibles.
