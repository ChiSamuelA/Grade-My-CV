import { Link } from 'react-router';
import { useTranslation } from '~/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className='navbar'>
      <Link to='/'>
        <p className="text-2xl font-bold text-gradient uppercase">{t('navbar.appName')}</p>
      </Link>

      <div className="flex items-center gap-4">
        <Link to='/upload' className='capitalize primary-button w-fit'>
          {t('common.uploadResume')}
        </Link>
        
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

export default Navbar;