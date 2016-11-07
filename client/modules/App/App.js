import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../Comment/CommentActions';
// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    const socket = io.connect();
    socket.on('commentAdded', this.commentReceived);
    socket.on('commentRemoved', this.commentDeleted);
  }

  commentReceived = (response) => {
    this.props.dispatch(addComment(response.comment));
  };

  commentDeleted = (response) => {
    debugger;
    this.props.dispatch(removeComment(response.comment));
  };

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  signOut = () =>
  {
    localStorage.clear();
    browserHistory.push('/');
  };

  render() {
    return (
      <div>
        {false && this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Text Broadcast Service"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />

          <div className={styles.container}>
            <div className={styles.side}></div>
            <div className={styles.center}>
              <Header
                switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
                intl={this.props.intl}
                toggleAddPost={this.toggleAddPostSection}
                signOut = {this.signOut}
              />
              <div className={styles.container}>
                  {this.props.children}
              </div>
            </div>
            <div className={styles.side}></div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
