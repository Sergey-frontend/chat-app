import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext';

const useSocketApi = () => useContext(SocketContext);

export default useSocketApi;
