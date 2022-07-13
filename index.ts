import express, { json } from 'express';
import cors from 'cors';
import { handleError } from './utils/error';
import { config } from './config/config';

const app = express();

app
  .use(
    cors({
      origin: config.smallShopCorsOrigin,
    })
  )
  .use(json())

  .use(handleError)
  .listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
  });
