import {GetServerSidePropsContext} from 'next'
import nookies from 'nookies'

import {IS_NAVIGATION_OPEN_COOKIE_NAME} from '@/contexts/navigation.context'

export interface CookiesState {
  isNavigationOpen: boolean
}

export interface CookiesStateProps {
  cookiesState: CookiesState
}

export const getCookiesState = (context: GetServerSidePropsContext): CookiesState => {
  let cookies: Record<string, string> = {}
  try {
    cookies = nookies.get(context)
  } catch (e) {}

  return {
    isNavigationOpen: cookies[IS_NAVIGATION_OPEN_COOKIE_NAME] === 'true',
  }
}
