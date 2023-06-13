import {IsDateString, IsEnum, IsOptional, IsString, IsUUID} from 'class-validator'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'

export abstract class TransactionModel {
  @IsUUID()
  id!: string

  @IsDateString()
  timestamp!: string

  @IsEnum(TransactionTypes)
  type!: TransactionTypes

  @IsOptional()
  @IsString()
  notes!: string | null
}
