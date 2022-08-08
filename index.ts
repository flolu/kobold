import * as fs from 'fs/promises'
import * as path from 'path'

import {getPrices} from './prices'

interface Transaction {
  type: string
  boughtAmount: number
  boughtAsset: string
  soldAmount: number
  soldAsset: string
  exchange: string
  timestamp: string
}

interface Coin {
  id: string
  symbol: string
  name: string
}

async function main() {
  const transactionsPath = path.resolve('transactions.json')
  const transactionsJSON = await fs.readFile(transactionsPath)
  const transactions: Transaction[] = JSON.parse(transactionsJSON.toString())

  const coinsPath = path.resolve('coins.json')
  const coinsJSON = await fs.readFile(coinsPath)
  const coins: Coin[] = JSON.parse(coinsJSON.toString())

  const balances: any = {}
  const totalCost: any = {}

  for (const transaction of transactions) {
    if (transaction.type === 'trade') {
      balances[transaction.boughtAsset] = 0
      balances[transaction.soldAsset] = 0
      totalCost[transaction.boughtAsset] = 0
    }
  }

  for (const transaction of transactions) {
    if (transaction.type === 'trade') {
      balances[transaction.boughtAsset] += transaction.boughtAmount
      balances[transaction.soldAsset] -= transaction.soldAmount

      if (transaction.soldAsset === 'USDT') {
        totalCost[transaction.boughtAsset] += transaction.soldAmount
      }
    }
  }

  const averageCost: any = {}

  for (const asset in balances) {
    if (asset === 'USDT') continue
    averageCost[asset] = totalCost[asset] / balances[asset]
  }

  // map from asset symbol to coingecko id
  const assets: string[] = []
  for (const asset in averageCost) {
    const coin = coins.find(c => c.symbol === asset)!
    assets.push(coin.id)
  }

  const currency = 'usd'
  const currentPrices = await getPrices(assets, [currency])

  const currentValues: any = {}
  const unrealizedGains: any = {}
  for (const asset in averageCost) {
    const coin = coins.find(c => c.symbol === asset)!
    const price = (currentPrices as any)[coin.id][currency]
    currentValues[asset] = balances[asset] * price
    unrealizedGains[asset] = currentValues[asset] - averageCost[asset] * balances[asset]
  }

  console.log({balances, averageCost, currentPrices, currentValues, unrealizedGains})
}

main()
