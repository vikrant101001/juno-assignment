# Juno Assignment - Full Stack App

This is a full-stack app with a backend (PostgreSQL) and frontend. The backend uses Docker for PostgreSQL.

## Prerequisites
- Node.js (with npm)
- Yarn (for backend)
- Docker (for PostgreSQL)

## 1. Clone the Repo

git clone https://github.com/your-username/juno-assignment.git
cd juno-assignment

##2. Backend Setup
2.1 Install Dependencies
bash
Copy code
cd backend
yarn install
2.2 Configure .env.stage.dev
Create .env.stage.dev in backend/:

env
Copy code
STAGE=1
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=task-management
JWT_SECRET=secret
ADMIN_PASSWORD=Admin10$$
2.3 Run Docker
bash
Copy code
docker-compose up -d
2.4 Start Backend Server
bash
Copy code
yarn start
Backend runs at http://localhost:3000.

##3. Frontend Setup
3.1 Install Dependencies
bash
Copy code
cd frontend
npm install
3.2 Configure .env
Create .env in frontend/:

env
Copy code
VITE_API_URL=http://localhost:3000
3.3 Start Frontend Server
bash
Copy code
npm run dev
Frontend runs at http://localhost:5173.

#34. Database Setup with Docker
Run Docker containers:

bash
Copy code
docker-compose up -d
PostgreSQL: localhost:5432
pgAdmin: localhost:3001
Email: user@domain.com, Password: secret
