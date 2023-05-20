// import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddChannelModal = ({ show, handleClose }) => (

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Добавить канал</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="name"
            placeholder="Введите имя канала"
            autoFocus
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Отменить
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Отправить
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AddChannelModal;
