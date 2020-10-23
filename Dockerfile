FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./dist ./dist
EXPOSE $PORT
CMD ["node", "./dist/server/app.js"]