import * as fs from 'fs/promises'
import * as path from 'path'

import {
  Deposit,
  SerializedDeposit,
  SerializedTrade,
  Trade,
  SerializedTransaction,
  TransactionType,
} from './transactions'
import {getPrices} from './prices'

interface Coin {
  id: string
  symbol: string
  name: string
}

function deserializeTransaction(transaction: SerializedTransaction) {
  if (transaction.type === TransactionType.Trade)
    return Trade.deserialize(transaction as SerializedTrade)

  if (transaction.type === TransactionType.Deposit)
    return Deposit.deserialize(transaction as SerializedDeposit)

  throw 'Unknown transaction type'
}

async function main() {
  const transactionsPath = path.resolve('data/transactions.json')
  const transactionsJSON = await fs.readFile(transactionsPath)
  const rawTransactions: SerializedTransaction[] = JSON.parse(transactionsJSON.toString())
  const transactions = rawTransactions.map(deserializeTransaction)

  const coinsPath = path.resolve('data/coins.json')
  const coinsJSON = await fs.readFile(coinsPath)
  const coins: Coin[] = JSON.parse(coinsJSON.toString())

  const balances: any = {}
  const totalCost: any = {}

  for (const transaction of transactions) {
    if (transaction instanceof Trade) {
      balances[transaction.boughtAsset] = 0
      balances[transaction.soldAsset] = 0
      totalCost[transaction.boughtAsset] = 0
    }
  }

  for (const transaction of transactions) {
    if (transaction instanceof Trade) {
      balances[transaction.boughtAsset] += transaction.boughtAmount
      balances[transaction.soldAsset] -= transaction.soldAmount

      if (transaction.soldAsset === 'tether') {
        totalCost[transaction.boughtAsset] += transaction.soldAmount
      }
    }
  }

  const averageCost: any = {}

  for (const asset in balances) {
    if (asset === 'tether') continue
    averageCost[asset] = totalCost[asset] / balances[asset]
  }

  const assetIds: string[] = []
  for (const asset in averageCost) {
    assetIds.push(asset)
  }

  const currency = 'usd'
  const currentPrices = await getPrices(assetIds, [currency])

  const currentValues: any = {}
  const unrealizedGains: any = {}
  let total = 0
  let gains = 0

  for (const asset in averageCost) {
    const coin = coins.find(c => c.id === asset)!
    const price = (currentPrices as any)[coin.id][currency]

    currentValues[asset] = balances[asset] * price
    unrealizedGains[asset] = currentValues[asset] - averageCost[asset] * balances[asset]

    total += currentValues[asset]
    gains += unrealizedGains[asset]
  }

  const sortedCurrentValues = Object.keys(currentValues)
    .sort((a, b) => (currentValues[a] > currentValues[b] ? -1 : 1))
    .reduce((obj, key) => {
      obj[key] = Math.floor(currentValues[key])
      return obj
    }, {})
  console.log(sortedCurrentValues)
  console.log('$', total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))

  // console.log({balances, averageCost, currentPrices, currentValues, unrealizedGains, total, gains})
}

main()
