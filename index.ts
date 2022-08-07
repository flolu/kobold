import * as fs from 'fs/promises'
import * as path from 'path'

interface Transaction {
  type: string
  boughtAmount: number
  boughtAsset: string
  soldAmount: number
  soldAsset: string
  exchange: string
  timestamp: string
}

async function main() {
  const inputPath = path.resolve('transactions.json')
  const json = await fs.readFile(inputPath)
  const transactions: Transaction[] = JSON.parse(json.toString())

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

  console.log({balances, averageCost})
}

main()
