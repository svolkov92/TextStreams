/**
 * Created by Volkov on 26.10.2016.
 */

import { ADD_USERS } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_USERS:
      return {
        ...state,
        data: action.users,
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
