FROM node:alpine as builder
WORKDIR /opt/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build


FROM nginx
COPY --from=builder /opt/app/build /usr/share/nginx/html
