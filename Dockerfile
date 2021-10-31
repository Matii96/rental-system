FROM node:16-alpine AS rental-base
WORKDIR /app
COPY . .
RUN npm i
