import {setCookie} from 'nookies'
import {FunctionComponent, ReactNode, useContext, useState} from 'react'

import {createContextHack, Setter} from './contextUtils'

export interface NavigationContext {
  isOpen: boolean
  setOpen: Setter<boolean>
  toggleOpen: () => void
}

export interface Props {
  initialOpenState?: boolean
  children?: ReactNode
}

const NavigationContextImpl = createContextHack<Partial<NavigationContext>>()

export function useNavigation() {
  return useContext(NavigationContextImpl) as NavigationContext
}

export const IS_NAVIGATION_OPEN_COOKIE_NAME = 'navigation.isOpen'

export const NavigationProvider: FunctionComponent<Props> = ({children, initialOpenState}) => {
  const [isOpen, _setOpen] = useState(initialOpenState)

  const setOpen = (value: boolean) => {
    _setOpen(value)
    setCookie(null, IS_NAVIGATION_OPEN_COOKIE_NAME, String(value))
  }

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  return (
    <NavigationContextImpl.Provider value={{isOpen, setOpen, toggleOpen}}>
      {children}
    </NavigationContextImpl.Provider>
  )
}
