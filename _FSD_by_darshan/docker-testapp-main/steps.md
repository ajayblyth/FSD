3. Pull images (optional)
docker pull mongo
docker pull mongo-express

You don't pull your app, because you build it from your Dockerfile:

docker build -t testapp .

or

docker compose build

4. Start everything
docker compose up

Docker Compose will:

Build the node-app image (if needed).
Pull mongo if it's missing.
Pull mongo-express if it's missing.
Create all three containers.
Create the network.
Start all three.

===================================
STEP 4 — Test locally
After modifying HTML,

we had to verify everything.

Started MongoDB

docker run ...
Then

npm start
Why?

Because Node connects to MongoDB.

Without MongoDB,

Node cannot start.

Earlier we got

ECONNREFUSED
because no MongoDB server was running.

After starting Mongo,

Node successfully connected.

STEP 5 — Test in browser
Opened

localhost:5050
Tested POST

↓

Inserted a user.

Clicked

Show Users
↓

GET API returned all users.

Now the assignment's

"Wire up GET"

was complete.

Why did we NOT Dockerize immediately?
The assignment itself says

First: finish the app code.

So the correct order is

Finish application

↓

Verify application

↓

Dockerize

====================

Dockerfile is a text file containing instructions to build a Docker image. It starts from a base image (like node:22-alpine) and adds our application code, dependencies, configuration, and startup command to create a custom image.

# Use the official Node.js version 22 image based on Alpine Linux.
# Alpine is a very small Linux distribution, so the image is lightweight.
FROM node:22-alpine

//Download from Docker Hub


# Set the working directory inside the container.
# All following commands (COPY, RUN, CMD, etc.) execute from /testapp.
WORKDIR has nothing to do with your project folder on your local machine.
It refers to a directory inside the image/container's filesystem.

WORKDIR /testapp



# Copy package.json and package-lock.json (if present) into the container.
# We copy these first so Docker can cache the npm install layer.
COPY package*.json ./

# Install all project dependencies listed in package.json.
# This runs only when package.json changes (thanks to Docker cache).
RUN npm install

# Copy the remaining project files (server.js, routes, public, etc.)from the current host directory into the container's /testapp folder.
COPY . .

# Inform Docker that this container will listen on port 5050.
# This is documentation/metadata only; it does not publish the port.
EXPOSE 5050

# Default command executed when the container starts.
# Runs the Node.js application by executing server.js.
CMD ["node", "server.js"]

------------------------
STEP 11 — Build Node image
Next we'll run

docker build -t testapp .
Why?

The Dockerfile is just instructions.

docker build executes those instructions and creates an image.



-==========================

===============================================================================
DOCKERIZING A NODE.JS APPLICATION WITH MONGODB & DOCKER COMPOSE
===============================================================================

Step 0 - Create the Node Application
Create the Express application.

mkdir docker-testapp
cd docker-testapp

npm init -y

npm install express mongodb
Create

app.js
package.json
index.html
Run

node app.js
Test

http://localhost:5050


===============================================================================
STEP 1 - Dockerize the Node Application
===============================================================================

1. Create a Dockerfile

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["node","app.js"]


-------------------------------------------------------------------------------
Build Image
-------------------------------------------------------------------------------

docker build -t testapp .

Explanation:
- Reads the Dockerfile.
- Downloads the base image if not already present.
- Executes each instruction.
- Creates a Docker Image named "testapp".

-------------------------------------------------------------------------------
Check Images
-------------------------------------------------------------------------------

docker images

Lists all Docker images available on your machine.

-------------------------------------------------------------------------------
Run Container
-------------------------------------------------------------------------------

docker run -d -p 5050:5050 testapp

Explanation:

-d
Run container in detached (background) mode.

-p 5050:5050
Maps

Host Port      -> Container Port
5050           -> 5050

testapp
Image name.

-------------------------------------------------------------------------------
Check Running Containers
-------------------------------------------------------------------------------

