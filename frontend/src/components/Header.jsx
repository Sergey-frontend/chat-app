import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.hook';

const Header = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <a href="/" className="navbar-brand">{t('chatHeader.title')}</a>
        <button onClick={logOut} type="button" className="btn btn-primary">{t('chatHeader.logOut')}</button>
      </Container>
    </nav>
  );
};

export default Header;
