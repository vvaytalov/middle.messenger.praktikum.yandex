FROM node:16

WORKDIR /workdir
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run start
