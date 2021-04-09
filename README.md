<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1024px-Adidas_Logo.svg.png" width="320" alt="Nest Logo" /></a>
</p>

## Description

Adidas Challenge Email Service API

## Tech Stack

**NodeJS version:** v12.12.0

**Framework:** [NestJS](https://nestjs.com/)

**Documentation**: [Swagger](https://swagger.io/)

## Considerations

1. This service mocked by returning `randomly boolean` on sent mail success or fail status, `waiting 2 seconds` before response.

2. The `e2e tests` was disabled and will fail if are executed because is all mocked and i i didn't implement a Token Deliver API. I did this in order to follow the challenge instructions where asking to me for `3 microservices` and i don't know if i can create more services than asked to me.

## Security

### Authorization Header

The security of this api is `Bearer Auth JWT Authorization`

To use de API directly, the `JWT` need to be generated with the below payload for success authorization:

```json
{
  {
    "origin": "adidas-challenge-subcription-service",
    "resource": "emails",
    "timestamp": 1617895752000
  }
}
```

> The api is not validating the origin and resource by role, you can put any origin or resource, it is the same for the api. **All the fields are mandatory**.

The `timestamp` to use must be in milliseconds and can be *at least* 2 min before the current timestamp in milliseconds. This aproach was to avoid retries or force brute attacks.

The algorithm used was `HS256` and the secret for hashing the jwt is in `.env` file

#### Help utils

* Can use the [jwt.io](https://jwt.io/) page to generate a valid token

* Can use the [epoch converter](https://www.epochconverter.com/) page to get the current timestamp in ms.

### Helmet and Cors

1. `Cors` was enabled for challenge purpose. Is not fully configurated for special origins.

2. `Helmet` used for helping setting various HTTP headers for security reasons.

### Validation Input Data

Validation pipe added for validate controllers DTO's structure.

## Requirements

1. [NodeJS](https://nodejs.org/es/download/) installed

2. [NVM](https://github.com/nvm-sh/nvm) installed


## Installation

```bash
# Set the node version on .nvmrc file
$ nvm use

# Install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start # run on port 3002

# watch mode
$ npm run start:dev # run on port 3002

# production mode
$ npm run start:prod # run on port 3002
```

> Healt Check enpoint on `http://localhost:3002/ping`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

> **Note:** Only run e2e test on `/ping` (health check) endpoint

## Docker

```bash
# Docker build image
$ docker build . -t adidas-challenge-email-service

# Docker run image
$ docker run -p3002:3002 adidas-challenge-email-service
```

### Docker Compose

```bash
# Up containers
$ docker-compose up

# Clean and up containers
$ docker-compose up --build --force-recreate
```

## Documentation

Swagger documentation only on dev instance: `http:localhost:3002/api`

## CI/CD Proposal

This pipeline executes on push to any branch

| Step Name | Description | Trigger | Tasks |
|---|---|---|---|
| Build | Build image | `Automatic` *(On `branch push`)* | Build Docker image |
| Test | Testing and security | `Automatic` *(On `build step success`)* | `Parallel` | On `Build` step |
|---|---|---| `npm audit dependecies` |
|---|---|---| `unit test` |
| Deploy `Dev` | Deploy builded image to `Dev` environment | `Automatic` *(On `test step success`)* | Execute command to deploy to `development` environment |
| Test `e2e` | Check Overall API endpoints on `dev` | `Manual` *(On `deploy dev` step success)* | Execute `e2e` tests |
| Deploy `Staging` | Deploy builded image to `Staging` environment | `Manual` *(On `deploy dev` step success)* | Execute command to deploy to `staging` environment |
| Deploy `Production` | Deploy builded image to `Production` environment | `Manual` *(On `deploy dev` step success)* | Execute command to deploy to `production` environment |

## Kubernetes

The `kubernetes` configuration is in `k8s` folder inside the project.

As a Backend Developer, only create the `yml` files for: `secrets`, `config maps` and `deployment`.

## License

[MIT licensed](LICENSE).
