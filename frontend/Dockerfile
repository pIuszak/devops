#1 budowanie
FROM node:alpine as builder

WORKDIR /opt/app

COPY ./package.json .

RUN yarn install

COPY . .

#CMD ["yarn","build"]
RUN yarn build

#2 docelowy ze skopiowaną wersją produkcyjną
FROM nginx

COPY --from=builder /opt/app/build /usr/share/nginx/html


