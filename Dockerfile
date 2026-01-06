# build stage
FROM ruby:3.2 AS build-stage
RUN gem install bundler
RUN gem install jekyll
WORKDIR /app
RUN mkdir .jekyll-cache
RUN mkdir _site
COPY . .
RUN bundler
RUN bundler exec jekyll build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/_site /srv/www
COPY ./nginx.conf /etc/nginx/custom.conf
EXPOSE 80
CMD ["nginx", "-c", "/etc/nginx/custom.conf", "-g", "daemon off;"]