import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({
    message: `The server is running on port ${process.env.APP_PORT}`,
  });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

export default routes;
