FROM node:22-alpine3.19 AS frontend

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
