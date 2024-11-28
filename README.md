
Juno Assignment - Full Stack Application
This project is a full-stack application consisting of a backend and frontend. The backend uses PostgreSQL for the database, which is run via Docker.

Prerequisites
Make sure you have the following installed:

Node.js (with npm)
Yarn (for backend)
Docker (for PostgreSQL and pgAdmin)
1. Clone the Repository
Clone the repository using the following command:

bash
Copy code
git clone https://github.com/your-username/juno-assignment.git
Navigate into the project directory:

bash
Copy code
cd juno-assignment
2. Backend Setup
2.1 Install Dependencies
Navigate to the backend folder:

bash
Copy code
cd backend
Run the following command to install the required dependencies:

bash
Copy code
yarn install
2.2 Configure Environment Variables
Make sure you have a .env file in the backend folder. Create a .env.stage.dev file with the following content (this is an example setup):

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
Note: If you are using Docker, ensure the DB_HOST is set to localhost when running locally or postgres (the Docker container name) when accessing from the backend running inside the container.

2.3 Docker Setup for PostgreSQL
To run PostgreSQL and pgAdmin in Docker, navigate to the root of your project directory and run the following:

bash
Copy code
docker-compose up -d
This will start PostgreSQL and pgAdmin in the background. By default, the services will be accessible at:

PostgreSQL: localhost:5432
pgAdmin: localhost:3001
You can access pgAdmin using the credentials defined in docker-compose.yml:

Email: user@domain.com
Password: secret
2.4 Start the Backend Server
Run the following command to start the backend server:

bash
Copy code
yarn start
The backend will now be running at http://localhost:3000.

3. Frontend Setup
3.1 Install Dependencies
Navigate to the frontend folder:

bash
Copy code
cd frontend
Run the following command to install the required dependencies:

bash
Copy code
npm install
3.2 Configure Environment Variables
Make sure you have a .env file in the frontend folder. Here's an example .env file structure:

env
Copy code
VITE_API_URL=http://localhost:3000 # Backend API URL
3.3 Start the Frontend Server
Run the following command to start the frontend server:

bash
Copy code
npm run dev
The frontend will now be running at http://localhost:5173.

4. Database Setup with Docker
To run PostgreSQL and pgAdmin locally, you’ll need to have Docker installed. If you don't have it yet, you can install Docker from here.

Run the following command to start the required Docker containers:

bash
Copy code
docker-compose up -d
This will run:

PostgreSQL on localhost:5432
pgAdmin on localhost:3001
pgAdmin Setup
You can access pgAdmin by visiting http://localhost:3001 in your browser. Use the following login credentials:

Email: user@domain.com
Password: secret
Once logged in to pgAdmin, you can create a new connection to your PostgreSQL database using the following credentials:

Host: localhost
Port: 5432
Username: postgres
Password: postgres
Database: task-management
5. Usage
Once both the backend and frontend are running, you can open the frontend at http://localhost:5173 in your browser, which will communicate with the backend API running at http://localhost:3000.

6. Troubleshooting
If you encounter any issues, check the following:

Ensure your .env files are properly configured.
Make sure Docker is running and the containers are up (docker-compose ps).
Verify the backend and frontend are running on different ports.
7. License
This project is licensed under the MIT License - see the LICENSE file for details.
