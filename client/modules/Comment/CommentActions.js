/**
 * Created by Volkov on 30.10.2016.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment,
  };
}

export function fetchComments() {
  return (dispatch) => {
    return callApi('comments').then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', { comment }).then(res => {
    });
  };
}

export function removeCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments/delete', 'post', { comment }).then(res => {
      dispatch(removeComment(res.comment))
    });
  };
}
