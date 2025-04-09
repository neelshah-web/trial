# Stage 1: Build the Angular application
FROM node:18.19.1 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25.4-alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/angular-15-crud /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80