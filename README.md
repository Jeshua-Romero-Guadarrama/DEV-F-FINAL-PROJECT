# PawMatch Platform

La plataforma PawMatch impulsa la adopci�n responsable y habilita una tienda solidaria para mascotas. El repositorio adopta un monorepo que coordina la API de servicios, la gu�a de cuidados y el frontend de experiencia interactiva, garantizando un flujo profesional listo para publicarse en GitHub.

## Contenido
- [Arquitectura general](#arquitectura-general)
- [Tecnolog�as clave](#tecnologias-clave)
- [Inicio r�pido](#inicio-rapido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [API PawMatch](#api-pawmatch)
- [Frontend web](#frontend-web)
- [Arquitectura aplicada](#arquitectura-aplicada)
- [Calidad y buenas pr�cticas](#calidad-y-buenas-practicas)

## Arquitectura general
El repositorio organiza sus aplicaciones bajo el directorio `apps/` siguiendo un monorepo modular.

```text
apps/
  api/
    src/
      app/               # Configuraci�n de Express y middlewares globales
      config/            # Carga de variables y conexi�n a MongoDB
      middlewares/       # Autenticaci�n, validaci�n y manejo de errores
      modules/
        auth/            # Registro, login y perfil
        pets/            # Cat�logo de mascotas en adopci�n (incluye endpoint /seeds)
        products/        # Tienda solidaria
        requests/        # Solicitudes de adopci�n y seguimiento
        orders/          # Pedidos de tienda administrables
        leads/           # Registros de la gu�a de cuidados
        users/           # Modelo base de usuarios
      routes/            # Enrutador principal /api/v1
      shared/            # Utilitarios comunes (HttpError)
      utils/             # Servicios auxiliares (correo SMTP)
    .env.example
    package.json
  web/
    src/
      app/               # Definici�n de rutas con React Router
      components/layout/ # Layout global, navbar y footer
      modules/home/      # Componentes, datos y p�gina de inicio
      modules/adoptions/ # Listado, detalle y contenidos educativos para adopci�n
      modules/adoptionForm/ # Flujo por pasos para el registro y contrato de adopci�n
      modules/store/     # Hero, combos, beneficios, testimonios y carrito
      pages/
        auth/            # Pantallas de registro e inicio de sesi�n
        care/            # P�gina gu�a de cuidados con formulario
        admin/           # Panel administrativo con control de roles
      services/          # Clientes HTTP reutilizables (API, auth, pets, products, orders, leads)
      context/           # Providers de autenticaci�n y carrito compartido
    public/
    package.json
```

La ra�z incorpora `package.json` con scripts compuestos y `.gitignore` para excluir artefactos de build y secretos.

## Tecnolog�as clave
- API: Node.js 20+, Express 5, Mongoose 8, JWT, Nodemailer, Helmet, CORS
- Frontend: React 19, React Router 7, Vite 7, Tailwind CSS 3, React Icons
- Calidad: ESLint (configuraci�n dedicada por aplicaci�n)

## Inicio r�pido
1. **Requisitos**: Node.js 20 o superior y MongoDB accesible.
2. **Instalaci�n de dependencias** (desde la ra�z del repositorio):
   ```bash
   npm install --prefix apps/api
   npm install --prefix apps/web
   ```
3. **Variables de entorno**: duplicar `apps/api/.env.example` como `.env` y actualizar valores sensibles (`MONGO_URI`, `JWT_SECRET`, credenciales SMTP si se desea correo). Para acceso maestro opcional en frontend define `VITE_ADMIN_EMAIL` y `VITE_ADMIN_PASSWORD`.
4. **Ejecuci�n local**:
   - API: `npm run dev:api`
   - Frontend: `npm run dev:web`
5. **Producci�n m�nima**:
   - API: `npm run start:api`
   - Frontend: `npm run build:web` seguido de `npm --prefix apps/web run preview` o despliegue est�tico.

## Variables de entorno
La API consume los siguientes valores (ver `apps/api/.env.example`):

| Variable             | Descripci�n                                                         | Predeterminado                |
| -------------------- | ------------------------------------------------------------------- | ----------------------------- |
| `PORT`               | Puerto expuesto por Express                                          | `4000`                        |
| `API_PREFIX`         | Prefijo com�n para rutas REST                                        | `/api/v1`                     |
| `MONGO_URI`          | Cadena de conexi�n a MongoDB                                         | `mongodb://127.0.0.1:27017`   |
| `MONGO_DB`           | Nombre de base de datos                                              | `pawmatch`                    |
| `JWT_SECRET`         | Clave para firmar tokens JWT                                         | `supersecret`                 |
| `JWT_EXPIRES_IN`     | Validez de token                                                     | `7d`                          |
| `BCRYPT_SALT_ROUNDS` | Rondas de hash de contrase�as                                        | `10`                          |
| `CORS_ORIGINS`       | Lista separada por comas de or�genes permitidos                      | `http://localhost:5173`       |
| `SMTP_*`             | Credenciales y configuraci�n de correo transaccional (opcional)      | vac�o                         |

## Scripts disponibles
Scripts orquestados desde la ra�z (`package.json`):

| Script              | Prop�sito                                     |
| ------------------- | ---------------------------------------------- |
| `npm run dev:api`   | Inicia la API en modo desarrollo con Nodemon   |
| `npm run start:api` | Inicia la API en modo producci�n               |
| `npm run lint:api`  | Ejecuta ESLint sobre `apps/api`                |
| `npm run dev:web`   | Levanta Vite con hot reload                    |
| `npm run build:web` | Construye el frontend para distribuci�n        |
| `npm run lint:web`  | Valida est�ndares de c�digo en `apps/web`      |

## API PawMatch
- **Salud**: `GET /health` devuelve estado del servicio.
- **Autenticaci�n** (`/api/v1/auth`): registro, login y perfil autenticado.
- **Mascotas** (`/api/v1/pets` y `/api/v1/pets/seeds`): listado, detalle, creaci�n, edici�n y semillas de ejemplo.
- **Productos** (`/api/v1/products`): cat�logo solidario con filtros por categor�a y estado.
- **Solicitudes de adopci�n** (`/api/v1/requests`): gesti�n de solicitudes, timeline de seguimiento y notificaciones por correo.
- **Pedidos de tienda** (`/api/v1/orders`): los usuarios autenticados crean pedidos y el rol `admin` consulta y actualiza su estatus.
- **Leads de gu�a** (`/api/v1/leads`): formulario de la gu�a de cuidados abierto al p�blico y consulta/gesti�n para administradores.

## Frontend web
La interfaz React organiza sus vistas principales mediante React Router:

- `HomePage` mantiene el carrusel, secciones informativas y llamado a donativos.
- `AdoptionsPage` ofrece filtros, tarjetas, paginaci�n y contenidos de apoyo; si la API est� vac�a usa semillas como Toby.
- `PetDetailPage` muestra galer�a, datos clave y narrativa de cada mascota con recursos de fallback.
- `AdoptionFormPage` gu�a el registro y la generaci�n de contrato mediante formularios por pasos (`/adoptions/form`).
- `StorePage` replica el dise�o de la tienda con combos destacados, beneficios, testimonios y carrito conectado a �rdenes.
- `CareGuidePage` mantiene el formulario promocional y env�a registros a la API de leads.
- `LoginPage` detecta credenciales maestras (configurables con variables Vite) para redirigir directamente al panel.
- `AdminDashboardPage` muestra estad�sticas y tablas s�lo si el usuario tiene rol `admin`; las cuentas est�ndar ven un mensaje informativo.

`context/` aloja `AuthProvider` y `CartProvider`, reutilizados por toda la SPA. `services/` centraliza el acceso HTTP (`apiClient`, `authService`, `petsService`, `productsService`, `ordersService`, `leadsService`). Tailwind CSS define tipograf�as y colores corporativos.

## Arquitectura aplicada
PawMatch adopta una **arquitectura monorepo modular**:

- **Backend**: un monolito organizado por dominios (auth, pets, products, requests, orders, leads) siguiendo una separaci�n por capas simples: configuraci�n, middlewares, m�dulos de dominio y utilitarios compartidos. Cada m�dulo encapsula modelo Mongoose, validadores, controladores y rutas, favoreciendo cohesi�n y mantenibilidad.
- **Frontend**: una SPA construida con React y React Router, estructurada por layout, m�dulos funcionales y p�ginas independientes. Los contextos de autenticaci�n y carrito desacoplan el estado global, y los servicios HTTP abstraen la comunicaci�n con la API.
- **Coordinaci�n**: el monorepo (workspace npm) permite compartir scripts y mantener versiones sincronizadas, reduciendo fricci�n para despliegue y CI.

## Calidad y buenas pr�cticas
- La plataforma se beneficia de ESLint en cada aplicaci�n para sostener un estilo consistente.
- El repositorio ignora `node_modules`, archivos `.env` y compilados a trav�s de `.gitignore`.
- Se recomienda ejecutar los scripts de linting antes de publicar un Pull Request.
- Las pruebas unitarias pueden incorporarse en `apps/api/tests` o `apps/web/src/__tests__` seg�n la necesidad del equipo.

El repositorio queda listo para versionarse en GitHub, con estructura clara, comandos documentados y ejemplos de configuraci�n reproducibles.
