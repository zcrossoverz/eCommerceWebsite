import logo from 'src/assets/logo.svg';
import { useTranslation } from 'react-i18next';

function Security() {
  const { t } = useTranslation('security');
  return (
    <div className='flex h-full w-full items-center justify-center bg-security'>
      <div className=' flex w-full flex-col items-center justify-center bg-white/25 p-2 shadow-md backdrop-blur-lg lg:w-2/3'>
        <img src={logo} alt='' className='w-40 overflow-hidden text-3xl' />
        <h2 className='block text-center text-2xl font-bold text-white'>{t('security.tks')}</h2>
        <p className='mt-2 text-center text-base font-semibold italic'>{t('security.commit')}</p>
      </div>
    </div>
  );
}
export default Security;
