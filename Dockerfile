FROM node:12-slim

RUN mkdir /email-service
COPY . /email-service

WORKDIR /email-service

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
