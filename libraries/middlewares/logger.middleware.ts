import {NextFunction, Request, Response} from 'express'
import {injectable} from 'inversify'
import {BaseMiddleware} from 'inversify-express-utils'

import {Endpoints} from '@kobold/enums/endpoints'
import {Logger} from '@kobold/logger'

@injectable()
export class LoggerMiddleware extends BaseMiddleware {
  constructor(private logger: Logger) {
    super()
  }

  handler(req: Request, _res: Response, next: NextFunction) {
    if (req.path === `/${Endpoints.Health}`) return next()

    const data: any = {}
    if (Object.keys(req.body).length) data.body = req.body
    if (Object.keys(req.query).length) data.query = req.query
    if (Object.keys(req.params).length) data.params = req.params

    this.logger.debug(`[${req.method}] ${req.path}`, Object.keys(data).length === 0 ? {} : data)

    next()
  }
}
