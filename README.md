Employee Management System – Microservices with Docker

This project is a full-stack **Employee Management System** built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It includes an **Admin Dashboard** for managing employee records such as names, departments, roles, and access tokens.

The app is fully containerized using **Docker**, demonstrating a microservices architecture with frontend, backend, and database services running in isolated containers on a shared Docker network.

---

## Architecture Overview


+------------------------+           +-------------------------+           +-----------------------+
|                        |  HTTP     |                         |  Mongoose |                       |
|   React Frontend App   +---------->+  Node.js Express API    +---------->+     MongoDB Database   |
|  (Admin Dashboard UI)  |           |  (RESTful Microservice) |           |   (Employee Records)  |
+------------------------+           +-------------------------+           +-----------------------+
        Port: 3000                        Port: 5000                        Port: 27017 (default)
        Container: frontend              Container: backend                Container: mongo


Each service is dockerized independently and connected through a custom Docker network (`ems-network`).

---

## Tech Stack

- **Frontend**: React (Admin Dashboard UI)
- **Backend**: Node.js with Express (REST API)
- **Database**: MongoDB
- **Docker**: Multi-container setup with custom Dockerfiles and health checks
- **Docker Hub**: Public images hosted on Docker Hub

---

## 🚀 Getting Started Locally (Manual Docker Setup)

> Make sure Docker is installed on your machine.

### 1. Create a custom network:
```bash
docker network create ems-network

docker volume create mongo-data

docker run -d --name mongo-container \
  --network ems-network \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=example \
  mongo

  cd server
docker build -t ems-server .
docker run -d --name backend-container \
  --network ems-network \
  -p 5000:5000 ems-server

  cd ../client
docker build -t ems-client .
docker run -d --name frontend-container \
  --network ems-network \
  -p 3000:80 ems-client


server: http://localhost:3000


To demonstrate Docker's advanced features, I implemented a HEALTHCHECK in the backend container. This health check pings a custom /health endpoint every 30 seconds to monitor if the Node.js API is responsive.

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

Additionally, logs can be monitored in real time using:
docker logs backend-container
docker logs frontend-container


