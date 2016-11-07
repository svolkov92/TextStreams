/**
 * Created by Volkov on 30.10.2016.
 */
import * as GameController from '../controllers/game.controller';

export default function (router, protectedMiddleware, io) {
  router.get('/games', GameController.getGames);
  router.post('/games', protectedMiddleware, GameController.createGame);
  router.post('/games/update', protectedMiddleware, GameController.updateGameStatus(io));
  router.post('/games/delete', protectedMiddleware, GameController.deleteGame);

  return router;
};
