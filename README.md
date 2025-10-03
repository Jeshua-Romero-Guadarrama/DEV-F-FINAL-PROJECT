# PawMatch Platform

La plataforma PawMatch impulsa la adopción responsable y habilita una tienda solidaria para mascotas. El repositorio adopta un monorepo que coordina la API de servicios, la guía de cuidados y una experiencia web diferenciada entre usuarios adoptantes y administradores.

## Contenido
- [Arquitectura general](#arquitectura-general)
- [Perfil de usuarios](#perfil-de-usuarios)
- [Credenciales de ejemplo](#credenciales-de-ejemplo)
- [Tecnologías clave](#tecnologías-clave)
- [Inicio rápido](#inicio-rápido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Pruebas](#pruebas)
- [API PawMatch](#api-pawmatch)
- [Frontend web](#frontend-web)
- [Arquitectura aplicada](#arquitectura-aplicada)
- [Calidad y buenas prácticas](#calidad-y-buenas-prácticas)

## Arquitectura general
El repositorio organiza sus aplicaciones bajo el directorio pps/ siguiendo un monorepo modular.

`	ext
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
    tests/               # Pruebas Vitest + Supertest
    vitest.config.js
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
      tests/             # Pruebas de componentes con Testing Library + Vitest
    vitest.config.js
    package.json
package.json            # Scripts orquestados para las aplicaciones
`

## Perfil de usuarios
- **Usuarios adoptantes (rol doptante o oluntario)**: acceden a la página pública (/), listado de adopciones, tienda y guía de cuidados. El enlace a “Administración” no aparece para cuentas sin permisos.
- **Administradores (rol dmin)**: además de la experiencia pública, ven el enlace “Administración” en el menú y acceden al panel /admin con métricas de pedidos, leads y filtros por estado. Desde el inicio de sesión pueden usar credenciales maestras sin registrar una cuenta previa.

## Credenciales de ejemplo
Puedes definir las credenciales maestras en variables de entorno; si no se definen, se usan los siguientes valores por defecto para pruebas locales:

| Tipo de cuenta | Correo | Contraseña |
| --- | --- | --- |
| Administrador (maestro) | dmin@pawmatch.com | PawMatch#2025 |
| Usuario general demo | demo@pawmatch.com | Demo123! |

> El usuario general puede crearse desde /register o importarse manualmente en la base de datos. El administrador maestro no requiere registro previo: el backend valida la cuenta y tras iniciar sesión te redirige automáticamente al panel.

## Tecnologías clave
- **API**: Node.js 20+, Express 5, Mongoose 8, JWT, Nodemailer, Helmet, CORS, Vitest + Supertest.
- **Frontend**: React 19, React Router 7, Vite 7, Tailwind CSS 3, React Icons, Vitest + Testing Library.
- **Calidad**: ESLint en cada app, configuración Prettier friendly.

## Inicio rápido
1. **Requisitos**: Node.js 20 o superior y MongoDB accesible.
2. **Instalación de dependencias**:
   `ash
   npm install --prefix apps/api
   npm install --prefix apps/web
   `
3. **Variables de entorno**: duplica pps/api/.env.example como .env y ajusta MONGO_URI, JWT_SECRET, SMTP_*. Para personalizar credenciales maestras del frontend define:
   `ash
   VITE_ADMIN_EMAIL=admin@pawmatch.com
   VITE_ADMIN_PASSWORD=PawMatch#2025
   `
4. **Ejecución local**:
   `ash
   npm run dev:api
   npm run dev:web
   `
5. **Producción mínima**:
   `ash
   npm run start:api
   npm run build:web
   npm --prefix apps/web run preview
   `

## Variables de entorno
| Variable | Descripción | Predeterminado |
| --- | --- | --- |
| PORT | Puerto expuesto por Express | 4000 |
| API_PREFIX | Prefijo común para rutas REST | /api/v1 |
| MONGO_URI | Cadena de conexión a MongoDB | mongodb://127.0.0.1:27017 |
| MONGO_DB | Nombre de base de datos | pawmatch |
| JWT_SECRET | Clave para firmar tokens JWT | supersecret |
| JWT_EXPIRES_IN | Validez del token | 7d |
| BCRYPT_SALT_ROUNDS | Rondas de bcrypt | 10 |
| CORS_ORIGINS | Comma list de orígenes permitidos | http://localhost:5173 |
| SMTP_* | Configuración de correo (opcional) | vacío |
| VITE_ADMIN_EMAIL | Correo maestro (frontend) | dmin@pawmatch.com |
| VITE_ADMIN_PASSWORD | Contraseña maestra (frontend) | PawMatch#2025 |

## Scripts disponibles
| Script | Propósito |
| --- | --- |
| 
pm run dev:api | Inicia la API en modo desarrollo con Nodemon |
| 
pm run start:api | Inicia la API en modo producción |
| 
pm run lint:api | Ejecuta ESLint sobre pps/api |
| 
pm run dev:web | Levanta Vite con hot reload |
| 
pm run build:web | Construye el frontend para distribución |
| 
pm run lint:web | Ejecuta ESLint sobre pps/web |
| 
pm run test:api | Ejecuta Vitest + Supertest en la API |
| 
pm run test:web | Ejecuta Vitest + Testing Library en el frontend |
| 
pm test | Corre pruebas de API y web en cadena |

## Pruebas
- **Backend** (pps/api/tests/pets.routes.test.js):
  - Verifica el endpoint /health.
  - Comprueba que /api/v1/pets/seeds devuelve al menos un ejemplo (Toby) con campos esenciales.
  - Configuración en pps/api/vitest.config.js.
- **Frontend** (pps/web/src/tests/Navbar.test.jsx):
  - Comprueba que el enlace “Administración” sólo aparece para cuentas con rol dmin.
  - Configuración en pps/web/vitest.config.js y src/tests/setupTests.js.

Ejecuta desde la raíz:
`ash
npm run test:api
npm run test:web
`

## API PawMatch
- **Salud**: GET /health devuelve estado del servicio.
- **Autenticación** (/api/v1/auth): registro, login y perfil autenticado. El frontend reconoce credenciales maestras definidas en las variables VITE_ADMIN_*.
- **Mascotas** (/api/v1/pets y /api/v1/pets/seeds): listado/CRUD protegido para admins y semillas de ejemplo (Toby) cuando la colección está vacía.
- **Productos** (/api/v1/products): catálogo solidario con filtros por categoría y estado.
- **Solicitudes de adopción** (/api/v1/requests): gestión de solicitudes, timeline y notificaciones.
- **Pedidos** (/api/v1/orders): creación por usuarios autenticados; consulta/actualización restringida a administradores.
- **Leads de guía** (/api/v1/leads): formulario público y consulta para admins.

## Frontend web
- HomePage: carrusel principal y landing corporativa.
- AdoptionsPage: filtros, tarjeta de mascotas, historias, CTA a registro; usa semillas si la API aún no tiene datos.
- PetDetailPage: perfil con galería, detalles clave y CTA directa al formulario.
- AdoptionFormPage: flujo en tres pasos para completar datos personales, vivienda y contrato.
- StorePage: hero, combos, beneficios, testimonios y carrito conectado a órdenes.
- CareGuidePage: formulario para leads que alimenta /leads.
- RegisterPage / LoginPage: autenticación con persistencia en contexto; el login detecta credenciales maestras y redirige al panel administrativo.
- AdminDashboardPage: métricas de pedidos y leads, filtros por estado y mensajes diferenciados según rol.

## Arquitectura aplicada
PawMatch adopta una **arquitectura monorepo modular**:
- **Backend**: monolito organizado por dominios (auth, pets, products, requests, orders, leads) con capas explícitas de configuración, middlewares, módulos y utilitarios.
- **Frontend**: SPA con React Router, contextos globales (AuthProvider, CartProvider), servicios HTTP y módulos especializados (adopciones, tienda, formulario). Los componentes se diseñaron con acentos correctos y layout responsivo siguiendo tu guía UI.
- **Coordinación**: el monorepo (npm workspaces) facilita scripts centralizados, pruebas y despliegue conjunto.

## Calidad y buenas prácticas
- ESLint en ambas aplicaciones garantiza estilo consistente.
- Se ignoran 
ode_modules, archivos .env y compilados mediante .gitignore.
- Ejecuta 
pm run lint:web y 
pm run lint:api antes de subir cambios.
- Puedes añadir pruebas adicionales en pps/api/tests y pps/web/src/tests para nuevos módulos.

Con esta estructura tienes la experiencia para adoptantes y el panel administrativo claramente separados, con pruebas básicas listas para expandirse y documentación alineada al nuevo flujo.