FROM node:20.13.1 AS base

ENV NODE_ENV=production
WORKDIR /nestjs-sock
COPY package.json .

RUN npm i -g @nestjs/cli
RUN npm i
COPY . .

FROM base AS dev
CMD ["npm", "run", "start:dev"]

FROM base AS prod
RUN npm run build
CMD ["npm", "run", "start:prod"]