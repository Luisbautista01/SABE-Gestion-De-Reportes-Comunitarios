# SABE - Gestion de Reportes Comunitarios

<p align="center">
  <img src="sabe-frontend/public/sabe.jpg" alt="Logo de SABE" width="220">
</p>

## Descripcion General

SABE es una plataforma web para registrar, gestionar y hacer seguimiento a reportes comunitarios. La aplicacion conecta a ciudadanos, funcionarios y administradores en un flujo organizado para atender incidencias relacionadas con infraestructura, medio ambiente, seguridad y servicios publicos.

El sistema esta dividido en dos aplicaciones:

- **sabe-backend**: API REST construida con Spring Boot, Spring Security, JPA y PostgreSQL.
- **sabe-frontend**: interfaz web construida con React, Vite, Tailwind CSS y Axios.

## Objetivo Del Proyecto

Facilitar la comunicacion entre la ciudadania y la administracion municipal mediante una herramienta digital que permita:

- Registrar reportes comunitarios.
- Consultar el estado de los casos.
- Clasificar incidencias por categoria.
- Asignar reportes a funcionarios.
- Actualizar estados y dejar trazabilidad.
- Visualizar estadisticas administrativas.

## Equipo De Desarrollo

### Desarrollador Principal

**Luis Bautista**

### Proyecto

SABE - Gestion de Reportes Comunitarios

### Repositorio

[Luisbautista01/SABE-Gestion-De-Reportes-Comunitarios](https://github.com/Luisbautista01/SABE-Gestion-De-Reportes-Comunitarios)

## Modulos Principales

### Autenticacion Y Seguridad

El backend implementa autenticacion con JWT y control de acceso por roles.

Roles disponibles:

- **CIUDADANO**: registra reportes y consulta sus casos.
- **FUNCIONARIO**: consulta reportes asignados y actualiza estados.
- **ADMINISTRADOR**: administra reportes, usuarios, asignaciones y estadisticas.

### Gestion De Reportes

Permite crear reportes comunitarios con informacion como categoria, descripcion, ubicacion, evidencia y estado actual. Cada reporte puede tener actualizaciones para mantener una trazabilidad clara.

### Catalogos

El sistema inicializa categorias y estados base para clasificar los reportes:

- Infraestructura
- Medio ambiente
- Seguridad
- Servicios publicos

### Paneles Por Rol

El frontend incluye vistas protegidas segun el rol del usuario:

- `/ciudadano`
- `/funcionario`
- `/admin`

Rutas publicas de acceso:

- `/login`: inicio de sesion y acceso demo administrador.
- `/registro/ciudadano`: registro publico para ciudadanos.
- `/registro/funcionario`: registro publico para funcionarios.

Antes de completar el registro, la interfaz solicita aceptacion de tratamiento de datos personales, uso de cookies tecnicas y una validacion captcha simple.

## Tecnologias Utilizadas

### Backend

- Java 17
- Spring Boot 3.5
- Spring Web
- Spring Security
- Spring Data JPA
- Bean Validation
- PostgreSQL
- Lombok
- Springdoc OpenAPI
- Gradle

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- React Icons

## Estructura Del Proyecto

```text
.
├── sabe-backend/
│   ├── src/main/java/co/edu/unicartagena/sabe/
│   │   ├── application/
│   │   ├── domain/
│   │   └── infrastructure/
│   ├── src/main/resources/
│   └── build.gradle
├── sabe-frontend/
│   ├── public/
│   ├── src/
│   │   ├── core/
│   │   ├── features/
│   │   ├── infrastructure/
│   │   └── shared/
│   └── package.json
└── README.md
```

## Requisitos Previos

- Java 17 o superior
- Node.js 20 o superior
- npm
- PostgreSQL
- Git

## Configuracion Del Backend

Crear una base de datos PostgreSQL:

```sql
CREATE DATABASE sabe_db;
```

Configurar las variables de entorno recomendadas:

```powershell
$env:SABE_JWT_SECRET="cambiar-por-un-secreto-seguro"
$env:SABE_JWT_EXPIRATION_MINUTES="480"
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/sabe_db"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="tu-password"
$env:CLOUDINARY_CLOUD_NAME="tu-cloud-name"
$env:CLOUDINARY_API_KEY="tu-api-key"
$env:CLOUDINARY_API_SECRET="tu-api-secret"
$env:CLOUDINARY_URL="cloudinary://api-key:api-secret@cloud-name"
$env:CLOUDINARY_FOLDER="sabe"
```

La configuracion principal esta en:

```text
sabe-backend/src/main/resources/application.properties
```

Por defecto el backend usa:

```text
http://localhost:8081
```

## Ejecutar El Backend

```powershell
cd sabe-backend
.\gradlew.bat bootRun
```

## Ejecutar Pruebas Del Backend

```powershell
cd sabe-backend
.\gradlew.bat test
```

## Configuracion Del Frontend

El frontend consume la API desde:

```text
http://localhost:8081/api
```

Para cambiar la URL del backend, crear un archivo `.env` en `sabe-frontend`:

```text
VITE_API_URL=http://localhost:8081/api
```

## Ejecutar El Frontend

```powershell
cd sabe-frontend
npm install
npm run dev
```

Vite puede iniciar en `5173` o en otro puerto disponible, por ejemplo:

```text
http://localhost:5174
```

## Construir El Frontend

```powershell
cd sabe-frontend
npm run build
```

## Endpoints Principales

### Autenticacion

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/recover`
- `GET /api/auth/me`
- `POST /api/auth/users`

### Reportes

- `POST /api/reportes`
- `GET /api/reportes`
- `GET /api/reportes/mis-reportes`
- `GET /api/reportes/{id}`
- `PATCH /api/reportes/{id}/estado`
- `PATCH /api/reportes/{id}/asignar`
- `GET /api/reportes/{id}/actualizaciones`

### Catalogos Y Administracion

- `GET /api/catalogos/categorias`
- `GET /api/catalogos/estados`
- `GET /api/admin/estadisticas`
- `GET /api/notificaciones`

## Usuarios De Demostracion

Al iniciar el backend, se crean usuarios base si no existen:

| Rol | Correo | Contrasena |
| --- | --- | --- |
| Administrador | `admin@sabe.gov.co` | `Sabe1234` |
| Funcionario | `funcionario@sabe.gov.co` | `Sabe1234` |
| Ciudadano | `ciudadano@sabe.gov.co` | `Sabe1234` |

## Documentacion OpenAPI

Con el backend en ejecucion:

```text
http://localhost:8081/swagger-ui.html
```

## Notas De Seguridad

- No subir archivos `.env` al repositorio.
- No publicar secretos reales de JWT, base de datos o Cloudinary.
- Cambiar las credenciales demo antes de usar el sistema en produccion.
- Usar un secreto JWT robusto en despliegues reales.

## Estado De Verificacion

Comandos verificados localmente:

```powershell
cd sabe-backend
.\gradlew.bat compileJava
.\gradlew.bat test
```

Resultado:

```text
BUILD SUCCESSFUL
```
