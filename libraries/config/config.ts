import {injectable} from 'inversify'

import {Exception} from '@kobold/exceptions'

import defaultConfig from './default.config'

@injectable()
export class Config<T extends string = string> {
  constructor(private config: Record<string, string> = {}) {}

  get(key: T, fallback?: string) {
    const value = this.getByKey(key, fallback)
    if (value === undefined) {
      throw new Exception({
        name: 'config_value_not_found',
        message: 'no config value has been found for the requested key',
        data: {key},
      })
    }
    return value as string
  }

  override(key: T, value: string) {
    this.config[key] = value
  }

  private getByKey(key: T, fallback?: string) {
    const value = this.config[key] || process.env[key] || defaultConfig[key]
    if (value === undefined) return fallback
    return value
  }
}
