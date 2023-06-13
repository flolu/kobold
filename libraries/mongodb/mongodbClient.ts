import {injectable} from 'inversify'
import {MongoClient} from 'mongodb'

import {Config} from '@kobold/config'
import {Logger} from '@kobold/logger'

@injectable()
export class MongoDbClient {
  private readonly mongodbURI = this.config.get('MONGODB_URI')
  private readonly mongodbUsername = this.config.get('MONGODB_USERNAME')
  private readonly mongodbPassword = this.config.get('MONGODB_PASSWORD')

  private _isConnected = false
  private _client = new MongoClient(this.mongodbURI, {
    auth: {username: this.mongodbUsername, password: this.mongodbPassword},
    retryWrites: true,
    writeConcern: {w: 'majority'},
  })

  constructor(private config: Config, private logger: Logger) {}

  async connect() {
    await this.client.connect()
    this._isConnected = true
    this.logger.debug('connected to mongodb')
  }

  async disconnect() {
    await this.client.close()
    this._isConnected = false
    this.logger.debug('disconnected from mongodb')
  }

  get isConnected() {
    return this._isConnected
  }

  get client() {
    return this._client
  }
}
