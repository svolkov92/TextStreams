/**
 * Created by Volkov on 30.10.2016.
 */
import * as CommentController from '../controllers/comment.controller';

export default function (router, protectedMiddleware, io) {
  router.get('/comments', CommentController.getComments);
  router.post('/comments', protectedMiddleware, CommentController.addCommentSocket(io));
  router.post('/comments/delete', protectedMiddleware, CommentController.deleteCommentSocket(io));
  return router;
};
