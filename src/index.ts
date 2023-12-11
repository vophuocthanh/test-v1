import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { router as auth } from './modules/auth/auth.controller';
import { router as orgs } from './modules/orgs/orgs.controller';
import { errorFilter } from './middlewares/error-filters';

const app = new Hono().basePath('/api');

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.route('/', auth);
app.route('/orgs', orgs);

app.notFound((c) => c.json({ status: 404, message: 'Not found' }, 404));

app.onError(errorFilter);
console.log('asdsadasdsa');

serve(app, () => {
  console.log(
    'Server is runningsadasdasdsdasdsadsadsaas on http://localhost:3000'
  );
});
