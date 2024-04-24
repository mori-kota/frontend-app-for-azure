# Stage 1: Build the React app
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80