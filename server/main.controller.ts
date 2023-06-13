import {Response} from 'express'
import {controller, httpGet, interfaces, response} from 'inversify-express-utils'

import {Endpoints} from '@kobold/enums/endpoints'
import {LoggerMiddleware} from '@kobold/middlewares/logger.middleware'
import {MongoDbClient} from '@kobold/mongodb/mongodbClient'

@controller('', LoggerMiddleware)
export class MainController implements interfaces.Controller {
  constructor(private mongodbClient: MongoDbClient) {}

  @httpGet(`/${Endpoints.Health}`)
  health(@response() res: Response) {
    const isHealthy = this.mongodbClient.isConnected
    if (!isHealthy) return res.status(500).send('unhealthy')
    return 'healthy'
  }
}
