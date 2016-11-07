/**
 * Created by Volkov on 30.10.2016.
 */
import * as GameController from '../controllers/game.controller';

export default function (router, protectedMiddleware, io) {
  router.get('/games', GameController.getGames);
  router.post('/games', GameController.createGame);
//  router.post('/games/comments', GameController.addComment);
  router.post('/games/comments', protectedMiddleware, GameController.addCommentSocket(io));
  return router;
};
