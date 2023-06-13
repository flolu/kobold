import {FC, ReactNode, useContext, useState} from 'react'

import {ErrorIcon} from '@/components/icons/error.icon'
import {InfoIcon} from '@/components/icons/info.icon'
import {classes} from '@/lib/classes'

import {createContextHack} from './contextUtils'

export enum SnackbarType {
  Info = 'info',
  Error = 'error',
}

export interface SnackbarContext {
  info: (text: string, duration?: number) => void
  error: (text: string, duration?: number) => void
}

export interface SnackbarState {
  text: string
  show: boolean
  type: SnackbarType
}

export const SnackbarContextImpl = createContextHack<SnackbarContext>()

export function useSnackbar() {
  return useContext(SnackbarContextImpl)
}

interface Props {
  children?: ReactNode
}

export const SnackbarProvider: FC<Props> = ({children}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    text: '',
    show: false,
    type: SnackbarType.Info,
  })

  function info(text: string, duration = 3000) {
    const textString = String(text)
    setSnackbar({...snackbar, show: true, text: textString, type: SnackbarType.Info})
    setTimeout(() => {
      setSnackbar({...snackbar, text: textString, show: false})
    }, duration)
  }

  function error(text: string, duration = 5000) {
    const textString = String(text)
    setSnackbar({...snackbar, show: true, text: textString, type: SnackbarType.Error})
    setTimeout(() => {
      setSnackbar({...snackbar, text: textString, show: false})
    }, duration)
  }

  return (
    <SnackbarContextImpl.Provider value={{info, error}}>
      <>
        <div className="fixed z-50 flex justify-center pointer-events-none left-4 right-4 bottom-20 sm:bottom-8">
          <div
            className={classes(
              'flex items-center max-w-xs px-4 py-2 space-x-2 text-base border-2 shadow-xl rounded-xl sm:max-w-lg duration-100 transform',
              snackbar.type === SnackbarType.Error &&
                'bg-[#FCA5A5] text-[#4e1010] border-[#EF4444] border-opacity-50',
              snackbar.type === SnackbarType.Info &&
                'bg-primary-900 text-background-900 border-primary-50',
              snackbar.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
          >
            {snackbar.type === SnackbarType.Info && (
              <i className="rounded-full fill-current min-w-[1.75rem] w-7 h-7 text-primary-50">
                <InfoIcon />
              </i>
            )}
            {snackbar.type === SnackbarType.Error && (
              <i className="rounded-full fill-current min-w-[1.75rem] w-7 h-7">
                <ErrorIcon />
              </i>
            )}
            <span>{snackbar.text}</span>
          </div>
        </div>

        {children}
      </>
    </SnackbarContextImpl.Provider>
  )
}
