# Use multistage builds to take node and npm binaries from another base image
FROM node:18.5.0-buster-slim AS build-node

FROM openjdk:14-slim-buster
COPY --from=build-node /usr/local/bin/node /usr/local/bin/node
COPY --from=build-node /usr/local/lib/node_modules /usr/local/lib/node_modules

# Install Git
RUN apt-get update && apt-get install -y git graphviz wget ttf-dejavu fontconfig
# Use newer version if possible
ENV PLANTUML_VERSION=1.2022.6
RUN wget "https://github.com/plantuml/plantuml/releases/download/v$PLANTUML_VERSION/plantuml-$PLANTUML_VERSION.jar" -O plantuml.jar -O $JAVA_HOME/lib/plantuml.jar

RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN npm i -g yarn

RUN mkdir /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN rm -rf node_modules/

# Install node dependencies
RUN yarn install
RUN apt-get install -y make
ENV LANG en_US.UTF-8

ENTRYPOINT []
