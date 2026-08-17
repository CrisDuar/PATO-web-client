FROM node:26-alpine3.23 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# NGINX WEB SERVER
FROM nginx:1.31.1-alpine AS runner
COPY --from=builder /app/dist/PATO-web-client/browser /usr/share/nginx/html

EXPOSE 80
