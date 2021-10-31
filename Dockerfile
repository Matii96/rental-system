# FROM node:16-alpine AS rental-base
# WORKDIR /app
# RUN npm i nx -g

# COPY . .
# RUN npm i

FROM ubuntu:21.04 AS rental-base
WORKDIR /app
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm i nx -g

# COPY . .
# RUN npm i
