import dotenv from 'dotenv';
dotenv.config();
import { database } from '@leonardosarmentocastro/database';

import { server } from './src/server.js';
import { seedDatabase } from './src/__seeds__/index.js';

(async () => {
  try {
    await database.connect();

    const shouldSeedDatabase = (process.env.NODE_ENV !== 'production' && process.env.SEED_DATABASE === 'true');
    if (shouldSeedDatabase) await seedDatabase();

    /* const api = */ await server.start();
  } catch(err) {
    console.error(err);
  }
})();
