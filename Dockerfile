FROM node:20-slim as development

WORKDIR /usr/src/user

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:20-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/user

RUN mkdir -p logs && touch logs/app.log

COPY package*.json ./

RUN npm install --only=prod --force

COPY . .

COPY --from=development /usr/src/user/dist ./dist

CMD [ "node", "dist/main" ]