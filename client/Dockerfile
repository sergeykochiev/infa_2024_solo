FROM node as build

WORKDIR /usr/bin/app

COPY . .

RUN npm i
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /usr/bin/app/dist /usr/share/nginx/html
COPY --from=build /usr/bin/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]