import express, { json } from 'express';
import cors from 'cors';

const app = express();

app
  .use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
  .use(json())
  .listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
  });
