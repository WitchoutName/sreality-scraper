FROM node:16-slim as base

FROM base AS deps
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Install all dependencies
FROM base AS installer
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN apt-get update -y && apt-get install -y openssl


# Run the DEV server
FROM base AS devrunner
WORKDIR /
COPY --from=installer . .
WORKDIR /app


RUN chmod +x ./docker-entrypoint.sh
# RUN chmod 777 /root


# COPY ../.env ./.env.local


EXPOSE 8080

ENV PORT 8080

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["npm", "run", "dev"]

