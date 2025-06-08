# pharmashopping e-commerce

## Características

- Registro y login de usuarios con autenticación mediante JWT
- Gestión de productos con características como precio, descripción, imagen y stock
- Roles: clientes, admin, superadmin
- Gestión de pedidos con estado
- Gestión de usuarios y órdenes
- Carrito de compras y checkout
- Panel de administración con control de acceso por rol
- Actualización automática de stock al realizar compras


## Tecnologías

- **Frontend:** React, Vite, Bootstrap, Context API
- **Backend:** Node.js, Express, Sequelize, JWT, bcryptjs
- **Base de datos:** sqlite

## Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/JuliMeier/pharmaEcommerce.git
cd pharmaEcommerce
```

### 2. Instala dependencias

#### Frontend

```bash
cd frontend
npm install
```
#### Backend

```bash
cd ../backend
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```
JWT_SECRET=tu_palabra_secreta
PORT=4000

```

### 4. Inicia el backend

```bash
npm run dev
```

### 5. Ejecuta los seeders 

Asegúrate de tener la base de datos creada y ejecuta los el siguiente script de seeders para poblarla.

` node backend/seeders/seedAll.js `

### 6. Inicia el frontend

```bash
cd ../frontend
npm run dev
```

## Uso

- Accede a `http://localhost:5173` para el frontend.
- Accede a `http://localhost:4000/api` para el backend.

## Estructura del proyecto

```
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    ...
frontend/
  src/
    components/
    context/
    pages/
    routes/
    ...

```
## Notas

- Solo los usuarios con rol `admin` o `superadmin` pueden acceder al panel de administración.
- Solo el `superadmin` puede crear, editar o eliminar usuarios.
