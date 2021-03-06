FROM node:6
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm","start"]