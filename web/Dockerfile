FROM node:lts-alpine AS deps
RUN npm --silent install --global --depth 0 pnpm
RUN apk add --no-cache libc6-compat

WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

###

FROM node:lts-alpine AS builder
RUN npm --silent install --global --depth 0 pnpm

WORKDIR /home/node/app

COPY --from=deps /home/node/app/node_modules ./node_modules
COPY . .

RUN pnpm build

###

FROM node:lts-alpine AS runner
WORKDIR /home/node/app

ENV NODE_ENV production

COPY --from=builder /home/node/app/next.config.js ./
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/.env.production ./.env.production

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Some things are not allowed (see https://github.com/vercel/next.js/issues/38119#issuecomment-1172099259)
COPY --from=builder --chown=node:node /home/node/app/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]