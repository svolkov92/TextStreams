/**
 * Created by Volkov on 30.10.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { getGame } from '../GameReducer';
import { addGameRequest, addCommentRequest } from '../GameActions';
import { isAdmin, isReporter } from '../../../util/apiCaller';

import AddComponent from '../components/AddComponent';
import GameCommentList from '../components/GameCommentList';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { game: props.game }
  }

  onChangeCurrentComment = (e) => {
    this.setState({['currentComment']: e.target.value});
  };

  componentDidMount() {
    this.setState({game: this.props.game});

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


        <GameCommentList comments={this.props.game.comments} />

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
  };
}

export default connect(mapStateToProps)(GamePage);
