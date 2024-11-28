import dotenv from 'dotenv';
import express from 'express';
import router from './routes/routes';
import initDatabase from './db/utils/initDatabase';
import HttpError from './error/HttpError';

dotenv.config({ path: '../.env' });

const app = express();

app.use(express.json());

app.use(router);

setTimeout(() => {
  console.log("waiting for db...");
  initDatabase().then(() => {
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  }).catch((err) => {
    console.error("Error initializing database:", err);
  });
}, 10000);

