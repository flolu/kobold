import {IsNumber, IsString} from 'class-validator'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'

import {TransactionModel} from './transaction.model'

export class DepositModel extends TransactionModel {
  type = TransactionTypes.Deposit

  @IsString()
  asset!: string

  @IsNumber()
  amount!: number

  @IsString()
  location!: string
}
