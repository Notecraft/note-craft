FROM node:14
WORKDIR /usr/src/app
COPY ./dist
EXPOSE 8000
CMD ["node", "./dist/server/app.js"]