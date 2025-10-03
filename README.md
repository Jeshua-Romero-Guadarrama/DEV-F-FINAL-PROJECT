# PawMatch Platform

La plataforma PawMatch impulsa la adopcion responsable y habilita una tienda solidaria para mascotas. El repositorio adopta un monorepo que coordina la API de servicios, la guia de cuidados y el frontend de experiencia interactiva, garantizando un flujo profesional listo para publicarse en GitHub.

## Contenido
- [Arquitectura general](#arquitectura-general)
- [Tecnologias clave](#tecnologias-clave)
- [Inicio rapido](#inicio-rapido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [API PawMatch](#api-pawmatch)
- [Frontend web](#frontend-web)
- [Arquitectura aplicada](#arquitectura-aplicada)
- [Calidad y buenas practicas](#calidad-y-buenas-practicas)

## Arquitectura general
El repositorio organiza sus aplicaciones bajo el directorio `apps/` siguiendo un monorepo modular.

```text
apps/
  api/
    src/
      app/               # Configuracion de Express y middlewares globales
      config/            # Carga de variables y conexion a MongoDB
      middlewares/       # Autenticacion, validacion y manejo de errores
      modules/
        auth/            # Registro, login y perfil
        pets/            # Catalogo de mascotas en adopcion
        products/        # Tienda solidaria
        requests/        # Solicitudes de adopcion y seguimiento
        orders/          # Pedidos de tienda administrables
        leads/           # Registros de la guia de cuidados
        users/           # Modelo base de usuarios
      routes/            # Enrutador principal /api/v1
      shared/            # Utilitarios comunes (HttpError)
      utils/             # Servicios auxiliares (correo SMTP)
    .env.example
    package.json
  web/
    src/
      app/               # Definicion de rutas con React Router
      components/layout/ # Layout global, navbar y footer
      modules/home/      # Componentes, datos y pagina de inicio
      modules/adoptions/ # Listado, detalle y contenidos educativos para adopcion
      modules/store/     # Hero, combos, beneficios, testimonios y carrito
      pages/
        auth/            # Pantallas de registro e inicio de sesion
        care/            # Pagina guia de cuidados con formulario
        admin/           # Panel administrativo de pedidos y leads
      services/          # Clientes HTTP reutilizables (API, auth, pets, products, orders, leads)
      context/           # Providers de autenticacion y carrito compartido
    public/
    package.json
```

La raiz incorpora `package.json` con scripts compuestos y `.gitignore` para excluir artefactos de build y secretos.

## Tecnologias clave
- API: Node.js 20+, Express 5, Mongoose 8, JWT, Nodemailer, Helmet, Cors
- Frontend: React 19, React Router 7, Vite 7, Tailwind CSS 3, React Icons
- Calidad: ESLint (configuracion dedicada por aplicacion)

## Inicio rapido
1. **Requisitos**: Node.js 20 o superior y MongoDB accesible.
2. **Instalacion de dependencias** (desde la raiz del repositorio):
   ```bash
   npm install --prefix apps/api
   npm install --prefix apps/web
   ```
3. **Variables de entorno**: duplicar `apps/api/.env.example` como `.env` y actualizar valores sensibles (`MONGO_URI`, `JWT_SECRET`, credenciales SMTP si se desea correo).
4. **Ejecucion local**:
   - API: `npm run dev:api`
   - Frontend: `npm run dev:web`
5. **Produccion minima**:
   - API: `npm run start:api`
   - Frontend: `npm run build:web` seguido de `npm --prefix apps/web run preview` o despliegue estatico.

## Variables de entorno
La API consume los siguientes valores (ver `apps/api/.env.example`):

| Variable             | Descripcion                                                         | Predeterminado                |
| -------------------- | ------------------------------------------------------------------- | ----------------------------- |
| `PORT`               | Puerto expuesto por Express                                          | `4000`                        |
| `API_PREFIX`         | Prefijo comun para rutas REST                                        | `/api/v1`                     |
| `MONGO_URI`          | Cadena de conexion a MongoDB                                         | `mongodb://127.0.0.1:27017`   |
| `MONGO_DB`           | Nombre de base de datos                                              | `pawmatch`                    |
| `JWT_SECRET`         | Clave para firmar tokens JWT                                         | `supersecret`                 |
| `JWT_EXPIRES_IN`     | Validez de token                                                     | `7d`                          |
| `BCRYPT_SALT_ROUNDS` | Rondas de hash de contrasenas                                        | `10`                          |
| `CORS_ORIGINS`       | Lista separada por comas de origenes permitidos                      | `http://localhost:5173`       |
| `SMTP_*`             | Credenciales y configuracion de correo transaccional (opcional)      | vacio                         |

## Scripts disponibles
Scripts orquestados desde la raiz (`package.json`):

| Script              | Proposito                                      |
| ------------------- | ---------------------------------------------- |
| `npm run dev:api`   | Inicia la API en modo desarrollo con Nodemon   |
| `npm run start:api` | Inicia la API en modo produccion               |
| `npm run lint:api`  | Ejecuta ESLint sobre `apps/api`                |
| `npm run dev:web`   | Levanta Vite con hot reload                    |
| `npm run build:web` | Construye el frontend para distribucion        |
| `npm run lint:web`  | Valida estandares de codigo en `apps/web`      |

## API PawMatch
- **Salud**: `GET /health` devuelve estado del servicio.
- **Autenticacion** (`/api/v1/auth`): registro, login y perfil autenticado.
- **Mascotas** (`/api/v1/pets`): listado, detalle, creacion, edicion y eliminacion (operaciones protegidas para rol `admin`).
- **Productos** (`/api/v1/products`): catalogo solidario con filtros por categoria y estado.
- **Solicitudes de adopcion** (`/api/v1/requests`): gestion de solicitudes, timeline de seguimiento y notificaciones por correo.
- **Pedidos de tienda** (`/api/v1/orders`): los usuarios autenticados crean pedidos y el rol `admin` consulta y actualiza su estatus.
- **Leads de guia** (`/api/v1/leads`): formulario de la guia de cuidados abierto al publico y consulta/gestion para administradores.

El middleware de autenticacion reside en `apps/api/src/middlewares/auth.middleware.js` y la capa de validaciones utiliza `express-validator` encapsulado en `validateRequest`.

## Frontend web
La interfaz React organiza sus vistas principales mediante React Router:

- `HomePage` mantiene el carrusel, secciones informativas y llamado a donativos.
- `AdoptionsPage` ofrece filtros, tarjetas, paginacion y contenidos de apoyo (proceso, historias y voluntariado), enlazando al perfil detallado (`/adoptions/:id`).
- `PetDetailPage` muestra galeria, datos clave y narrativa de cada mascota con un CTA de adopcion.
- `StorePage` replica el diseño de la tienda con combos destacados, beneficios, testimonios y carrito conectado a órdenes.
- `CareGuidePage` mantiene el formulario promocional y envia registros a la API de leads.
- `RegisterPage` y `LoginPage` administran autenticacion y almacenan el token en el contexto compartido.
- `AdminDashboardPage` muestra pedidos y leads filtrables para el rol administrativo.

`context/` aloja `AuthProvider` y `CartProvider`, reutilizados por toda la SPA. `services/` centraliza el acceso HTTP (`apiClient`, `authService`, `petsService`, `productsService`, `ordersService`, `leadsService`). Tailwind CSS define tipografias y colores corporativos.

## Arquitectura aplicada
PawMatch adopta una **arquitectura monorepo modular**:

- **Backend**: un monolito organizado por dominios (auth, pets, products, requests, orders, leads) siguiendo una separacion por capas simples: configuracion, middlewares, modulos de dominio y utilitarios compartidos. Cada modulo encapsula modelo Mongoose, validadores, controladores y rutas, favoreciendo cohesion y mantenibilidad.
- **Frontend**: una SPA construida con React y React Router, estructurada por layout, modulos funcionales y paginas independientes. Los contextos de autenticacion y carrito desacoplan el estado global, y los servicios HTTP abstraen la comunicacion con la API.
- **Coordinacion**: el monorepo (workspace npm) permite compartir scripts y mantener versiones sincronizadas, reduciendo friccion para despliegue y CI.

## Calidad y buenas practicas
- La plataforma se beneficia de ESLint en cada aplicacion para sostener un estilo consistente.
- El repositorio ignora `node_modules`, archivos `.env` y compilados a traves de `.gitignore`.
- Se recomienda ejecutar los scripts de linting antes de publicar un Pull Request.
- Las pruebas unitarias pueden incorporarse en `apps/api/tests` o `apps/web/src/__tests__` segun la necesidad del equipo.

El repositorio queda listo para versionarse en GitHub, con estructura clara, comandos documentados y ejemplos de configuracion reproducibles.
