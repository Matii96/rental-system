# Rental system

<div align="center">

![ci](https://github.com/Matii96/rental-system/actions/workflows/ci.yml/badge.svg) [![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)

</div>

## Description

Production-ready basic managment system for items (currently movies and books) rental using [Nest.js](https://nestjs.com) and [Nx workspace](https://nx.dev). Built as a case-study of complex problems related to distributed microservices systems and solutions for them.

## Requirements

- Npm v6.14 and higher
- Docker v20.10 and higher
- Docker compose v1.29 and higher

## Installation

```bash
$ npm install
```

## Environmental variables

```bash
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=superSecretPassword

DB_DIALECT=postgres
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_SYNCHRONIZE=true
DB_SHOW_LOGS=false

JWT_SECRET=superSecret
JWT_EXPIRES_IN=1d
```

All variables defaults are in [.env](https://github.com/Matii96/rental-system/blob/master/.env) configuration file.

## Running the app

```bash
# development
$ npm run start:dev
```

## Tests

```bash
# unit tests for all apps
$ npm run test:all

# unit tests for particular app
$ nx test <app_name>
```

## Api documentation

Interactive [swagger.io](https://swagger.io/tools/swagger-ui/) documentation is available under following addresses:

- Users service: http://localhost:3001/api/docs
- Availability service: http://localhost:3003/api/docs
- Books service: http://localhost:3004/api/docs

## License

Rental system is [MIT licensed](LICENSE).
