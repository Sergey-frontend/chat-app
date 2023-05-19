import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../store/slices/channelsSlice';

const Channels = ({ handleShow }) => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const channelsList = channels.map(({ id, name, removable }) => {
    const activeclassName = cn({
      'btn-secondary': currentChannelId === id,
    });

    if (!removable) {
      return (
        <li key={id} className="nav-item w-100">
          <button
            onClick={() => dispatch(setCurrentChannelId(id))}
            type="button"
            className={`w-100 rounded-0 text-start btn ${activeclassName}`}
          >
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      );
    }
    return (
      <li key={id} className="nav-item w-100">
        <div role="group" className="d-flex dropdown btn-group">
          <button
            onClick={() => dispatch(setCurrentChannelId(id))}
            type="button"
            className={`w-100 rounded-0 text-start text-truncate btn ${activeclassName}`}
          >
            <span className="me-1">#</span>
            {name}
          </button>
          <button
            type="button"
            id="react-aria3537157405-2"
            aria-expanded="false"
            className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
          >
            <span className="visually-hidden">Управление каналом</span>
          </button>
        </div>
      </li>
    );
  });

  return (
    <Col className="border-end col-3">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          onClick={handleShow}
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
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsList}
      </ul>
    </Col>
  );
};

export default Channels;
