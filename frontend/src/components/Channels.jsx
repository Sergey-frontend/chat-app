import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { setCurrentChannelId } from '../store/slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  console.log(channels, currentChannelId);
  const { t } = useTranslation();
  const renderChannels = () => {
    const elements = channels.map(({ id, name, removable }) => {
      const channelCSS = cn('btn', {
        'btn-secondary': id === currentChannelId,
        'btn-outline-secondary': id !== currentChannelId,
      });

      if (!removable) {
        return (
          <li key={id} className="nav-item w-100">
            <button
              key={id}
              onClick={() => dispatch(setCurrentChannelId(id))}
              type="button"
              className={`w-100 text-start rounded-0 ${channelCSS}`}
            >
              <span key={id} className="me-1">#</span>

            </button>
          </li>
        );
      }

      return (
        <li key={id} className="nav-item w-100">
          <div key={id} role="group" className="d-flex dropdown btn-group">
            <Dropdown as={ButtonGroup} className="w-100">
              <button
                key={id}
                onClick={() => dispatch(setCurrentChannelId(id))}
                type="button"
                className={`w-100 text-start rounded-0 ${channelCSS}`}
              >
                <span key={id} className="me-1">#</span>
                {name}
              </button>

              <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic">
                <span className="visually-hidden">{t('renameModal.handlingChannel')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  {t('channels.rename')}
                </Dropdown.Item>
                <Dropdown.Item>
                  {t('channels.remove')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      );
    });
    return elements;
  };
  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {renderChannels()}
      </ul>
    </Col>

  );
};

export default Channels;
