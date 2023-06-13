import '@/styles/globals.sass'

import {appWithTranslation} from 'next-i18next'
import {ThemeProvider} from 'next-themes'
import {Chakra_Petch} from 'next/font/google'

import {SnackbarProvider} from '@/contexts/snackbar.context'
import {CookiesStateProps} from '@/lib/cookiesState'

import type {AppProps} from 'next/app'
// LATER build next.js with bazel

const mainFont = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-main',
})

// TODO cookie notice dialog

function App({Component, pageProps}: AppProps & CookiesStateProps) {
  return (
    <div className={`${mainFont.variable} font-sans antialiased bg-900 text-900 text-base`}>
      <ThemeProvider defaultTheme="system">
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  )
}

export default appWithTranslation(App)
