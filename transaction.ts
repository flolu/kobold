import {Deposit, SerializedDeposit} from './deposit'
import {SerializedTrade, Trade} from './trade'

export enum TransactionType {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Trade = 'trade',
  Earning = 'earning',
  Expenditure = 'expenditure',
}

export interface SerializedTransaction {
  type: string
  exchange: string
  timestamp: string
  notes?: string
}

// LATER consider adding feesAmount and feesAsset
// LATER consider adding tags
export abstract class Transaction {
  constructor(
    public type: TransactionType,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {}

  serialize(): SerializedTransaction {
    return {
      type: this.type,
      exchange: this.exchange,
      timestamp: this.timestamp.toISOString(),
      notes: this.notes,
    }
  }

  static deserialize(transaction: SerializedTransaction) {
    if (transaction.type === TransactionType.Trade)
      return Trade.deserialize(transaction as SerializedTrade)

    if (transaction.type === TransactionType.Deposit)
      return Deposit.deserialize(transaction as SerializedDeposit)

    throw 'Unknown transaction type'
  }
}
