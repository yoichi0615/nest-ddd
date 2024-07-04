## Outline

This repository is a sample project designed to learn the basics of NestJS and DDD.
Based on onion architecture.

## Architecture overview
### Layers
- **Presentation**
- **Application**
- **Infrastructure**
- **Domain**

### CQRS
![cqrs.svg](./cqrs.svg)

## Technology Stack
- NestJS
- TypeORM

## Swagger
http://localhost:3000/api

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
