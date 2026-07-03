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