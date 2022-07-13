import { createPool } from 'mysql2/promise';
import { config } from '../config/config';

export const poll = createPool({
  host: config.dbHost,
  user: config.dbUser,
  database: config.dbDatabase,
  namedPlaceholders: true,
  decimalNumbers: true,
});
