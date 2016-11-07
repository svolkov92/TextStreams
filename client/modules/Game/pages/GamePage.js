/**
 * Created by Volkov on 30.10.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormControl, Button, Panel } from 'react-bootstrap';
import { getGame, getGames } from '../GameReducer';
import { getComments } from '../../Comment/CommentReducer'
import { addCommentRequest, fetchComments, addComment, removeCommentRequest } from '../../Comment/CommentActions'
import { isAdmin, isReporter } from '../../../util/apiCaller';
import AddComponent from '../components/AddComponent';
import GameCommentList from '../components/GameCommentList';
import styles from '../../../main.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game || { name: '' },
      comments: props.comments || []
    }
  }

  onChangeCurrentComment = (e) => {
    this.setState({['currentComment']: e.target.value});
  };

  commentReceive = (response) => {
    this.props.dispatch(addComment(response.comment));
  };

  componentWillReceiveProps(e){
    if (e.game !== undefined && e.comments !== undefined)
      this.setState({game: e.game, comments: e.comments});
  }

  //componentWillUnmount()
  //{
  //  socket.disconnect()
  //}

  addComment = () => {
    let comment = {
      gameCuid: this.state.game.cuid,
      value: this.state.currentComment
    };

    this.props.dispatch(addCommentRequest(comment));
  };

  deleteComment = (e) => {
    this.props.dispatch(removeCommentRequest({cuid: e.target.id}));
  };

  render() {
    return (
      <div className={styles.w100percents}>

        <Panel collapsible defaultExpanded header={this.state.game.name}>
          <GameCommentList deleteComment={this.deleteComment} comments={this.props.comments} />
        </Panel>

        <AddComponent name="name" value={this.state.currentComment} placeholder="Comment"
                      onChange={this.onChangeCurrentComment} onClick={this.addComment} buttonName="Add Comment" />
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    game: getGame(state, props.params.cuid),
    comments: getComments(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(GamePage);
