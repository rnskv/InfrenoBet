FROM node:10

WORKDIR /usr/src/deamons
COPY ./ ./
WORKDIR /usr/src/deamons/steam
RUN npm ci

CMD [ "npm", "run", "start:prod" ]