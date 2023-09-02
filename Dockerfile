# build stage
FROM ruby:latest as build-stage
RUN gem install bundler
RUN gem install jekyll
RUN jekyll --version
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