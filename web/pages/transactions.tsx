import {NextPage} from 'next'
import {useTranslation} from 'next-i18next'
import {NextSeo} from 'next-seo'

import {Navigation} from '@/components/navigation'
import {CookiesStateProps} from '@/lib/cookiesState'
import {withProps} from '@/lib/getProps'

const DashboardPage: NextPage<CookiesStateProps> = ({cookiesState}) => {
  const {t} = useTranslation()

  return (
    <>
      <NextSeo title={t('transactions-page:title')!} />

      <Navigation initialOpenState={cookiesState.isNavigationOpen}>
        <main className="flex items-center justify-center h-full p-20">
          <span className="fill-current w-96 text-500">Transactions</span>
        </main>
      </Navigation>
    </>
  )
}

export const getServerSideProps = withProps(['navigation', 'common', 'transactions-page'])

export default DashboardPage
