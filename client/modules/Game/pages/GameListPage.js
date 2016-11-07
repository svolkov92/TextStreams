/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import { browserHistory } from 'react-router';
//reducers
import { getGames } from '../GameReducer';
//actions
import { addGameRequest, addCommentRequest } from '../GameActions';
import { isAdmin, isReporter } from '../../../util/apiCaller';
//components
import AddComponent from '../components/AddComponent'
//styles
import styles from './GameStyles.css';

class GameListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] }
  }

  componentDidMount() {
    this.setState({ games: this.props.games });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  addGame = () => {
    let game = {
      name: this.state.name
    };

    this.props.dispatch(addGameRequest(game));
  };

  render() {
    return (
      <div className={styles.games}>
        {
          (isAdmin() || isReporter()) &&
          <AddComponent name="name" value={this.state.name} placeholder="Type Game Name"
            onChange={this.onChange} onClick={this.addGame} buttonName="Add Game" />

        }
        <ButtonGroup vertical block>
          {
            this.props.games.map(game=> (
              <Button onClick={() => browserHistory.push(`/games/${game.cuid}`)} key={game.cuid}>
                {game.name}
              </Button>
            ))
          }
        </ButtonGroup>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    games: getGames(state),
  };
}

export default connect(mapStateToProps)(GameListPage);
