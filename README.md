## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with custom setup.

- `config/` setup
- `authentication` module - JWT token based
- `database` module - [Typeorm](https://typeorm.io/)
- API validation and serialization
- custom pagination (page, limit) - check the `src/features/comments` module
- [CQRS](https://docs.nestjs.com/recipes/cqrs) - check the `src/features/comments` module
- file upload feature module to Amazon S3 (both private and public)

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
