import {createContext} from 'react'

export type Setter<T> = (value: T) => void
export type Getter<T> = () => T

export function createContextHack<T>() {
  return createContext<T>({} as any)
}
