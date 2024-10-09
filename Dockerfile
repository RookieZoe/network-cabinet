FROM node:20.12.1 AS builder

WORKDIR /temp

RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/

COPY . .

RUN npm install

RUN npm run build

#########=========>

FROM nginx:stable AS server
ADD --from=builder /temp/dist /var/www/html
ADD --from=builder /temp/nginx-web-pc.conf /etc/nginx/conf.d/default.conf
