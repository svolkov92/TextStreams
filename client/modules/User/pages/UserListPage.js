/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserListItem from '../components/UserListItem/UserListItem';
import { Table } from 'react-bootstrap';
import styles from './UserStyles.css';

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

  render() {
    return (
        <Table responsive>
          <thead>
          <tr>
            <th>Email</th>
            <th>Access Level</th>
          </tr>
          </thead>
          <tbody>
            {
              this.props.users.map(user=> (
                <UserListItem {...user}/>
              ))
            }
          </tbody>
        </Table>
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
