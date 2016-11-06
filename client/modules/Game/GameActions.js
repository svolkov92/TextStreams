/**
 * Created by Volkov on 30.10.2016.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';


export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';

export function addGame(game) {
  return {
    type: ADD_GAME,
    game,
  };
}

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

export function addComment(game) {
  return {
    type: ADD_COMMENT,
    game,
  };
}

export function fetchGames() {
  return (dispatch) => {
    return callApi('games').then(res => {
      dispatch(addGames(res.games));
    });
  };
}

export function addGameRequest(game) {
  return (dispatch) => {
    return callApi('games', 'post', { game }).then(res => {
      dispatch(addGame(res.game))
    });
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('games/comments', 'post', { comment }).then(res => {
      dispatch(addComment(res.game))
    });
  };
}
