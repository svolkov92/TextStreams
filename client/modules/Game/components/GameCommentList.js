/**
 * Created by Volkov on 06.11.2016.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function GameCommentList(props) {
  return (
    <div>
      {
        props.comments.map((comment, i)=> (
          <div key={i}>{comment.value}</div>
        ))
      }
    </div>
  );
}

export default GameCommentList;
