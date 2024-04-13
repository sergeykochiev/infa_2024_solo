FROM node:21

WORKDIR /usr/bin/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["node", "dist/main.js"]