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
- Two factor authentication setup out of the box - use `JwtTwoFactorGuard` when some specific endpoints need 2FA
- Logging with built-in logger and TypeORM is configurable through `.env` - `TYPEORM_LOGGING=true` - specify false to disable database logging
- `Health` module
- Documentation with Compodoc and JSDoc - take a look on the `src/features/files/files.service.ts` for a detailed example. And for the generation command, run `pnpm run documentation:serve`. Or to customize it, check the `package.json`.
- Sending scheduled emails with cron and Nodemailer - `src/features/email-scheduling` and check the email service in `src/email`
- Out of the box Google authentication module - check out the `src/features/google-authentication` module
- Roles and Permissions based authorization setup - check out the `src/authorization` module. For implementation, check the `src/features/categories` and `src/features/products` modules

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
