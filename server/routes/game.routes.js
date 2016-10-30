/**
 * Created by Volkov on 30.10.2016.
 */
import * as GameController from '../controllers/game.controller';

export default function (router, protectedMiddleware) {
  router.get('/games', GameController.getGames);
  router.post('/games', GameController.createGame);
  return router;
};
