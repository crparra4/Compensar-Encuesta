# 📋 Compensar – Sistema de Encuestas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Sistema web de gestión de encuestas con autenticación por roles. Permite a administradores crear y gestionar encuestas, y a usuarios responderlas desde una interfaz intuitiva.

---

## 🚀 Características

### 👤 Rol Usuario
- Inicio de sesión con credenciales propias
- Visualización y selección de encuestas disponibles
- Resolución de encuestas (preguntas abiertas, Sí/No, opción múltiple)
- Edición de perfil *(en desarrollo)*

### 🛠️ Rol Administrador
- Creación de encuestas con distintos tipos de preguntas:
  - ✅ Opción múltiple
  - ✅ Sí / No
  - ✅ Pregunta abierta
- Panel de gestión: editar, eliminar o desactivar encuestas
- Visualización de respuestas por encuesta *(en desarrollo)*
- Panel de métricas y estadísticas *(en desarrollo)*
- Edición de perfil de administrador

---

## 🧱 Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Frontend | React + Vite |
| Backend | Node.js (API REST propia) |
| Base de datos | PostgreSQL |

---

## 📁 Estructura del proyecto

```
compensar/
├── client/          # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
├── server/          # API REST Node.js
│   ├── routes/
│   ├── controllers/
│   └── ...
└── README.md
```

> ⚠️ *Ajusta la estructura anterior según cómo esté organizado tu proyecto real.*

---

## ⚙️ Instalación y uso local

### Prerrequisitos
- Node.js >= 18
- PostgreSQL instalado y corriendo
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/compensar.git
cd compensar
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta del servidor basándote en el ejemplo:

```bash
cp server/.env.example server/.env
```

Edita el `.env` con tus credenciales de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=compensar_db
JWT_SECRET=tu_clave_secreta
PORT=3000
```

### 3. Instalar dependencias

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Configurar la base de datos

```bash
# Crea la base de datos en PostgreSQL
psql -U tu_usuario -c "CREATE DATABASE compensar_db;"

# Ejecuta las migraciones (si las tienes)
cd server
npm run migrate
```

### 5. Iniciar el proyecto

```bash
# Iniciar backend (desde /server)
npm run dev

# Iniciar frontend (desde /client)
npm run dev
```

Abre tu navegador en `http://localhost:5173`

---

## 🔐 Credenciales de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Administrador | admin@compensar.com | *(definir)* |
| Usuario | user@compensar.com | *(definir)* |

> 🔒 Reemplaza con credenciales reales de seed o elimina esta sección si no aplica.

---

## 📌 Estado del proyecto

| Módulo | Estado |
|--------|--------|
| Login / Autenticación | ✅ Listo |
| Roles (Admin / Usuario) | ✅ Listo |
| Crear encuestas | ✅ Listo |
| Resolver encuestas | ✅ Listo |
| Gestión de encuestas (editar/eliminar) | ✅ Listo |
| Ver respuestas por encuesta | 🔧 En desarrollo |
| Panel de métricas | 🔧 En desarrollo |
| Edición de perfil (usuario) | 🔧 En desarrollo |

---

## 🤝 Contribuciones

Este es un proyecto de prueba personal. Si deseas sugerir mejoras, abre un *issue* o un *pull request*.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

> Desarrollado con 💙 como proyecto de práctica full-stack.