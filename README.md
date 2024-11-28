# Juno Assignment - Task Management with NestJS + ReactJS

This is a full-stack app with a backend (PostgreSQL) and frontend. The backend uses Docker for PostgreSQL.

## Prerequisites
- Node.js (with npm)
- Yarn (for backend)
- Docker (for PostgreSQL)

## 1. Clone the Repo

git clone https://github.com/your-username/juno-assignment.git

cd juno-assignment

## 2. Backend Setup


### 2.1 Install Dependencies

cd backend

yarn install

### 2.2 Configure .env.stage.dev


Create .env.stage.dev in backend/:

env


STAGE=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
ADMIN_PASSWORD=

### 2.3 Run Docker

docker-compose up -d


### 2.4 Start Backend Server
bash
Copy code
yarn start
Backend runs at http://localhost:3000.

## 3. Frontend Setup
### 3.1 Install Dependencies

cd frontend

npm install

### 3.2 Configure .env
Create .env in frontend/:

env

VITE_API_URL=http://localhost:3000

### 3.3 Start Frontend Server

npm run dev

Frontend runs at http://localhost:5173.

## 4. Database Setup with Docker
Run Docker containers:

docker-compose up -d
PostgreSQL: localhost:5432
pgAdmin: localhost:3001
Email: user@domain.com, Password: secret

