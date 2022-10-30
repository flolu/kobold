import {SerializedTransaction, Transaction, TransactionType} from './transaction'

export interface SerializedWithdrawal extends SerializedTransaction {
  asset: string
  amount: number
}

export class Withdrawal extends Transaction {
  constructor(
    public asset: string,
    public amount: number,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {
    super(TransactionType.Withdrawal, exchange, timestamp, notes)
  }

  static deserialize(withdrawal: SerializedWithdrawal) {
    return new Withdrawal(
      withdrawal.asset,
      withdrawal.amount,
      withdrawal.exchange,
      new Date(withdrawal.timestamp),
      withdrawal.notes,
    )
  }

  serialize(): SerializedWithdrawal {
    return {
      ...super.serialize(),
      asset: this.asset,
      amount: this.amount,
    }
  }
}
