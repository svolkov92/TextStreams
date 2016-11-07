/**
 * Created by Volkov on 29.10.2016.
 */
import Game from '../models/game';
import Comment from '../models/comment';
import cuid from 'cuid';
import serverConfig from '../config';
import sanitizeHtml from 'sanitize-html';

export function createGame(req, res) {

  let newGame = new Game(req.body.game);
  newGame.cuid = cuid();
  newGame.isActive = true;

  newGame.save((err, saved) => {
    if (err) {
      res.status(500).send(saved);
    } else {
      res.json({game: saved});
    }
  });

}


export function getGames(req, res) {
  Game.find({isActive: true}).sort('name').exec((err, games) => {
    if (err) {
      res.status(500).send(err);
    } else{
      Game.find({ }).sort('name').exec((err, games) => {
        if (err) {
          res.status(500).send(err);
        } else{

          res.json({ games });
        }
      });
    }
  });
}

export function deleteGame(req, res) {
  Game.findOne({ cuid: req.body.game.cuid })
    .then(game => {
      if (!game) {
        res.status(405).end();
      } else {
        game.isActive = false;
        return game.save();
      }
    })
    .then(saved=> {
      res.json({ game: saved });
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}


export function updateGameStatus(io) {
  return function (req, res) {
    Game.findOne({cuid: req.body.game.cuid})
      .then(game => {
        if (!game) {
          res.status(405).end();
        } else {
          game.status = req.body.game.status;
          return game.save();
        }
      })
      .then(saved=> {
        io.sockets.emit("gameStatusUpdated", {"game": saved});
        res.json({game: saved});
      })
      .catch(err=> {
        res.status(500).send(err);
      });
  }
}
