FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . .

FROM node:22-alpine3.19 AS frontend

WORKDIR /app

RUN addgroup -S app && adduser -S -G app app

COPY --from=builder --chown=app:app /app /app

RUN chown -R app:app /app

RUN chmod -R 755 /app

USER app

EXPOSE 5173

CMD ["npm", "run", "dev"]