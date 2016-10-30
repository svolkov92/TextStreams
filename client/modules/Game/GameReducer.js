/**
 * Created by Volkov on 30.10.2016.
 */

import { ADD_GAMES, ADD_GAME } from './GameActions';

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

    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getGames = (state) => {
  return state.games.data;
};


// Export Reducer
export default GameReducer;
