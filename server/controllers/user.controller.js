/**
 * Created by Volkov on 29.10.2016.
 */
import User from '../models/user';
import cuid from 'cuid';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { generateRandomToken, sha512 } from '../util/security';
import { USER_LEVEL } from '../constants'

export function create(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    let newUser = new User(req.body.user);
    newUser.cuid = cuid();
    newUser.password_salt = generateRandomToken();
    newUser.password = sha512(newUser.password, newUser.password_salt);
    newUser.accessLevel = USER_LEVEL;

    let payload = { sub: newUser.cuid };

    User.findOne({ email: newUser.email })
      .then((emailUser) => {
        if (emailUser) {
          res.status(403).end();
        } else {
          return newUser.save();
        }
      })
      .then(user => {
        let token = jwt.encode(payload, serverConfig.JWT_TOKEN);
        res.json({ token: token, accessLevel: USER_LEVEL });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

export function updateUserAccessLevel(req, res) {
  console.log(req);
  User.findOne({cuid: req.body.user.cuid})
    .then(user => {
      if (!user) {
        res.status(403).end();
      } else {
        user.accessLevel = req.body.user.accessLevel;
        return user.save();
      }
    })
    .then(saved=> {
      res.json({user: saved});
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}

export function getUsers(req, res) {
  User.find().sort('email').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else{
      res.json({ users });
    }
  });
}
