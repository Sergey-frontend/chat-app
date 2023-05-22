import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/slices/modalsSlice';
import useSocketApi from '../../hooks/useSocketApi.hook';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const chatApi = useSocketApi();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await chatApi.removeChannel({ id: channelId });
      dispatch(hideModal());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('removeChannelModal.body')}</p>
        <div>
          <Button
            className="m-1"
            variant="secondary"
            role="button"
            onClick={() => dispatch(hideModal())}
          >
            {t('removeChannelModal.cancel')}
          </Button>
          <Button
            className="m-1"
            variant="danger"
            role="button"
            onClick={handleRemove}
          >
            {t('removeChannelModal.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
