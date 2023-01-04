import {SerializedTransaction, Transaction, TransactionType} from './transaction'

export interface SerializedEarning extends SerializedTransaction {
  asset: string
  amount: number
}

export class Earning extends Transaction {
  constructor(
    public asset: string,
    public amount: number,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {
    super(TransactionType.Earning, exchange, timestamp, notes)
  }

  static deserialize(earning: SerializedEarning) {
    return new Earning(
      earning.asset,
      earning.amount,
      earning.exchange,
      new Date(earning.timestamp),
      earning.notes,
    )
  }

  serialize(): SerializedEarning {
    return {
      ...super.serialize(),
      asset: this.asset,
      amount: this.amount,
    }
  }
}
