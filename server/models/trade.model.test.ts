import {v4 as uuidv4} from 'uuid'

import {TransactionTypes} from '@kobold/enums/transactionTypes.enum'
import {buildAndValidateModel} from '@kobold/validation/buildAndValidateModel'

import {TradeModel} from './trade.model'

describe('TradeModel', () => {
  it('can be instantiated', async () => {
    const trade = await buildAndValidateModel(TradeModel, {
      id: uuidv4(),
      type: TransactionTypes.Trade,
      timestamp: new Date().toISOString(),
      notes: 'Test trade',
      boughtAmount: 0.1,
      boughtAsset: 'BTC',
      soldAmount: 2580,
      soldAsset: 'USD',
      location: 'Bisq',
    })

    expect(trade).toBeInstanceOf(TradeModel)
  })

  it('can not be instantiated with wrong transaction type', async () => {
    let error: any
    try {
      await buildAndValidateModel(TradeModel, {
        id: uuidv4(),
        type: TransactionTypes.Deposit as any,
        timestamp: new Date().toISOString(),
        notes: 'Test trade',
        boughtAmount: 0.1,
        boughtAsset: 'BTC',
        soldAmount: 2580,
        soldAsset: 'USD',
        location: 'Bisq',
      })
    } catch (err) {
      error = err
    }
    expect(error).toBeDefined()
  })
})
