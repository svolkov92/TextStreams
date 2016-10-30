/**
 * Created by Volkov on 30.10.2016.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';


export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';

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
