# syntax=docker/dockerfile:1.4

# Start with official Node image
FROM node:lts-buster AS development

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install

# install dependencies
RUN npm install
# RUN npm ci

# TODO: shouldn't need this, consider deleting
# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "npm", "run", "host" ]
# CMD [ "npm", "run", "dev" ]
# CMD ["npm", "start"]


# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF
# 
# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "start" ]
