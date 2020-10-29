# collaborative-world-service
Mundo Colaborativo: Busca conectar personas que poseen bienes que no utilicen, colaboradores que sean capaces de transportar esos bienes y carenciados que los requieran.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

Create a file in proyect root: '.env' with the secret configuration like:
```bash
DB_HOST=0.0.0.0
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=umcwdb
DB_DATABASE=collaborative_world
PORT=3000
MODE=DEV
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger api

http://localhost:3000/api

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Util command

```bash
nest g module [name]
nest generate controller [name]
nest generate service [name]
nest generate interface [module]/interfaces/[name]
nest generate class [module]/entity/[name]
```

## Local postgres database

### push database
```bash
docker login --username=fmalessio28
```
### push database
```bash
docker images
docker tag 62473370e7ee fmalessio28/colworld:v1
docker push fmalessio28/colworld:v1
```
### pull database
```bash
docker pull fmalessio28/colworld:v1
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
