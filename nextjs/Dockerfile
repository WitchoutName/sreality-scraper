FROM node:slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENV PORT 3000

# Build the project
RUN npm run build

# ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["npm", "start"]

