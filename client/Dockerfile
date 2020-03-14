FROM node:10

WORKDIR /usr/src/client
COPY ./dist ./dist
COPY ./node_modules ./node_modules

EXPOSE 6003
CMD [ "node", "./dist/inferno-server.js" ]
