# build

FROM node:20-alpine AS build

WORKDIR /nestjs-sock

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

# production

FROM node:20-alpine AS prod

COPY --from=build /nava_nest/package.json ./package.json

COPY --from=build /nava_nest/node_modules ./node_modules

COPY --from=build /nava_nest/dist ./dist

COPY --from=build /nava_nest/.env ./.env

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
