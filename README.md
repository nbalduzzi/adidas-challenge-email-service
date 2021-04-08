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

This service mocked by returning `randomly boolean` on sent mail success or fail status, `waiting 2 seconds` before response.

## Security

### Authorization Header

The security of this api is `Bearer Auth JWT Authorization`

To use de API directly, the `JWT` need to be generated with the below payload for success authorization:

```json
{
  {
    "origin": "adidas-challenge-subcription-service",
    "resource": "emails",
    "timestamp": 1617895752000 // Need to be a timestamp in milliseconds at least 2 min before now timestamp
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

## Installation

```bash
# Set the node version on .nvmrc file
$ nvm use

# Install dependencies
$ npm install
```

## Running the app locally

```bash
# development
$ npm run start # run on port 3002

# watch mode
$ npm run start:dev # run on port 3002

# production mode
$ npm run start:prod # run on port 3002
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

## Docker

```bash
# Docker build image
$ docker build . -t adidas-challenge-email-service

# Docker run image
$ docker run -p3002:3002 adidas-challenge-email-service
```

## Documentation

Swagger documentation on dev instance: `http:localhost:3002/api`

## License

[MIT licensed](LICENSE).
