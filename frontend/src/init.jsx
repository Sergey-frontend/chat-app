import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import store from './store/store';
import App from './components/App';
import SocketApiProvider from './components/SocketApiProvider.jsx';
import { addMessage } from './store/slices/messagesSlice.js';

const init = async (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  // socket.on('newChannel', (payload) => {
  //   store.dispatch(actions.addChannel({ channel: payload }));
  // });
  // socket.on('removeChannel', (payload) => {
  //   store.dispatch(actions.removeChannel({ channelId: payload.id }));
  // });
  // socket.on('renameChannel', (payload) => {
  //   store.dispatch(actions.renameChannel({
  //     channelId: payload.id,
  //     channelName: payload.name,
  //   }));
  // });

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketApiProvider socket={socket}>
          <App />
        </SocketApiProvider>
      </I18nextProvider>
    </Provider>

  );
};

export default init;
