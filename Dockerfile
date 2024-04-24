# Stage 1: React アプリをビルドする
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Nginx にて、アプリを立ち上げる
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80