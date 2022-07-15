import express, { json } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/error';
import { config } from './config/config';
import { productRouter } from './routers/productRouter';
import { adminRouter } from './routers/adminRouter';

const app = express();

app
  .use(
    cors({
      origin: config.smallShopCorsOrigin,
    })
  )
  .use(json())
  .use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    })
  )

  .use('/product', productRouter)
  .use('/admin', adminRouter)
  .use(handleError)
  .listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
  });
