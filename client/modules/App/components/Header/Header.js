import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, PageHeader, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  const headerLogo = (
    <PageHeader> Text Broadcast Service</PageHeader>
  );

  this.handleSelect = (selectedKey) => {
    alert('selected ' + selectedKey);
  };

  const navBar = (
    <Nav bsStyle="tabs" justified activeKey="1" onSelect={this.handleSelect}>
      <NavItem eventKey="1" href="#">Main</NavItem>
      <NavItem eventKey="2" href="#">History</NavItem>
      <NavItem eventKey="3" >Sign Up</NavItem>
      <NavItem eventKey="3" >Sign In</NavItem>
      <NavDropdown eventKey="4" title="Language" id="nav-dropdown">
        <MenuItem eventKey="4.1">En</MenuItem>
        <MenuItem eventKey="4.2">Ru</MenuItem>
      </NavDropdown>
    </Nav>
  );

  return (
    <div>
      {headerLogo}
      {navBar}
    </div>
    //<div className={styles.header}>
    //
    //  <div className={styles['language-switcher']}>
    //    <ul>
    //      <li><FormattedMessage id="switchLanguage" /></li>
    //      {languageNodes}
    //    </ul>
    //  </div>
    //  <div className={styles.content}>
    //    <h1 className={styles['site-title']}>
    //      <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
    //    </h1>
    //    {
    //      context.router.isActive('/', true)
    //        ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
    //        : null
    //    }
    //    {buttonsInstance}
    //  </div>
    //</div>
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
