export const environment = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
}

export const serverEnvironment = {
  baseDomain: process.env.BASE_DOMAIN,
}
