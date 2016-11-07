/**
 * Created by Volkov on 29.10.2016.
 */
import Game from '../models/game';
import Comment from '../models/comment';
import cuid from 'cuid';
import serverConfig from '../config';
import sanitizeHtml from 'sanitize-html';


export function getComments(req, res) {
  Comment.find({isActive: true}).sort('time').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else{
      res.json({ comments });
    }
  });
}

export function addCommentSocket(io) {
  return function (req, res) {
    let newComment = new Comment(req.body.comment);
    newComment.cuid = cuid();
    newComment.time = (new Date()).getTime();

    newComment.save((err, saved) => {
      if (err) {
        res.status(500).send(saved);
      } else {
        io.sockets.emit("commentAdded", {"comment": saved});
        res.json({comment: saved});
      }
    });
  }
}

export function deleteCommentSocket(io) {
  return function (req, res) {
    Comment.findOne({ cuid: req.body.comment.cuid })
      .then(comment => {
        if (!comment) {
          res.status(405).end();
        } else {
          comment.isActive = false;
          return comment.save();
        }
      })
      .then(saved=> {
        io.sockets.emit("commentRemoved", {"comment": saved});
        res.json({ comment: saved });
      })
      .catch(err=> {
        res.status(500).send(err);
      });
  }
}
