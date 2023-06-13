import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import {getCookiesState} from './cookiesState'
import {QueryResponse} from './fetcher'
import {fetcherSSR} from './fetcherSSR'

export interface GetPropsParams {
  context: GetServerSidePropsContext
  fetcher: <T>(url: string) => Promise<QueryResponse<T>>
  locale: string
}

export const withProps = <T extends {[key: string]: any}>(
  translationNamespaces: string[] = [],
  getProps?: (params: GetPropsParams) => Promise<GetServerSidePropsResult<T>>,
) => {
  const getServerSideProps: GetServerSideProps<T> = async context => {
    const fetcher = <T>(url: string) => fetcherSSR<T>(context.req, context.res, url)

    const locale = context.req.headers['accept-language'] || context.locale || 'en'

    const translations = await serverSideTranslations(locale, translationNamespaces)

    const result = getProps ? await getProps({context, fetcher, locale}) : {}
    const props = (result as any).props || {}

    const cookiesState = getCookiesState(context)

    return {...result, props: {...props, ...translations, cookiesState}}
  }

  return getServerSideProps
}
