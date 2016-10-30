/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { addGameRequest } from '../GameActions';

export class AddGameComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  addGame = () => {
    let form = new FormData();

    form.append('game[name]', this.state.name);

    this.props.dispatch(addGameRequest(form));
  };

  render(){
    return (
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
    )
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(AddGameComponent);
