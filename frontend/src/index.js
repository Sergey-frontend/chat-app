import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import init from './init';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init(socket));
};

app();
