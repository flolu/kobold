import cors from 'cors'

import {Exception} from '@kobold/exceptions'

// TODO not sure if we should differentiate between prod and dev
export const corsMiddleware = (isProduction: boolean, ...whitelist: string[]) => {
  return cors({
    origin: (origin, callback: (error: Error | null, allow: boolean) => void) => {
      if (!isProduction) return callback(null, true)
      if (origin === undefined) return callback(null, true)
      if (origin && whitelist.includes(origin)) callback(null, true)
      else callback(new Exception({name: 'blocked_by_cors'}), false)
    },
    credentials: true,
  })
}
