/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserListItem from '../components/UserListItem/UserListItem';
import { Table } from 'react-bootstrap';
import styles from './UserStyles.css';
import { updateUserRequest } from '../UserActions';
// Import Selectors
import { getUsers } from '../UserReducer';

class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidMount() {
    this.setState({ users: this.props.users });
  }

  changeRole = (e) => {
    let user = {
      cuid: e.target.name,
      accessLevel: e.target.value,
    };
    
    this.props.dispatch(updateUserRequest(user));
  }


  render() {
    return (
      <form>
        {
          this.props.users.map(user=> (
            <UserListItem {...user} changeRole={this.changeRole} />
          ))
        }
      </form>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
  };
}

export default connect(mapStateToProps)(UserListPage);
