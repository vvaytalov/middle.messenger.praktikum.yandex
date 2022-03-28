FROM node:14

WORKDIR /workdir
COPY package*.json ./

RUN npm i
COPY . .
EXPOSE 3000
CMD npm run build && npm run start


# RUN apt update && apt install -y nodejs && apt install -y npm
# COPY dist ./dist/
# COPY server ./
# RUN npm i
# EXPOSE 3000
# CMD node ./server.js
