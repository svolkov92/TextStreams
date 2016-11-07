/**
 * Created by Volkov on 26.10.2016.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button  } from 'react-bootstrap';

// Import Style
import styles from './UserStyles.css';
import { signInRequest }from '../UserActions'

export class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = ()=> {
    let user = { email: this.state.email, password: this.state.password };
    this.props.dispatch(signInRequest(user))
  };

  render() {
    return (
      <div className={styles.container} >
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              <FormattedMessage id="email"/>
            </Col>
            <Col sm={4}>
              <FormControl type="email"
                           name="email"
                           placeholder={this.props.intl.messages.userLogin}
                           value={this.state.email}
                           onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              <FormattedMessage id="password"/>
            </Col>
            <Col sm={4}>
              <FormControl type="password"
                           name="password"
                           placeholder={this.props.intl.messages.userPassword}
                           value={this.state.password}
                           onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={4}>
              <Button type="button" onClick={this.signIn}>
                <FormattedMessage id="navSignIn"/>
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SignInPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(SignInPage));
