import React from "react";
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'react-html-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM} from 'utilities/constants'


function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal 
      show={show} 
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop="static"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal