import i18next from 'i18next'
import Backend, {FsBackendOptions} from 'i18next-fs-backend'
import {injectable} from 'inversify'
import * as path from 'path'

import {Locales} from '@kobold/enums/locales.enum'

const LOCALES_PATH = path.join(__dirname, './locales/{{lng}}/{{ns}}.json')

@injectable()
export class TranslationService {
  async loadTranslations(namespaces: string[]) {
    await i18next.use(Backend).init<FsBackendOptions>({
      backend: {loadPath: LOCALES_PATH},
      debug: false,
      initImmediate: false,
      lng: Locales.English,
      fallbackLng: Locales.English,
      preload: [Locales.English, Locales.German],
      ns: namespaces,
    })
  }

  translate(key: string, locale: Locales) {
    return i18next.t(key, {lng: locale})
  }
}
