FROM node:20 AS backend
WORKDIR /app/
COPY backend/package*.json .
RUN npm install
COPY /backend /app
COPY backend/tsconfig.json /app
RUN npm run build
EXPOSE 8080
CMD ["npm","start"]