import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Button, Modal, FormText,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hideModal } from '../../store/slices/modalsSlice';
import useSocketApi from '../../hooks/useSocketApi.hook';

const RenameChannelModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  // console.log(channels);
  // console.log(channelId);

  const dispatch = useDispatch();
  const chatApi = useSocketApi();
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const currentChannel = channels.find((channel) => channel.id === channelId);
  const currentChannelName = currentChannel.name;
  console.log(currentChannel.name);

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, 'renameModal.validation.length')
        .notOneOf(channels.map((channel) => channel.name), 'renameModal.validation.unique')
        .required('renameModal.validation.required'),
    }),

    onSubmit: async (values) => {
      try {
        await chatApi.renameChannel({ id: channelId, name: values.name });
        dispatch(hideModal());
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputEl}
              aria-label="имя чего-то"
              name="name"
              type="text"
              autoFocus
              autoComplete="off"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label className="visually-hidden">
              имя
            </Form.Label>
            {
              formik.errors.name
              && formik.touched.name
              && <FormText className="feedback text-danger mt-3">ошибка</FormText>
            }
          </Form.Group>
          <div>
            <Button
              className="m-1"
              role="button"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              Отмена
            </Button>
            <Button
              className="m-1"
              variant="primary"
              role="button"
              type="submit"
            >
              Переименовать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
