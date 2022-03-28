FROM node:16

WORKDIR /workdir
COPY package*.json ./

RUN npm i
COPY . .
EXPOSE 3000
CMD npm run build && npm run start
