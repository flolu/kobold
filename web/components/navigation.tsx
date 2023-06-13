import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC, ReactNode} from 'react'

import {NavigationProvider, useNavigation} from '@/contexts/navigation.context'
import {classes} from '@/lib/classes'

import {DashboardIcon} from './icons/dashboard.icon'
import {MenuIcon} from './icons/menu.icon'

interface SideNavItemProps {
  link: string
  icon: JSX.Element
  text: string
}

const SideNavItem: FC<SideNavItemProps> = ({link, icon, text}) => {
  const router = useRouter()
  const navigationContext = useNavigation()

  const active = router.pathname === link

  return (
    <Link
      href={link}
      className={classes(
        'relative flex items-center p-4 mx-3 mb-4 cursor-pointer rounded-2xl backdrop-filter duration-100 bg-glass-50 backdrop-blur-[1px]',
        active
          ? 'text-primary-900 bg-glass-900 backdrop-blur-sm'
          : 'hover:bg-glass-500 hover:backdrop-blur-sm',
      )}
    >
      <i className="w-6 fill-current">{icon}</i>
      <span
        className={classes(
          'text-sm font-medium inline-block ml-12 align-middle whitespace-nowrap duration-100 ease-in-out absolute',
          navigationContext.isOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        {text}
      </span>
    </Link>
  )
}
interface MobileNavItemProps {
  link: string
  icon: JSX.Element
  text: string
}

const MobileNavItem: FC<MobileNavItemProps> = ({link, icon, text}) => {
  const router = useRouter()
  const active = router.pathname === link

  return (
    <Link href={link} className="flex-1 space-x-4">
      <div
        className={classes(
          'flex flex-col items-center cursor-pointer',
          active ? 'text-primary-900 font-medium' : 'text-100',
        )}
      >
        <i className={classes('w-6 h-6 fill-current')}>{icon}</i>
        <span className="mt-1 text-xs">{text}</span>
      </div>
    </Link>
  )
}

interface NavigationContentProps {
  children: ReactNode
}

const NavigationContent: FC<NavigationContentProps> = ({children}) => {
  const navigationContext = useNavigation()
  const {t} = useTranslation()

  return (
    <div className="flex flex-col h-screen min-h-screen sm:flex-row text-500 bg-500">
      {/* Gradient background from https://hypercolor.dev */}
      <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-100/20 via-primary-50/20 to-primary-900/20 saturate-50"></div>

      {/* Dotted background */}
      <div
        className="absolute w-full h-full opacity-[0.075]"
        style={{
          backgroundImage: `radial-gradient(rgba(var(--primary-900), 1) calc(0.5rem * 0.1), transparent calc(0.5rem * 0.1))`,
          backgroundSize: '0.5rem 0.5rem',
        }}
      ></div>

      {/* Side navigation for big screens */}
      <nav
        className={classes(
          'hidden sm:block fixed top-0 bottom-0 left-0 duration-100 ease-in-out whitespace-nowrap select-none box-content',
          'border-background-100',
          navigationContext.isOpen ? 'w-64' : 'w-20',
        )}
      >
        <ul className="flex flex-col h-full max-w-xs overflow-hidden text-muted">
          <li
            onClick={navigationContext.toggleOpen}
            className="relative flex items-center p-4 mx-3 mt-4 mb-4 ease-in-out cursor-pointer w-min rounded-2xl bg-glass-50 backdrop-blur-[1px] hover:bg-glass-500 hover:backdrop-blur-sm"
          >
            <i className="w-6 fill-current">
              <MenuIcon />
            </i>
          </li>

          <div className="mb-auto">
            <SideNavItem
              link={'/'}
              icon={<DashboardIcon />}
              text={t('navigation:dashboard')}
            ></SideNavItem>
          </div>
        </ul>
      </nav>
      <div
        className={classes(
          'hidden sm:block duration-100 ease-in-out',
          navigationContext.isOpen ? 'w-64' : 'w-20',
        )}
      ></div>

      {/* Bottom navigation for small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 h-16 overflow-hidden border-t select-none bg-500 border-background-100 sm:hidden">
        <ul className="flex items-center justify-center h-full">
          <MobileNavItem icon={<DashboardIcon />} text={t('navigation:dashboard')} link="/" />
        </ul>
      </nav>

      {/* Page content */}
      <div className="flex-1 sm:p-4 sm:pl-0">
        <div
          className="relative h-full overflow-y-auto sm:shadow-2xl sm:border-2 sm:rounded-xl sm:border-background-100 backdrop-blur-md backdrop-filter bg-glass-900"
          style={{minHeight: 'calc(100vh - 2rem - 4px)'}}
        >
          {children}
        </div>

        {/* Bottom spacer for mobile navigation */}
        <div className="h-16 sm:hidden"></div>
      </div>
    </div>
  )
}

interface Props {
  children: ReactNode
  initialOpenState: boolean
}

export const Navigation: FC<Props> = ({children, initialOpenState}) => {
  return (
    <NavigationProvider initialOpenState={initialOpenState}>
      <NavigationContent>{children}</NavigationContent>
    </NavigationProvider>
  )
}
