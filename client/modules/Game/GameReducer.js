/**
 * Created by Volkov on 30.10.2016.
 */

import { ADD_GAMES, ADD_GAME, ADD_COMMENT, ADD_COMMENTS } from './GameActions';

// Initial State
const initialState = { data: [] };

const GameReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_GAME:
      return {
      ...state,
      data: [action.game, ...state.data],
    };

    case ADD_GAMES:
      return {
        ...state,
        data: action.games,
      };

    case ADD_COMMENT:
      return {
        ...state,
        data: state.data.map(obj => action.game.cuid === obj.cuid ? action.game : obj)
      };

    default:
      return state;
  }
};

/* Selectors */

export const getGames = (state) => {
  return state.games.data;
};

export const getGame = (state, cuid) => state.games.data.filter(game => game.cuid === cuid)[0];

// Export Reducer
export default GameReducer;
