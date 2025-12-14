FROM node:25-alpine

WORKDIR /app

COPY --from=monorepo package-lock.json /app
COPY package.json /app

RUN npm i

COPY . /app

RUN npm run build

CMD ["npm", "run", "start"]
