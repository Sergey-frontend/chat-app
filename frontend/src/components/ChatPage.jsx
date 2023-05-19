import {
  Row, Container,
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Channels from './Channels';
import Messages from './Messages';
import useAuth from '../hooks/useAuth.hook';
import routes from '../utils/routes';
import { setChannels } from '../store/slices/channelsSlice';
import { setMessages } from '../store/slices/messagesSlice';
import AddChannelModal from './modals/AddChannelModal';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeaders } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(routes.dataPath(), getAuthHeaders());
      const { data } = response;
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
    };
    getData();
  }, [dispatch, getAuthHeaders]);

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Channels handleShow={handleShow} />
            <Messages />
          </Row>
        </Container>
        <AddChannelModal show={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default ChatPage;
