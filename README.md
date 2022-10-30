Kobold will be an open-source application to track your crypto portfolios. It strives to be an alternative to [CoinTracking](https://cointracking.info) and [Koinly](https://koinly.io).

> This software is still being developed and thus not ready to use by any means!

## Features

- Calculate balances
- Calculate unrealized gains and losses

## Usage

**Setup**

- `npm i` (Install dependencies)
- Create `coins.json` file with all coins from [CoinGecko](https://coingecko.com)
- Create `transactions.json` file with all your transactions

**Run it**

- `npm run start` (Execute analysis)

## Todo

- Build user interface
- Transaction imports
- Calculate realized gains and losses
- Write tests and add to GitHub action

## Ideas

- CoinTracking import (using Puppeteer)
- Include buy/sell indicators like CBBI
