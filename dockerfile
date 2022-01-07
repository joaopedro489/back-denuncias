FROM node:latest

EXPOSE 3333

WORKDIR /var/www/

ENTRYPOINT npm run dev
COPY package*.json /var/www/
COPY .env /var/www/
RUN npm install
RUN npm install pg pg-hstore
