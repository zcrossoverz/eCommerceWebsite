import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import path from 'src/constants/path';

function NotFound() {
  const { t } = useTranslation('notfound');
  const navigate = useNavigate();
  return (
    <div>
      <section className='bg-white dark:bg-gray-900 '>
        <div className='container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12'>
          <div className='wf-ull lg:w-1/2'>
            <p className='text-sm font-medium text-blue-500 dark:text-blue-400'>{t('notfound.error')}</p>
            <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
              {t('notfound.website not found')}
            </h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>{t('notfound.sorry')}</p>
            <div className='mt-6 flex items-center gap-x-3'>
              <button className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-5 w-5 rtl:rotate-180'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>
                <button onClick={() => navigate(-1)}>{t('notfound.back')}</button>
              </button>
              <button
                onClick={() => navigate(path.home)}
                className='w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto'
              >
                {t('notfound.back to home page')}
              </button>
            </div>
          </div>
          <div className='relative mt-12 w-full lg:mt-0 lg:w-1/2'>
            <img
              alt='img'
              className='w-full max-w-lg lg:mx-auto'
              src='https://merakiui.com/images/components/illustration.svg'
            />
          </div>
        </div>
      </section>
      ;
    </div>
  );
}
export default NotFound;
