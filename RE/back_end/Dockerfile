FROM node:8.11.4
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 1338
CMD sails lift --port 1338