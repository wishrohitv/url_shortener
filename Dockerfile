FROM node:lts-alpine3.24

WORKDIR /app

# This allows Docker to cache your dependencies if they haven't changed
COPY package*.json ./

#Install production dependencies only (omits devDependencies)
RUN npm ci --only=production


# Copy the rest of your Express app source code
COPY . .

ENV MONGO_DB_USERNAME=admin \
    MONGO_DBPWD=1234

EXPOSE 8000

CMD ["npm", "start"]