# PawMatch Platform

La plataforma PawMatch impulsa la adopción responsable y habilita una tienda solidaria para mascotas. El repositorio adopta un monorepo que coordina la API de servicios, la guía de cuidados y el frontend de experiencia interactiva, garantizando un flujo profesional listo para publicarse en GitHub.

## Contenido
- [Arquitectura general](#arquitectura-general)
- [Tecnologías clave](#tecnologias-clave)
- [Inicio rápido](#inicio-rapido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [API PawMatch](#api-pawmatch)
- [Frontend web](#frontend-web)
- [Arquitectura aplicada](#arquitectura-aplicada)
- [Calidad y buenas prácticas](#calidad-y-buenas-practicas)

## Arquitectura general
El repositorio organiza sus aplicaciones bajo el directorio `apps/` siguiendo un monorepo modular.

```text
apps/
  api/
    src/
      app/               # Configuración de Express y middlewares globales
      config/            # Carga de variables y conexión a MongoDB
      middlewares/       # Autenticación, validación y manejo de errores
      modules/
        auth/            # Registro, login y perfil
        pets/            # Catálogo de mascotas en adopción (incluye endpoint /seeds)
        products/        # Tienda solidaria
        requests/        # Solicitudes de adopción y seguimiento
        orders/          # Pedidos de tienda administrables
        leads/           # Registros de la guía de cuidados
        users/           # Modelo base de usuarios
      routes/            # Enrutador principal /api/v1
      shared/            # Utilitarios comunes (HttpError)
      utils/             # Servicios auxiliares (correo SMTP)
    .env.example
    package.json
  web/
    src/
      app/               # Definición de rutas con React Router
      components/layout/ # Layout global, navbar y footer
      modules/home/      # Componentes, datos y página de inicio
      modules/adoptions/ # Listado, detalle y contenidos educativos para adopción
      modules/adoptionForm/ # Flujo por pasos para el registro y contrato de adopción
      modules/store/     # Hero, combos, beneficios, testimonios y carrito
      pages/
        auth/            # Pantallas de registro e inicio de sesión
        care/            # Página guía de cuidados con formulario
        admin/           # Panel administrativo con control de roles
      services/          # Clientes HTTP reutilizables (API, auth, pets, products, orders, leads)
      context/           # Providers de autenticación y carrito compartido
    public/
    package.json
```

La raíz incorpora `package.json` con scripts compuestos y `.gitignore` para excluir artefactos de build y secretos.

## Tecnologías clave
- API: Node.js 20+, Express 5, Mongoose 8, JWT, Nodemailer, Helmet, CORS
- Frontend: React 19, React Router 7, Vite 7, Tailwind CSS 3, React Icons
- Calidad: ESLint (configuración dedicada por aplicación)

## Inicio rápido
1. **Requisitos**: Node.js 20 o superior y MongoDB accesible.
2. **Instalación de dependencias** (desde la raíz del repositorio):
   ```bash
   npm install --prefix apps/api
   npm install --prefix apps/web
   ```
3. **Variables de entorno**: duplicar `apps/api/.env.example` como `.env` y actualizar valores sensibles (`MONGO_URI`, `JWT_SECRET`, credenciales SMTP si se desea correo). Para acceso maestro opcional en frontend define `VITE_ADMIN_EMAIL` y `VITE_ADMIN_PASSWORD`.
4. **Ejecución local**:
   - API: `npm run dev:api`
   - Frontend: `npm run dev:web`
5. **Producción mínima**:
   - API: `npm run start:api`
   - Frontend: `npm run build:web` seguido de `npm --prefix apps/web run preview` o despliegue estático.

## Variables de entorno
La API consume los siguientes valores (ver `apps/api/.env.example`):

| Variable             | Descripción                                                         | Predeterminado                |
| -------------------- | ------------------------------------------------------------------- | ----------------------------- |
| `PORT`               | Puerto expuesto por Express                                          | `4000`                        |
| `API_PREFIX`         | Prefijo común para rutas REST                                        | `/api/v1`                     |
| `MONGO_URI`          | Cadena de conexión a MongoDB                                         | `mongodb://127.0.0.1:27017`   |
| `MONGO_DB`           | Nombre de base de datos                                              | `pawmatch`                    |
| `JWT_SECRET`         | Clave para firmar tokens JWT                                         | `supersecret`                 |
| `JWT_EXPIRES_IN`     | Validez de token                                                     | `7d`                          |
| `BCRYPT_SALT_ROUNDS` | Rondas de hash de contraseñas                                        | `10`                          |
| `CORS_ORIGINS`       | Lista separada por comas de orígenes permitidos                      | `http://localhost:5173`       |
| `SMTP_*`             | Credenciales y configuración de correo transaccional (opcional)      | vacío                         |

## Scripts disponibles
Scripts orquestados desde la raíz (`package.json`):

| Script              | Propósito                                     |
| ------------------- | ---------------------------------------------- |
| `npm run dev:api`   | Inicia la API en modo desarrollo con Nodemon   |
| `npm run start:api` | Inicia la API en modo producción               |
| `npm run lint:api`  | Ejecuta ESLint sobre `apps/api`                |
| `npm run dev:web`   | Levanta Vite con hot reload                    |
| `npm run build:web` | Construye el frontend para distribución        |
| `npm run lint:web`  | Valida estándares de código en `apps/web`      |

## API PawMatch
- **Salud**: `GET /health` devuelve estado del servicio.
- **Autenticación** (`/api/v1/auth`): registro, login y perfil autenticado.
- **Mascotas** (`/api/v1/pets` y `/api/v1/pets/seeds`): listado, detalle, creación, edición y semillas de ejemplo.
- **Productos** (`/api/v1/products`): catálogo solidario con filtros por categoría y estado.
- **Solicitudes de adopción** (`/api/v1/requests`): gestión de solicitudes, timeline de seguimiento y notificaciones por correo.
- **Pedidos de tienda** (`/api/v1/orders`): los usuarios autenticados crean pedidos y el rol `admin` consulta y actualiza su estatus.
- **Leads de guía** (`/api/v1/leads`): formulario de la guía de cuidados abierto al público y consulta/gestión para administradores.

## Frontend web
La interfaz React organiza sus vistas principales mediante React Router:

- `HomePage` mantiene el carrusel, secciones informativas y llamado a donativos.
- `AdoptionsPage` ofrece filtros, tarjetas, paginación y contenidos de apoyo; si la API está vacía usa semillas como Toby.
- `PetDetailPage` muestra galería, datos clave y narrativa de cada mascota con recursos de fallback.
- `AdoptionFormPage` guía el registro y la generación de contrato mediante formularios por pasos (`/adoptions/form`).
- `StorePage` replica el diseño de la tienda con combos destacados, beneficios, testimonios y carrito conectado a órdenes.
- `CareGuidePage` mantiene el formulario promocional y envía registros a la API de leads.
- `LoginPage` detecta credenciales maestras (configurables con variables Vite) para redirigir directamente al panel.
- `AdminDashboardPage` muestra estadísticas y tablas sólo si el usuario tiene rol `admin`; las cuentas estándar ven un mensaje informativo.

`context/` aloja `AuthProvider` y `CartProvider`, reutilizados por toda la SPA. `services/` centraliza el acceso HTTP (`apiClient`, `authService`, `petsService`, `productsService`, `ordersService`, `leadsService`). Tailwind CSS define tipografías y colores corporativos.

## Arquitectura aplicada
PawMatch adopta una **arquitectura monorepo modular**:

- **Backend**: un monolito organizado por dominios (auth, pets, products, requests, orders, leads) siguiendo una separación por capas simples: configuración, middlewares, módulos de dominio y utilitarios compartidos. Cada módulo encapsula modelo Mongoose, validadores, controladores y rutas, favoreciendo cohesión y mantenibilidad.
- **Frontend**: una SPA construida con React y React Router, estructurada por layout, módulos funcionales y páginas independientes. Los contextos de autenticación y carrito desacoplan el estado global, y los servicios HTTP abstraen la comunicación con la API.
- **Coordinación**: el monorepo (workspace npm) permite compartir scripts y mantener versiones sincronizadas, reduciendo fricción para despliegue y CI.

## Calidad y buenas prácticas
- La plataforma se beneficia de ESLint en cada aplicación para sostener un estilo consistente.
- El repositorio ignora `node_modules`, archivos `.env` y compilados a través de `.gitignore`.
- Se recomienda ejecutar los scripts de linting antes de publicar un Pull Request.
- Las pruebas unitarias pueden incorporarse en `apps/api/tests` o `apps/web/src/__tests__` según la necesidad del equipo.

El repositorio queda listo para versionarse en GitHub, con estructura clara, comandos documentados y ejemplos de configuración reproducibles.
