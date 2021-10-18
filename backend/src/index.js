import app from './app';
import { config } from './config';
import { connectToDb } from './db';

const {
  app: { port },
} = config;

connectToDb();

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
