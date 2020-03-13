FROM node:10

WORKDIR /usr/src/backend
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./.env ./.env

EXPOSE 6001
CMD [ "node", "./dist/app.js" ]
