FROM node:alpine
WORKDIR /song/src/index
COPY ./package.json ./
COPY ./database.js ./
COPY ./package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./.env ./
CMD [ "npm","start" ]
# add somting