FROM node

ENV MONGO_DB_USERNAME=admin \
    MONDO_DBPWD=queryt

RUN mkdir -p testapp

COPY . /testapp

cmd ["node", "/testapp/server.js"]