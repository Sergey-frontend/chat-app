import { Col } from 'react-bootstrap';
import { useState } from 'react';

const Messages = () => {
  const [inputValue, setInputValue] = useState('');

  const formHendler = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const renderMessages = () => {
    const nameUser = 'admin';
    const textMessage = 'qwerty';
    // this fn added messages into return
    // this a default html
    return (
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        <div className="text-break mb-2">
          <b>{nameUser}</b>
          :
          {' '}
          {textMessage}
        </div>
      </div>
    );
  };
  return (
    <Col className="col-9 p-0 h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>

      {renderMessages}

      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              onChange={formHendler}
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
              value={inputValue}
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </Col>
  );
};

export default Messages;
