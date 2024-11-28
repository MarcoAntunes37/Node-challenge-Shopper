FROM node:20 AS frontend
WORKDIR /app
COPY frontend/package*.json .
RUN npm ci
COPY /frontend /app
RUN npm run build
COPY frontend/build /app
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "/app/build", "-p", "80"]