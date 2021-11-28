FROM node:14.17.5-alpine

WORKDIR /react

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
RUN yarn build

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]