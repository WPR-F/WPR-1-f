# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --legacy-peer-deps

# Install additional dependencies
RUN npm install axios gapi-script react-google-login --legacy-peer-deps

# Copy local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Install Express
RUN npm install express --legacy-peer-deps

# Copy the server script
COPY wprfReact\server.cjs .

# Run the Express server on container startup.
CMD [ "npm", "run", "dev"]
# RUN npm run dev
# CMD [ "node", "server.cjs" ]