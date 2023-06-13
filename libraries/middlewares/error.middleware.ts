import {NextFunction, Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'

import {Exception} from '@kobold/exceptions'
import {TranslationService} from '@kobold/i18n'
import {Logger} from '@kobold/logger'

import {LanguageMiddleware} from './language.middleware'

export interface ErrorResponse {
  name: string
  message: string
}

export const errorMiddleware = (logger: Logger, translationService: TranslationService) => {
  return (err: object, req: Request, res: Response, _next: NextFunction) => {
    const locale = LanguageMiddleware.getLocaleFromRequest(req)

    if (err instanceof Exception && !err.isUnexpected)
      logger.info('expected exception occurred', err)
    else logger.error('unexpected exception occurred', err)

    if (err instanceof Exception) {
      const response: ErrorResponse = {
        name: err.name,
        // message will be err.name if no message and no translation is available
        message: err.userMessage || translationService.translate(`errors:${err.name}`, locale),
      }

      const status = err.httpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR
      res.status(status).json(response)
      return
    }

    const response: ErrorResponse = {
      name: 'unexpected_exception',
      message: translationService.translate('errors:unexpected_exception', locale),
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
