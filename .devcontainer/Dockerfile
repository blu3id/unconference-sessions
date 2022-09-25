FROM node:18.9.0-alpine3.16

RUN apk add --no-cache --virtual .persistent-deps \
    bash \
    make \
    gcc \
    g++ \
    libstdc++ \
    git \
    && npm install --save-dev -g \
    eslint typescript vite

COPY bashrc /root/.bashrc