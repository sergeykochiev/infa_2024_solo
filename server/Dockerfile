FROM node:21.7.3-bullseye as build

WORKDIR /usr/bin/app

COPY package*.json ./

RUN npm i -D

COPY . .

RUN npm run build


FROM node:21.7.3-bullseye

WORKDIR /usr/bin/app


COPY --from=build /usr/bin/app/dist ./dist
COPY --from=build /usr/bin/app/package*.json ./

RUN npm i --omit=dev

EXPOSE 8080

CMD ["node", "dist/main.js"]