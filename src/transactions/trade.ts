import {SerializedTransaction, Transaction, TransactionType} from './transaction'

export interface SerializedTrade extends SerializedTransaction {
  boughtAsset: string
  soldAsset: string
  boughtAmount: number
  soldAmount: number
}

export class Trade extends Transaction {
  constructor(
    public boughtAsset: string,
    public soldAsset: string,
    public boughtAmount: number,
    public soldAmount: number,
    public exchange: string,
    public timestamp: Date,
    public notes: string = '',
  ) {
    super(TransactionType.Trade, exchange, timestamp, notes)
  }

  static deserialize(trade: SerializedTrade) {
    return new Trade(
      trade.boughtAsset,
      trade.soldAsset,
      trade.boughtAmount,
      trade.soldAmount,
      trade.exchange,
      new Date(trade.timestamp),
      trade.notes,
    )
  }

  serialize(): SerializedTrade {
    return {
      ...super.serialize(),
      boughtAsset: this.boughtAsset,
      soldAsset: this.soldAsset,
      boughtAmount: this.boughtAmount,
      soldAmount: this.soldAmount,
    }
  }
}
