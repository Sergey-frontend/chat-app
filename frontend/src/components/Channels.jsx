import {
  Col, ButtonGroup, Dropdown, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { setCurrentChannelId } from '../store/slices/channelsSlice';
import { showModal } from '../store/slices/modalsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { t } = useTranslation();

  const renderChannels = () => {
    const channelsList = channels.map(({ id, name, removable }) => {
      const activeclassName = cn('btn', {
        'btn-secondary': id === currentChannelId,
        'btn-outline-secondary': id !== currentChannelId,
      });
      const hendlerVariant = () => (id === currentChannelId ? 'secondary' : 'outline-secondary');

      if (!removable) {
        return (
          <li key={id} className="nav-item w-100">
            <button
              onClick={() => dispatch(setCurrentChannelId(id))}
              type="button"
              className={`w-100 text-start rounded-0 ${activeclassName} text-truncate overflow-hidden`}
            >
              <span className="me-1 text-truncate overflow-hidden">
                {t('channels.id')}
              </span>
              {name}
            </button>
          </li>
        );
      }

      return (
        <li key={id} className="nav-item w-100">
          <div role="group" className="d-flex dropdown btn-group">
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={hendlerVariant()}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => dispatch(setCurrentChannelId(id))}
              >

                {name}
              </Button>

              <Dropdown.Toggle
                split
                variant={hendlerVariant()}
                id="dropdown-split-basic"
              >
                <span className="visually-hidden">{t('channels.dropdownLabel')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu onClick={() => dispatch(setCurrentChannelId(id))}>
                <Dropdown.Item
                  onClick={() => dispatch(showModal({ modalType: 'renaming', channelId: id }))}
                >
                  {t('channels.rename')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch(showModal({ modalType: 'removing', channelId: id }))}
                >
                  {t('channels.delete')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      );
    });
    return channelsList;
  };
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {t('channels.title')}
        </b>
        <button
          onClick={() => dispatch(showModal({ modalType: 'adding', channelId: null }))}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">
            {t('channels.plus')}
          </span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {renderChannels()}
      </ul>
    </Col>
  );
};

export default Channels;
