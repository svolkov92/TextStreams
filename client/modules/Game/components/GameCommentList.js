/**
 * Created by Volkov on 06.11.2016.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ButtonGroup, Button, FormGroup, InputGroup, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from '../../../main.css';

function GameCommentList(props) {
  return (
    <ListGroup fill>
      {
        props.comments.map((comment, i)=> (
            <ListGroupItem key={i}>
              <Button onClick={props.deleteComment} id={comment.cuid} bsStyle="danger">Delete</Button>
              <span className={styles.ml10}>
                {comment.value}
              </span>
            </ListGroupItem>
        ))
      }
    </ListGroup>
  );
}

export default GameCommentList;
