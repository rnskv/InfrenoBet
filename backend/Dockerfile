FROM node:10

WORKDIR /usr/src/backend
COPY ./package*.json ./
RUN npm install --no-optional

WORKDIR /usr/src/backend
COPY . .
RUN npm run build:dev
EXPOSE 6001
CMD [ "node", "./dist/app.js" ]
