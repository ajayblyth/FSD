# Docker Test App

A simple Dockerized **Node.js + Express + MongoDB** application demonstrating containerization using Docker Compose.

---

## Repository

**GitHub**

https://github.com/ajayblyth/docker-testapp

**Docker Hub**

https://hub.docker.com/r/ajayblyth/testapp

---

## Features

- REST API built with Node.js and Express
- MongoDB database
- Mongo Express web interface
- Dockerized application
- Docker Compose support
- Ready-to-run Docker image from Docker Hub

---

## Project Structure

.
├── app.js
├── package.json
├── Dockerfile
├── compose.yaml
└── README.md

---

## Prerequisites

- Docker Desktop

Verify installation:

docker -v
docker compose version

---

## Clone the Repository

git clone https://github.com/ajayblyth/docker-testapp.git

cd docker-testapp

---

## Run Using Docker Compose

Start all services:

docker compose up -d

This will start:

- Node.js Application
- MongoDB
- Mongo Express

---

## Alternatively, Pull the Application Image

If you only want the application image:


docker pull ajayblyth/testapp:latest

The repository already includes a ready-to-use `compose.yaml` file, so after cloning the repository simply run:

docker compose up -d

---

## Access the Application

### Node.js Application

http://localhost:5050

### Mongo Express

http://localhost:8081

---

## API Endpoints

### Home

```http
GET /

### Get All Users

```http
GET /users

### Create User

```http
POST /users

Example Request Body:

```json
{
  "name": "Ajay",
  "email": "ajay@example.com"
}

---

## Stop the Application

docker compose down


## Docker Images Used

- `ajayblyth/testapp:latest`
- `mongo`
- `mongo-express`

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongo Express
- Docker
- Docker Compose

---

## Author

**Ajay Sharma**

GitHub: https://github.com/ajayblyth