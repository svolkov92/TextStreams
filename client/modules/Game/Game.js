/**
 * Created by Volkov on 30.10.2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { fetchGames } from './GameActions';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(fetchGames());
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return this.props.children;
  }
}
// Actions required to provide data for this component to render in sever side.
Game.need = [() => {
  return fetchGames();
}];

Game.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Game);
