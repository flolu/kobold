import '@abraham/reflection'

import {Config} from './config'

describe('config', () => {
  const values = {
    A: 'valueA',
    B: 'somethingB',
    ARRAY_0: 'zero',
    ARRAY_1: 'one',
    ARRAY_2: 'two',
  }
  const config = new Config<keyof typeof values>(values)

  it('gets values', () => {
    const value = config.get('A')
    expect(value).toEqual(values.A)
  })

  it('uses fallback', () => {
    const fallback = 'fallbackValue'
    const value = config.get('not_a_valid_key' as keyof typeof values, fallback)
    expect(value).toEqual(fallback)
  })

  it('throws when value is not found and no fallback is provided', () => {
    expect(() => config.get('not_a_valid_key' as keyof typeof values)).toThrow()
  })

  it('overrides values', () => {
    expect(config.get('B')).toEqual(values.B)
    const newValue = 'somethingElse'
    config.override('B', newValue)
    expect(config.get('B')).toEqual(newValue)
  })

  it('uses default values if not provided otherwise', () => {
    const otherConfig = new Config(values)
    expect(otherConfig.get('ENVIRONMENT')).toEqual('prod')
    process.env.ENVIRONMENT = 'dev'
    expect(otherConfig.get('ENVIRONMENT')).toEqual('dev')
    otherConfig.override('ENVIRONMENT', 'test')
    expect(otherConfig.get('ENVIRONMENT')).toEqual('test')
  })
})
