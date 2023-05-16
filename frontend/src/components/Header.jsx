import { Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.hook';

const Header = () => {
  const { logOut } = useAuth();
  const header = 'HexletChat';
  const text = 'Выйти';
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <a href="/" className="navbar-brand">{header}</a>
        <button onClick={logOut} type="button" className="btn btn-primary">{text}</button>
      </Container>
    </nav>
  );
};

export default Header;
