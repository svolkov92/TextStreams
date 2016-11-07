/**
 * Created by Volkov on 07.11.2016.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FormControl, Button, FormGroup, InputGroup, Modal } from 'react-bootstrap';


function ModalCompoment(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.body}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onClose} >Close</Button>
          <Button onClick={props.onYes} bsStyle="primary">Yes</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  );
}

export default ModalCompoment;




