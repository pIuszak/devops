FROM node:alpine

WORKDIR /opt/nwd

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm","run","start"]


