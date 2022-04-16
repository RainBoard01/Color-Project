FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

FROM imagename....
ARG API_HOSTNAME=${API_HOSTNAME}
ARG API_PORT=${API_HOSTNAME}

EXPOSE 3000

CMD ["npm", "start"]