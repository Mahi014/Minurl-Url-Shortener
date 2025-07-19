FROM node:18 AS build

WORKDIR /app


ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci

COPY . .


RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" >> .env

RUN npm run build


FROM node:18-alpine AS runtime

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000", "--single"]