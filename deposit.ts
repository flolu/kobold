import {SerializedTransaction, Transaction, TransactionType} from './transaction'

export interface SerializedDeposit extends SerializedTransaction {
  asset: string
  amount: number
}

export class Deposit extends Transaction {
  constructor(
    public asset: string,
    public amount: number,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {
    super(TransactionType.Deposit, exchange, timestamp, notes)
  }

  static deserialize(deposit: SerializedDeposit) {
    return new Deposit(
      deposit.asset,
      deposit.amount,
      deposit.exchange,
      new Date(deposit.timestamp),
      deposit.notes,
    )
  }

  serialize(): SerializedDeposit {
    return {
      ...super.serialize(),
      asset: this.asset,
      amount: this.amount,
    }
  }
}
