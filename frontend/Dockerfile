FROM node:23-alpine AS base

WORKDIR /app

FROM base
RUN npm install -g pnpm
CMD ["pnpm", "run", "dev"]