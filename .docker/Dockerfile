### STAGE 1: Build ###
FROM node:12 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build.prod

### STAGE 2: Serve ###
FROM nginx:stable-alpine

# Configure nginx
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

# Create /var/www
RUN mkdir /var/www/ && \
    chmod -R 777 /var/www/

COPY --from=build /usr/src/app/dist/prod /var/www/
