FROM node:lts-alpine AS dev
WORKDIR /app

COPY *.json ./
RUN npm install

COPY data data


COPY src src

EXPOSE 4000


CMD ["npm", "run", "dev"]
