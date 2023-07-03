FROM node:18.16.1-alpine
WORKDIR /valorant-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma migrate dev
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/src/main" ]
