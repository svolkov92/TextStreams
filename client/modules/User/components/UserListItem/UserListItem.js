/**
 * Created by Volkov on 30.10.2016.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../SelectComponent'
import { FormGroup, InputGroup } from 'react-bootstrap';
// Import Style
import styles from './UserListItem.css';

function UserListItem(props) {
  let accessLevels = [
    { name: "Admin", value: "1", isSelected: props.accessLevel === 1 },
    { name: "Reporter", value: "2", isSelected: props.accessLevel === 2 },
    { name: "User", value: "3", isSelected: props.accessLevel === 3 }
  ];

  return (
     <FormGroup key={props.cuid}>
       <InputGroup>
         <InputGroup.Addon>{props.email}</InputGroup.Addon>
         <InputGroup.Addon>
         <SelectComponent name={props.cuid} options={accessLevels} onChange={props.changeRole}  />
         </InputGroup.Addon>
       </InputGroup>
     </FormGroup>
  );
}

UserListItem.propTypes = {};

export default UserListItem;
