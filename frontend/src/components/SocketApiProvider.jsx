/* eslint-disable */
import SocketContext from '../contexts/SocketContext';

const SocketApiProvider = ({ children, socket }) => {
  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
        let state = 'pending'; // eslint-disable-line
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };
  return (
    <SocketContext.Provider value={api}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketApiProvider;
