/**
 * Created by Volkov on 29.10.2016.
 */
import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.post('/users/registration', UserController.create);
  return router;
};