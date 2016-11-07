/**
 * Created by Volkov on 30.10.2016.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';
export const UPDATE_GAME = 'UPDATE_GAME';

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

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
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

export function updateGameRequest(game) {
  return (dispatch) => {
    return callApi('games/update', 'post', { game }).then(res => {
    });
  };
}

export function deleteGameRequest(game) {
  return (dispatch) => {
    return callApi('games/delete', 'post', { game }).then(res => {
      dispatch(updateGame(res.game))
    });
  };
}
