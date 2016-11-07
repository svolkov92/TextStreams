/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormControl, Button, Panel } from 'react-bootstrap';
//reducers
import { getGame, getGames } from '../GameReducer';
import { getComments } from '../../Comment/CommentReducer'
//actions
import { addCommentRequest, addComment, removeCommentRequest } from '../../Comment/CommentActions'
import { updateGameRequest, deleteGameRequest } from '../GameActions'
import { isAdmin, isReporter } from '../../../util/apiCaller';
//components
import AddComponent from '../components/AddComponent';
import GameCommentList from '../components/GameCommentList';
//styles
import styles from '../../../main.css';
import gameStyles from './GameStyles.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game || { name: '', status: '' },
      comments: props.comments || []
    }
  }

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  componentWillReceiveProps(e){
    if (e.game !== undefined && e.comments !== undefined)
      this.setState({game: e.game, comments: e.comments});
  }

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

  updateGame = () => {
    let game = {
      cuid: this.state.game.cuid,
      status: this.state.newGameStatus,
    };

    this.props.dispatch(updateGameRequest(game));
  };

  deleteGame = () => {
    var game = {
      cuid: this.state.game.cuid,
    };

    this.props.dispatch(deleteGameRequest(game));
  }



  render() {
    return (
      <div className={styles.w100percents}>

        <Panel collapsible defaultExpanded header={this.state.game.name}>

          <h3 className={gameStyles.status}>{this.state.game.status}</h3>

          <GameCommentList deleteComment={this.deleteComment} comments={this.props.comments} />

          {(isAdmin() || isReporter()) &&
            <AddComponent name="currentComment" value={this.state.currentComment} placeholder="Comment"
                          onChange={this.onChangeInput} onClick={this.addComment} buttonName="Add Comment" /> }

        </Panel>

        {(isAdmin() || isReporter()) &&
          <AddComponent name="newGameStatus" value={this.state.newGameStatus} placeholder="Status"
                      onChange={this.onChangeInput} onClick={this.updateGame} buttonName="Update Status" /> }

        {(isAdmin() || isReporter()) &&
          <Button onClick={this.deleteGame} bsStyle="danger">Delete</Button> }

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
