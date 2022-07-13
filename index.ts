import express, { json } from 'express';
import cors from 'cors';
import { handleError } from './utils/error';

const app = express();

app
  .use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
  .use(json())

  .use(handleError)
  .listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
  });
