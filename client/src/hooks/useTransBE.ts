import i18n from 'i18next';
import { locales } from 'src/i18n/i18n';

const transBE = (str: string) => {
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  if (currentLanguage === 'vi') {
    console.log('vi', str);
  }
};
export default transBE;
