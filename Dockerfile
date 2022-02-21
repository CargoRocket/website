# build stage
FROM jekyll/jekyll:latest as build-stage
WORKDIR /app
RUN mkdir .jekyll-cache
RUN mkdir _site
COPY . .
RUN jekyll build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/_site /srv/www
COPY ./nginx.conf /etc/nginx/custom.conf
EXPOSE 80
CMD ["nginx", "-c", "/etc/nginx/custom.conf", "-g", "daemon off;"]