docker ps

-------------------------------------------------------------------------------
Open Application
-------------------------------------------------------------------------------

http://localhost:5050


===============================================================================
STEP 2 - Add MongoDB
===============================================================================

Run MongoDB Container

docker run -d ^
--name mongo ^
-p 27017:27017 ^
-e MONGO_INITDB_ROOT_USERNAME=root ^
-e MONGO_INITDB_ROOT_PASSWORD=qwert ^
mongo


Explanation

--name mongo
Container name.

-p 27017:27017
Expose MongoDB port.

-e MONGO_INITDB_ROOT_USERNAME=root
Create MongoDB admin username.

-e MONGO_INITDB_ROOT_PASSWORD=qwert
Create MongoDB admin password.

mongo
Official MongoDB image from Docker Hub.

-------------------------------------------------------------------------------
Check Running Containers
-------------------------------------------------------------------------------

docker ps


===============================================================================
STEP 3 - Add Mongo Express
===============================================================================

Run

docker run -d ^
--name mongo-express ^
-p 8081:8081 ^
-e ME_CONFIG_MONGODB_ADMINUSERNAME=root ^
-e ME_CONFIG_MONGODB_ADMINPASSWORD=qwert ^
-e ME_CONFIG_MONGODB_URL=mongodb://root:qwert@host.docker.internal:27017/ ^
mongo-express

Explanation

--name mongo-express
Container name.

-p 8081:8081
Expose Mongo Express web interface.

ME_CONFIG_MONGODB_ADMINUSERNAME=root
MongoDB username.

ME_CONFIG_MONGODB_ADMINPASSWORD=qwert
MongoDB password.

ME_CONFIG_MONGODB_URL
Connection string used by Mongo Express.

host.docker.internal
Allows a Docker container to reach services running on the host machine.

-------------------------------------------------------------------------------
Open Mongo Express
-------------------------------------------------------------------------------

http://localhost:8081


===============================================================================
CURRENT STATUS
===============================================================================

We now have three separate containers.

1. Node App

2. MongoDB

3. Mongo Express

Managing all three individually becomes difficult because each requires a
separate docker run command.

Docker Compose solves this problem.


===============================================================================
STEP 4 - Docker Compose
===============================================================================

Create

compose.yaml


Contents

services:

  mongo:
    image: mongo
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=qwert

  mongo-express:
    image: mongo-express
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: qwert
      ME_CONFIG_MONGODB_URL: mongodb://root:qwert@mongo:27017/

  node-app:
    image: ajayblyth/testapp:latest
    ports:
      - 5050:5050
    environment:
      - MONGO_DB_HOST=mongo
    depends_on:
      - mongo


===============================================================================
Run Everything
===============================================================================

docker compose up -d

Creates and starts all services defined inside compose.yaml.

-------------------------------------------------------------------------------
Stop Everything
-------------------------------------------------------------------------------

docker compose down

Stops and removes all containers created by Compose.

-------------------------------------------------------------------------------
Check Running Containers
-------------------------------------------------------------------------------

docker ps


===============================================================================
UNDERSTANDING compose.yaml
===============================================================================

Every Compose file starts with

services:

Think of it as saying:

"The following containers should be created."

Everything under services represents one container.


===============================================================================
MONGO SERVICE
===============================================================================

mongo:

Creates a container named "mongo".

-------------------------------------------------------------------------------
image: mongo
-------------------------------------------------------------------------------

Uses the official MongoDB image from Docker Hub.

Equivalent Docker command

docker run mongo

-------------------------------------------------------------------------------
ports:
-------------------------------------------------------------------------------

27017:27017

Maps

Host Port        -> Container Port

27017            -> 27017

Applications running on your computer can now access MongoDB.

-------------------------------------------------------------------------------
environment:
-------------------------------------------------------------------------------

- MONGO_INITDB_ROOT_USERNAME=root

Creates

Username = root

