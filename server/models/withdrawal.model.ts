import {IsNumber, IsString} from 'class-validator'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'

import {TransactionModel} from './transaction.model'

export class WithdrawalModel extends TransactionModel {
  type = TransactionTypes.Withdrawal

  @IsString()
  asset!: string

  @IsNumber()
  amount!: number

  @IsString()
  location!: string
}
