import {SerializedTransaction, Transaction, TransactionType} from './transaction'

export interface SerializedExpenditure extends SerializedTransaction {
  asset: string
  amount: number
}

export class Expenditure extends Transaction {
  constructor(
    public asset: string,
    public amount: number,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {
    super(TransactionType.Expenditure, exchange, timestamp, notes)
  }

  static deserialize(expenditure: SerializedExpenditure) {
    return new Expenditure(
      expenditure.asset,
      expenditure.amount,
      expenditure.exchange,
      new Date(expenditure.timestamp),
      expenditure.notes,
    )
  }

  serialize(): SerializedExpenditure {
    return {
      ...super.serialize(),
      asset: this.asset,
      amount: this.amount,
    }
  }
}
