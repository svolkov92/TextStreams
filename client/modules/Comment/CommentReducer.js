/**
 * Created by Volkov on 30.10.2016.
 */

import { ADD_COMMENT, ADD_COMMENTS, REMOVE_COMMENT } from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_COMMENT:
      return {
      ...state,
      data: [action.comment, ...state.data],
    };

    case ADD_COMMENTS:
      return {
        ...state,
        data: action.comments,
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        data: state.data.map(obj => action.comment.cuid === obj.cuid ? action.comment : obj)
      };

    default:
      return state;
  }
};

/* Selectors */

export const getComments = (state, gameCuid) => {
  let sort = (a,b) => a.time - b.time;

  return state.comments.data.filter(comment => comment.isActive === true && comment.gameCuid == gameCuid).sort(sort);
};

// Export Reducer
export default CommentReducer;
