#########
# BUILD
#########
FROM --platform=linux/amd64 node:18.19.1-alpine AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Копируем исходники
COPY tsconfig.json ./
COPY esbuild.config.js ./
COPY src ./src

# Сборка
RUN yarn tsc --noEmit \
  && node esbuild.config.js \
  && npx pkg -t node18-alpine-x64 --out-path dist-binary ./dist/index.js

#########
# DEPLOY
#########
FROM --platform=linux/amd64 alpine:3.20.0 AS deploy

WORKDIR /app

RUN apk add bash \
  && apk add curl \
  && curl -sSf https://atlasgo.sh | sh

COPY swagger-ui-dist ./swagger-ui-dist
COPY database ./database
COPY --from=build ./app/dist-binary ./dist-binary

#Команда для запуска сервера внутри контейнера
CMD ["/bin/bash", "-c", "./database/db-migrate.sh && ./dist-binary/index"]

#########
# Если не нужны миграции
#########

# RUN apk add bash

# COPY swagger-ui-dist ./swagger-ui-dist
# COPY --from=build ./app/dist-binary ./dist-binary

# #Команда для запуска сервера внутри контейнера
# CMD ["/bin/bash", "-c", "./dist-binary/index"]
