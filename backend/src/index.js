import app from './app';
import { config } from './config';

const {
  app: { port },
} = config;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
