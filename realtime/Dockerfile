FROM node:10

WORKDIR /usr/src/realtime
COPY ./realtime/package*.json ./
RUN npm install --no-optional

WORKDIR /usr/src/shared
COPY ./shared .
RUN npm install --no-optional

WORKDIR /usr/src/realtime
COPY ./realtime .
RUN npm run build:dev
EXPOSE 3000
CMD [ "node", "./dist/app.js" ]
