FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run-script build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "start" ]