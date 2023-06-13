import {isEnum} from 'class-validator'
import {NextFunction, Request, Response} from 'express'
import {injectable} from 'inversify'
import {BaseMiddleware} from 'inversify-express-utils'

import {Locales} from '@kobold/enums/locales'

@injectable()
export class LanguageMiddleware extends BaseMiddleware {
  static getLocaleFromRequest(req: Request) {
    let locale = Locales.English

    const languages = req.acceptsLanguages()
    if (languages.length > 0 && isEnum(languages[0], Locales)) {
      locale = languages[0] as Locales
    }

    return locale
  }

  handler(req: Request, res: Response, next: NextFunction) {
    const locale = LanguageMiddleware.getLocaleFromRequest(req)

    // It only sets locale to a supported locale
    res.locals.locale = locale

    next()
  }
}

export interface ResponseWithLocale extends Response {
  locals: {
    locale: Locales
  }
}
