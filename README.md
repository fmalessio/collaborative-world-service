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
DB_USER=umcw
DB_PASSWORD=umcw
DB_DATABASE=collaborative_world
PORT=3000
MODE=DEV
```

## Running the app
```bash
# development
$ npm run start
# watch mode
$ npm run start:local
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
### creating new database (only fist time)
```bash
docker run --name colworl -p 5432:5432 -e POSTGRES_PASSWORD=umcw -d fmalessio28/colworld
```
```bash
docker ps -a
```
```bash
docker exec -it [container_name] psql -U [postgres_user]
```
```bash
CREATE USER umcw;
CREATE DATABASE collaborative_world;
GRANT ALL PRIVILEGES ON DATABASE collaborative_world TO umcw;
ALTER USER umcw WITH SUPERUSER;
\l
ALTER USER umcw WITH PASSWORD 'umcw';
```
### creating image from container
```bash
sudo docker commit [CONTAINER_ID] [new_image_name]
```
### push database
```bash
docker login --username=fmalessio28
```
### push database
```bash
docker images
docker tag [CONTAINER_ID] fmalessio28/colworld
docker push fmalessio28/colworld:latest
```
### pull database
```bash
docker pull fmalessio28/colworld:latest
```
## Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
