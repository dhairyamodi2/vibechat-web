FROM node

WORKDIR /usr/vibechat

COPY ./package.json ./
RUN yarn install


COPY ./ ./

CMD ["yarn", "dev"]