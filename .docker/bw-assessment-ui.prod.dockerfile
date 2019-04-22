FROM nginx:stable-alpine

# Configure nginx
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

# Create /var/www
RUN mkdir /var/www/ && \
    chmod -R 777 /var/www/

COPY ./dist/prod /var/www/

COPY ./src/assets/agreement /var/www/
