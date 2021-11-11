FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENV PORT=5000
ENV MONGO_URL=mongodb://host.docker.internal:27017/note-taking-app

CMD ["yarn","start"]