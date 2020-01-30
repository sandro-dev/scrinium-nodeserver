import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({message: 'The server is running on port ' + process.env.APP_PORT })
})

export default routes;