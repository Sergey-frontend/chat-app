import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';
import leoProfanity from 'leo-profanity';
import resources from './locales/index.js';
import store from './store/store';
import App from './components/App';
import SocketApiProvider from './components/SocketApiProvider.jsx';
import { addMessage } from './store/slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './store/slices/channelsSlice.js';

const init = async (socket) => {
  socket.on('disconnect', () => {
    localStorage.removeItem('user');
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({
      id: payload.id,
      name: payload.name,
      removable: true,
    }));
  });

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('ru'));
  leoProfanity.add(leoProfanity.getDictionary('en'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR,
    environment: 'production',
  };

  const rollbar = new Rollbar(rollbarConfig);

  return (
    <RollbarProvider config={rollbar}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketApiProvider socket={socket}>
              <App />
            </SocketApiProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
