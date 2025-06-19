FROM node:24-alpine3.21

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package.json package-lock.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]
