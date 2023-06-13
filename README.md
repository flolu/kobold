<div align="center">
  <a href="https://github.com/flolu/kobold">
    <img width="160px" height="auto" src="https://emoji.aranja.com/static/emoji-data/img-apple-160/1f340.png" />
  </a>
  <br>
  <h1>Kobold</h1>
  <p>Open-source Crypto Portfolio Tracker</p>
</div>

> This software is still being developed and thus not ready to use!

## Features

- TODO

<!--

Todo
- https://api.coingecko.com/api/v3/coins/list
- Build user interface
- Transaction imports
- Calculate realized gains and losses
- Write tests and add to GitHub action
- Fiat trades
- Choose target fiat currency
- Historical data

Ideas
- CoinTracking import (using Puppeteer)
- Include buy/sell indicators
- CLI

-->

## Usage

**Development Requirements**

- Linux or macOS
- Node.js
- Docker
- pnpm\*
- Bazelisk\*
- Buildifier\*

\* Are installed with `make setup`

**Setup**

- `make setup` (install required dependencies and set up project)

**Development**

- `make dev` (start development services, http://localhost:4000)
- `make build` (build everything)
- `make test` (run tests)
- `make lint` (check linting)
- `make test-all` (run all tests)

## Codebase

**Services**

- [`server`](server) (**Node.js**, API)
- [`web`](web) (**Next.js**, web application built with React)

**Libraries**

- [`@kobold/config`](libraries/config) (**TypeScript**, environment-specific service configuration)
- [`@kobold/enums`](libraries/enums) (**TypeScript**, constant enumerations)
- [`@kobold/exceptions`](libraries/exceptions) (**TypeScript**, error utilities)
- [`@kobold/i18n`](libraries/i18n) (**TypeScript**, backend translations)
- [`@kobold/logger`](libraries/logger) (**TypeScript**, logger utility)
- [`@kobold/middlewares`](libraries/middlewares) (**TypeScript**, HTTP request middlewares)

**Tech Stack**

- [TypeScript](https://www.typescriptlang.org) (programming language)
- [Node.js](https://nodejs.org) (JavaScript runtime environment)
- [Next.js](https://nextjs.org) (frontend React framework)
- [Bazel](https://bazel.build) (tool for automation of building and testing software)
- [Docker](https://www.docker.com) (cross-platform containerization)
