import {Endpoints} from '@kobold/enums/endpoints'
import {LoggerMiddleware} from '@kobold/middlewares/logger.middleware'
import {controller, httpGet, interfaces, response} from 'inversify-express-utils'

@controller('', LoggerMiddleware)
export class MainController implements interfaces.Controller {
  @httpGet(`/${Endpoints.Health}`)
  health(@response() res: Response) {
    return 'healthy'
  }
}
