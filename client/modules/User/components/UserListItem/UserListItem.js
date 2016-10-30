/**
 * Created by Volkov on 30.10.2016.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../SelectComponent'

// Import Style
import styles from './UserListItem.css';

function UserListItem(props) {
  let accessLevels = [
    { name: "Admin", value: "1", isSelected: props.accessLevel === 1 },
    { name: "Reporter", value: "2", isSelected: props.accessLevel === 2 },
    { name: "User", value: "3", isSelected: props.accessLevel === 3 }
  ];

  return (
   <tr key={props.cuid}>
     <td>{props.email}</td>
     <td><SelectComponent name={props.cuid} options={accessLevels}  /></td>
    </tr>
  );
}

UserListItem.propTypes = {};

export default UserListItem;
