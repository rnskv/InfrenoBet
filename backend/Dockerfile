FROM node:10

WORKDIR /usr/src/backend
COPY ./backend/package*.json ./
RUN npm install --no-optional

WORKDIR /usr/src/shared
COPY ./shared .
RUN npm install --no-optional

WORKDIR /usr/src/backend
COPY ./backend .
RUN npm run build:dev
EXPOSE 2020
CMD [ "node", "./dist/app.js" ]
