# Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm i --save-dev @types/node
RUN npm install

COPY . .

RUN rm -rf dist

RUN npm run build

RUN ls

CMD ["npm", "run", "start:dev"]

EXPOSE 3000
