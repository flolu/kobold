import {IsNumber, IsString, Matches} from 'class-validator'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'

import {TransactionModel} from './transaction.model'

export class TradeModel extends TransactionModel {
  @Matches(TransactionTypes.Trade)
  type!: TransactionTypes.Trade

  @IsString()
  boughtAsset!: string

  @IsString()
  soldAsset!: string

  @IsNumber()
  boughtAmount!: number

  @IsNumber()
  soldAmount!: number

  @IsString()
  location!: string
}
