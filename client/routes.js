/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './modules/App/App';
import User from './modules/User/User';

import { isAdmin, isReporter, isLoggedIn } from './util/apiCaller';


// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/User/pages/RegistrationPage');
  require('./modules/User/pages/LoginPage');
  require('./modules/User/pages/UserListPage');
}

function requireAdmin(nextState, replace) {
  if (!isAdmin())
       replace('/sign_in');
}

function requireReporter(nextState, replace) {
  if (!isReporter())
    replace('/sign_in');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/registration"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/RegistrationPage').default);
        });
      }}
      />
    <Route
      path="/sign_in"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/LoginPage').default);
        });
      }}
      />
    <Route path="/users" component={User}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/User/pages/UserListPage').default);
          });
        }}
        />
    </Route>
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
  </Route>
);
