import {IsNumber, IsString} from 'class-validator'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'

import {TransactionModel} from './transaction.model'

export class TransferModel extends TransactionModel {
  type = TransactionTypes.Transfer

  @IsString()
  asset!: string

  @IsNumber()
  amount!: number

  @IsString()
  fromLocation!: string

  @IsString()
  toLocation!: string
}
