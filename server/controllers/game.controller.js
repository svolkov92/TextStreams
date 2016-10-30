/**
 * Created by Volkov on 29.10.2016.
 */
import Game from '../models/game';
import cuid from 'cuid';
import serverConfig from '../config';

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

  Game.find().sort('name').exec((err, games) => {
    if (err) {
      res.status(500).send(err);
    } else{
      res.json({ games });
    }
  });
}
