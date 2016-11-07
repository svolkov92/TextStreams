/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FormControl, Button, FormGroup, InputGroup } from 'react-bootstrap';


function AddCompoment(props) {
  return (
    <div>
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
          <InputGroup.Button>
            <Button id={props.buttonId} bsStyle="primary" onClick={props.onClick}>{props.buttonName}</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  );
}

export default AddCompoment;

