FROM node:18.18.2

COPY package.json .
COPY .env .
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
