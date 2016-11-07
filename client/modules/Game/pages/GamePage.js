/**
 * Created by Volkov on 30.10.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { getGame, getGames } from '../GameReducer';
import { getComments } from '../../Comment/CommentReducer'
import { addCommentRequest, fetchComments } from '../../Comment/CommentActions'
import { isAdmin, isReporter } from '../../../util/apiCaller';

import AddComponent from '../components/AddComponent';
import GameCommentList from '../components/GameCommentList';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { game: props.game || { }, comments: props.comments || [] }
  }

  onChangeCurrentComment = (e) => {
    this.setState({['currentComment']: e.target.value});
  };

  componentDidMount() {
    debugger;
    this.setState({game: this.props.game, comments: this.props.comments});

    const socket = io.connect();
    socket.on('comment', this.commentReceive);
    //socket.on('comment', function(data){
    //  console.log('123 test')
    //}.bind(this));
  }

  commentReceive = (response) => {
    debugger;
    if (response.game.cuid == this.state.game.cuid)
    {
      this.setState({game: response.game});

      this.props.dispatch(addCommentRequest(comment));
    }
  };

  addComment = () => {
    //debugger;
    //socket.emit('comment', { gameCuid: 'ciux94ln40000m4n4sid59zud', value: 'yohoho' });
    let comment = {
      gameCuid: this.state.game.cuid,
      value: this.state.currentComment
    };

    this.props.dispatch(addCommentRequest(comment));

    //var game = this.state.game;
    //game.comments.push(comment.value);
    //this.setState({game: game});
  };

  render() {

    return (
      <div>
        <h2>{this.state.game.name}</h2>

        <GameCommentList comments={this.props.comments} />

        <AddComponent name="name" value={this.state.currentComment} placeholder="Comment"
                      onChange={this.onChangeCurrentComment} onClick={this.addComment} buttonName="Add Comment" />
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  var test = getGame(state, props.params.cuid);
  var test1 = getGames(state);

  return {
    game: getGame(state, props.params.cuid),
    comments: getComments(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(GamePage);
