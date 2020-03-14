FROM node:10

RUN npm run build:dev
WORKDIR /usr/src/backend
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./.env ./.env

EXPOSE 6001
CMD [ "node", "./dist/app.js" ]
