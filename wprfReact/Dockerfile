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
RUN npm ci --only=production

# Copy local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Install Express
RUN npm install express

# Copy the server script
COPY server.cjs .

# Run the Express server on container startup.
CMD [ "node", "server.cjs" ]