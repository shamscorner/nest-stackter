## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with custom setup maintaining industry standard best practices. Just clone and start building without worrying about anything. Focus on the product not the setup.

## Overview

- `config/` setup - separated segment for each config
	- `app.config.ts`
	- `aws.config.ts`
	- `database.config.ts`
	- `jwt.config.ts`
	- `typeorm.config.ts`
- `authentication` module - JWT token based cookie authentication out of the box
- `database` module - [Typeorm](https://typeorm.io/)
- API validation and serialization
- custom pagination (page, limit) - check the `src/features/comments` module
- [CQRS](https://docs.nestjs.com/recipes/cqrs) - check the `src/features/comments` module
- Out of the box file upload feature module to Amazon S3 (both private and public)
- [CQRS](https://docs.nestjs.com/recipes/cqrs) + pagination - a complete module => `src/features/products`
- Swagger Open API specification setup out of the box - check the `src/features/users/users.controller.ts` for examples
- PostgreSQL database file storing support - check the avatar upload of `users.services.ts` and `src/features/database-files`
- Soft Delete example - check the `src/features/categories` module

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
