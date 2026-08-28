FROM node:26-alpine3.23 AS builder

ARG PRODUCTION=false
ARG APIADDR='http://127.0.0.1:8080'

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN echo "\
export const environment = {\
    production: ${PRODUCTION},\
    apiAddr: '${APIADDR}'\
};" > ./src/environments/environment.development.ts

RUN npm run build


# NGINX WEB SERVER
FROM nginx:1.31.1-alpine AS runner
COPY --from=builder /app/dist/PATO-web-client/browser /usr/share/nginx/html

EXPOSE 80
