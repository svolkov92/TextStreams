/**
 * Created by Volkov on 26.10.2016.
 */
// Initial State
const initialState = { };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/* Selectors */
export const getUsers = state => state.users.data;

// Export Reducer
export default UserReducer;
