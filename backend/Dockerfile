# syntax=docker/dockerfile:1.4

# Start with official Node image
FROM node:lts-buster AS development

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# install sqlite3 and its node module
RUN apt update && apt install -y apt-transport-https ca-certificates sqlite3

# make sure we aren't using the local node_modules but rather adding a fresh one
RUN rm -rf node_modules

# install dependencies
RUN npm install

# make sure we aren't using the local sqlite3 but rather adding a fresh one
RUN npm uninstall sqlite3
RUN npm install sqlite3 --build-from-source

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "install", "sqlite3", "--build-from-source" ]
CMD [ "npm", "run", "start" ]
