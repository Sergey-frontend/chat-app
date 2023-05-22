import React from 'react';
import {
  Button, Form, Modal, FormText,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSocketApi from '../../hooks/useSocketApi.hook';
import * as channelActions from '../../store/slices/channelsSlice';
import { hideModal } from '../../store/slices/modalsSlice';

const AddChannelModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const chatApi = useSocketApi();
  const { t } = useTranslation();

  const validate = Yup.object({
    name: Yup
      .string()
      .min(3, t('addChannelModal.validation.min'))
      .notOneOf(channels.map((c) => c.name), t('addChannelModal.validation.unique'))
      .required(t('addChannelModal.validation.required')),
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
        toast.success('Wow so easy !');
        dispatch(channelActions.setCurrentChannelId(response.id));
        resetForm({ values: '' });
        dispatch(hideModal());
      } catch (error) {
        console.error(error);
      }
    },

    validationSchema: validate,
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('addChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              name="name"
              placeholder={t('addChannelModal.placeholder')}
              autoFocus
              isInvalid={formik.errors.name && formik.touched.name}
            />
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">{formik.errors.name}</FormText>
            }
          </Form.Group>
          <Button variant="secondary" onClick={() => dispatch(hideModal())}>
            {t('addChannelModal.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            type="submit"
          >
            {t('addChannelModal.submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default AddChannelModal;
