import { useTranslation } from 'react-i18next';
import routes from '../utils/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <body>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">{t('notFoundPage.number')}</h1>
          <p className="fs-3">
            {' '}
            <span className="text-danger">{t('notFoundPage.danger')}</span>
            {' '}
            {t('notFoundPage.notFound')}
          </p>
          <p className="lead">
            {t('notFoundPage.info')}
          </p>
          <a href={routes.home} className="btn btn-primary">
            {t('notFoundPage.redirect')}
          </a>
        </div>
      </div>
    </body>
  );
};

export default NotFoundPage;
