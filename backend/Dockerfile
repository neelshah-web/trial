FROM node:18.19.1-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]