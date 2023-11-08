FROM node:alpine
WORKDIR /song/src/index
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./.env ./
CMD [ "npm","start" ]