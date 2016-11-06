import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, PageHeader, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { isAdmin, isLoggedIn, getUserName, signOutRequest } from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  const headerLogo = (
    <PageHeader> Text Broadcast Service</PageHeader>
  );

  const navBar = (
    <Nav bsStyle="tabs" justified activeKey="">
      <NavItem eventKey="1" onClick={() => browserHistory.push('/games')} ><FormattedMessage id="navMain"/></NavItem>
      {isAdmin() && <NavItem eventKey="2" onClick={() => browserHistory.push('/users')} ><FormattedMessage id="navUsers"/></NavItem>}
      {!isLoggedIn() && <NavItem eventKey="3"  onClick={() => browserHistory.push('/registration')}><FormattedMessage id="navSignUp"/></NavItem>}
      {!isLoggedIn() && <NavItem eventKey="3" onClick={() => browserHistory.push('/sign_in')}><FormattedMessage id="navSignIn"/></NavItem>}
      <NavDropdown eventKey="4" title={props.intl.messages.navLanguage} id="nav-dropdown">
        <MenuItem eventKey="4.1" onClick={() => props.switchLanguage('en')}>En</MenuItem>
        <MenuItem eventKey="4.2" onClick={() => props.switchLanguage('fr')}>Ru</MenuItem>
      </NavDropdown>
      {
        isLoggedIn() &&
        <NavDropdown eventKey="5" title={getUserName()} id="nav-dropdown">
          <MenuItem eventKey="5.1" onClick={() => props.signOut()} ><FormattedMessage id="navSignOut"/></MenuItem>
        </NavDropdown>
      }
    </Nav>
  );

  return (
    <div>
      {headerLogo}
      {navBar}
    </div>

  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
