# Use a Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Copy the database module from the scraper
COPY --from=scraper /app/src/db /app/src/db

# Compile TS to JS
RUN npm run build

# Set the command to start the HTTP server
CMD [ "npm", "start" ]