- MONGO_INITDB_ROOT_PASSWORD=qwert

Creates

Password = qwert

Equivalent Docker command

docker run \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=qwert \
mongo


===============================================================================
MONGO EXPRESS SERVICE
===============================================================================

mongo-express:

Creates another container.

-------------------------------------------------------------------------------
image: mongo-express
-------------------------------------------------------------------------------

Uses the official Mongo Express image.

-------------------------------------------------------------------------------
ports:
-------------------------------------------------------------------------------

8081:8081

Open

http://localhost:8081

-------------------------------------------------------------------------------
Environment Variables
-------------------------------------------------------------------------------

ME_CONFIG_MONGODB_ADMINUSERNAME: root

Username used to connect to MongoDB.

------------------------------------------------

ME_CONFIG_MONGODB_ADMINPASSWORD: qwert

Password used to connect to MongoDB.

------------------------------------------------

ME_CONFIG_MONGODB_URL:

mongodb://root:qwert@mongo:27017/

This tells Mongo Express how to reach MongoDB.

-------------------------------------------------------------------------------
Breaking Down the URL
-------------------------------------------------------------------------------

mongodb://

Protocol.

------------------------------------------------

root

Username.

------------------------------------------------

qwert

Password.

------------------------------------------------

mongo

NOT localhost.

Docker Compose automatically creates an internal network where services can
communicate using service names.

Since the MongoDB service is named "mongo", every other container can connect
using

mongo

instead of an IP address.

------------------------------------------------

27017

MongoDB port.


===============================================================================
NODE APPLICATION SERVICE
===============================================================================

node-app:

Creates the Node.js container.

-------------------------------------------------------------------------------
image: ajayblyth/testapp:latest
-------------------------------------------------------------------------------

Instead of building locally, Compose downloads your image from Docker Hub.

Equivalent command

docker pull ajayblyth/testapp:latest

-------------------------------------------------------------------------------
ports:
-------------------------------------------------------------------------------

5050:5050

Maps

Host Port        -> Container Port

5050             -> 5050

Access application

http://localhost:5050

-------------------------------------------------------------------------------
environment:
-------------------------------------------------------------------------------

- MONGO_DB_HOST=mongo

Creates the environment variable

MONGO_DB_HOST=mongo

Inside Node.js

const host = process.env.MONGO_DB_HOST;

Your application connects using

mongodb://root:qwert@mongo:27017

Again,

mongo

is the service name.

Docker's internal DNS automatically resolves

mongo

to the MongoDB container.

-------------------------------------------------------------------------------
depends_on:
-------------------------------------------------------------------------------

depends_on:
  - mongo

Meaning

Start the mongo service before starting node-app.

Important

This only controls startup order.

It DOES NOT guarantee MongoDB is fully ready to accept connections.

In production, applications usually implement

• Retry Logic
or
• Health Checks

to wait until MongoDB is actually ready.


===============================================================================
OVERALL FLOW
===============================================================================

docker compose up -d
          │
          ▼
Creates Docker Network
          │
          ▼
Starts MongoDB Container
          │
          ▼
Starts Mongo Express Container
          │
          ▼
Starts Node.js Container
          │
          ▼
Node.js connects to MongoDB using hostname "mongo"
          │
          ▼
Mongo Express connects to MongoDB using hostname "mongo"


===============================================================================
LEARNING PROGRESSION
===============================================================================

Node Application
        │
        ▼
Dockerize Node App
        │
        ▼
Run MongoDB Container
        │
        ▼
Run Mongo Express Container
        │
        ▼
Manage Three Containers Manually
        │
        ▼
Create compose.yaml
        │
        ▼
docker compose up -d
        │
        ▼
Docker automatically creates the network, starts all containers, and connects
them together.

This progression—from a standalone Node app, to individual Docker containers,
and finally to a single compose.yaml that orchestrates all three services—is a
clear learning path and aligns well with the assignment's objective.