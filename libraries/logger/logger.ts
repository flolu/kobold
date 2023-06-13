import {injectable} from 'inversify'
import pino from 'pino'

import {Config} from '@kobold/config'

@injectable()
export class Logger {
  private readonly logger: pino.Logger

  constructor(private readonly config: Config) {
    const serviceName = this.config.get('SERVICE_NAME')
    const environment = this.config.get('ENVIRONMENT')
    const prettyLogging = this.config.get('PRETTY_LOGGING')

    this.logger = pino({
      level: 'debug',
      transport:
        prettyLogging === 'true'
          ? {
              target: 'pino-pretty',
              options: {ignore: 'pid,hostname'},
            }
          : undefined,
      timestamp: pino.stdTimeFunctions.isoTime,
      base: {name: `${serviceName}@${environment}`},
    })
  }

  debug(message: string, obj: object = {}) {
    this.logger.debug(obj, message)
  }

  info(message: string, obj: object = {}) {
    this.logger.info(obj, message)
  }

  warn(message: string, obj: object = {}) {
    this.logger.warn(obj, message)
  }

  error(message: string, obj: object = {}) {
    this.logger.error(obj, message)
  }

  fatal(error: unknown) {
    this.logger.fatal(error)
  }
}
