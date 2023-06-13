import '@abraham/reflection'

import bodyParser from 'body-parser'
import helmet from 'helmet'
import {Server} from 'http'
import {Container} from 'inversify'
import {InversifyExpressServer} from 'inversify-express-utils'

import {Config} from '@kobold/config'
import {TranslationService} from '@kobold/i18n'
import {Logger} from '@kobold/logger'
import {corsMiddleware} from '@kobold/middlewares/cors.middleware'
import {errorMiddleware} from '@kobold/middlewares/error.middleware'
import {LanguageMiddleware} from '@kobold/middlewares/language.middleware'
import {LoggerMiddleware} from '@kobold/middlewares/logger.middleware'

import {MainController} from './main.controller'

async function main() {
  const container = new Container()

  container.bind(Config).toSelf().inSingletonScope()
  container.bind(Logger).toSelf().inSingletonScope()
  container.bind(LoggerMiddleware).toSelf().inSingletonScope()
  container.bind(LanguageMiddleware).toSelf().inSingletonScope()

  container.bind(MainController).toSelf()
  container.bind(TranslationService).toSelf()

  const logger = container.get(Logger)
  const config = container.get(Config)
  const translationService = container.get(TranslationService)

  try {
    logger.info('starting service')

    await translationService.loadTranslations(['errors'])

    const server = new InversifyExpressServer(container)

    const clientUrl = config.get('CLIENT_URL')

    server.setConfig(app => {
      app.use(helmet())
      app.use(corsMiddleware(true, clientUrl))
      app.use(bodyParser.json())
    })

    server.setErrorConfig(app => {
      app.use(errorMiddleware(logger, translationService))
    })

    const app = server.build().listen(3000, () => {
      logger.info('successfully started service')
    })

    // LATER sigterm doesn't seem to work with Ctrl+C when stopping docker containers
    process.on('SIGTERM', () => shutdown(app, logger))
  } catch (error) {
    logger.fatal(error)
    process.exit(1)
  }
}

async function shutdown(app: Server, logger: Logger) {
  logger.info('shutting down service')

  app.close(async () => {
    logger.info('exit service')
    process.exit(0)
  })
}

main()
