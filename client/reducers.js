/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import users from './modules/User/UserReducer';
import games from './modules/Game/GameReducer';
import comments from './modules/Comment/CommentReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  users,
  games,
  comments
});
