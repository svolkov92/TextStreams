/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Panel, FormControl, Button } from 'react-bootstrap';

import { getGames } from '../GameReducer';
import { addGameRequest } from '../GameActions';

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
      <div>
        <div>
          <FormControl
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Type Game Name"
              onChange={this.onChange}
              />
          <Button bsStyle="primary" onClick={this.addGame}>Add Game</Button>
        </div>
        <Accordion>
          {
            this.props.games.map(game=> (
              <Panel header={game.name} eventKey={game.cuid}>
                Text
              </Panel>
            ))
          }
        </Accordion>
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
