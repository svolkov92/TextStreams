/**
 * Created by Volkov on 26.10.2016.
 */

import { ADD_USERS, UPDATE_GAME } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_USERS:
      return {
        ...state,
        data: action.users,
      };

    case UPDATE_GAME:
      return {
        ...state,
        data: state.data.map(obj => action.user.cuid === obj.cuid ? action.user : obj)
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getUsers = (state) => {
  return state.users.data;
};


// Export Reducer
export default UserReducer;
