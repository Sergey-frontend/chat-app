// import React, { useState } from 'react';
import {
  Button, Form, Modal, FormText,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSocketApi from '../../hooks/useSocketApi.hook';
import * as channelActions from '../../store/slices/channelsSlice';

const AddChannelModal = ({ show, handleClose }) => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const chatApi = useSocketApi();

  const validate = Yup.object({
    name: Yup
      .string()
      .min(3, 'Имя канала не может быть меньше трех символов')
      .notOneOf(channels.map((c) => c.name), 'Канал с таким именем уже существует')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: async (values, { resetForm }) => {
      const channelData = {
        name: values.name,
        removable: true,
      };

      try {
        const response = await chatApi.createChannel(channelData);
        dispatch(channelActions.setCurrentChannelId(response.id));
        console.log(response);
        resetForm({ values: '' });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },

    validationSchema: validate,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              name="name"
              placeholder="Введите имя канала"
              autoFocus
              isInvalid={formik.errors.name && formik.touched.name}
            />
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">{formik.errors.name}</FormText>
            }
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            type="submit"
          >
            Отправить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddChannelModal;
