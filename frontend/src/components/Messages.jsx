import { Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import useSocketApi from '../hooks/useSocketApi.hook';
import useAuth from '../hooks/useAuth.hook';

const Messages = () => {
  const chatApi = useSocketApi();
  const { user } = useAuth();
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find((c) => c.id === currentChannelId);
  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const count = currentChannelMessages.length;

  const [inputValue, setInputValue] = useState('');
  const controlInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const messagesList = currentChannelMessages.map((msg) => {
    const { body, username, id } = msg;
    return (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        :
        {' '}
        {body}
      </div>
    );
  });

  const formHendler = (e) => {
    e.preventDefault();
    e.target.value = '';
    const formData = new FormData(e.target);
    const body = formData.get('body');
    const clearedMessage = leoProfanity.clean(body);
    const messageData = {
      body: clearedMessage,
      channelId: currentChannelId,
      username: user.username,
    };
    chatApi.sendMessage(messageData);
    setInputValue('');
  };

  return (
    <Col className="col-9 p-0 h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {t('messages.id')}
            {' '}
            {currentChannel ? currentChannel.name : t('messages.loading')}
          </b>
        </p>
        <span className="text-muted">
          {t('messagesCount.key', { count })}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5 " style={{ height: '60vh' }}>
        {messagesList}
      </div>

      <div className="mt-auto px-5">
        <form
          onSubmit={formHendler}
          noValidate=""
          className="py-1
        border rounded-2"
        >
          <div className="input-group has-validation">
            <input
              onChange={controlInput}
              name="body"
              aria-label={t('messages.label')}
              placeholder={t('messages.placeholder')}
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
