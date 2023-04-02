import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from 'src/components/locales/en/home.json';
import HOME_VN from 'src/components/locales/vi/home.json';
import ADDRESS_EN from 'src/components/locales/en/address.json';
import ADDRESS_VN from 'src/components/locales/vi/address.json';
import FILE_EN from 'src/components/locales/en/file.json';
import FILE_VN from 'src/components/locales/vi/file.json';
import PASSWORD_EN from 'src/components/locales/en/password.json';
import PASSWORD_VN from 'src/components/locales/vi/password.json';
import SECURITY_EN from 'src/components/locales/en/security.json';
import SECURITY_VN from 'src/components/locales/vi/security.json';
import PROFILEUSER_EN from 'src/components/locales/en/profileuser.json';
import PROFILEUSER_VN from 'src/components/locales/vi/profileuser.json';
import CARTUSER_EN from 'src/components/locales/en/cartuser.json';
import CARTUSER_VN from 'src/components/locales/vi/cartuser.json';
import CARTPOPOVER_EN from 'src/components/locales/en/cartpopover.json';
import CARTPOPOVER_VN from 'src/components/locales/vi/cartpopover.json';
import MYORDER_EN from 'src/components/locales/en/myorder.json';
import MYORDER_VN from 'src/components/locales/vi/myorder.json';
import PRODUCTDETAIL_EN from 'src/components/locales/en/productdetail.json';
import PRODUCTDETAIL_VN from 'src/components/locales/vi/productdetail.json';
import ADDASHBOARD_EN from 'src/components/locales/en/addashboard.json';
import ADDASHBOARD_VN from 'src/components/locales/vi/addashboard.json';
import LOGIN_EN from 'src/components/locales/en/login.json';
import LOGIN_VN from 'src/components/locales/vi/login.json';
import REGISTER_EN from 'src/components/locales/en/register.json';
import REGISTER_VN from 'src/components/locales/vi/register.json';
import NOTFOUND_EN from 'src/components/locales/en/notfound.json';
import NOTFOUND_VN from 'src/components/locales/vi/notfound.json';
import ASIGNFILTER_EN from 'src/components/locales/en/asignfilter.json';
import ASIGNFILTER_VN from 'src/components/locales/vi/asignfilter.json';
import CHECKOUT_EN from 'src/components/locales/en/checkout.json';
import CHECKOUT_VN from 'src/components/locales/vi/checkout.json';

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
};

const resources = {
  en: {
    home: HOME_EN,
    address: ADDRESS_EN,
    file: FILE_EN,
    password: PASSWORD_EN,
    security: SECURITY_EN,
    profileUser: PROFILEUSER_EN,
    cartuser: CARTUSER_EN,
    cartpopover: CARTPOPOVER_EN,
    myorder: MYORDER_EN,
    productdetail: PRODUCTDETAIL_EN,
    addashboard: ADDASHBOARD_EN,
    login: LOGIN_EN,
    register: REGISTER_EN,
    notfound: NOTFOUND_EN,
    asignfilter: ASIGNFILTER_EN,
    checkout: CHECKOUT_EN,
  },
  vi: {
    home: HOME_VN,
    address: ADDRESS_VN,
    file: FILE_VN,
    password: PASSWORD_VN,
    security: SECURITY_VN,
    profileUser: PROFILEUSER_VN,
    cartuser: CARTUSER_VN,
    cartpopover: CARTPOPOVER_VN,
    myorder: MYORDER_VN,
    productdetail: PRODUCTDETAIL_VN,
    addashboard: ADDASHBOARD_VN,
    login: LOGIN_VN,
    register: REGISTER_VN,
    notfound: NOTFOUND_VN,
    asignfilter: ASIGNFILTER_VN,
    checkout: CHECKOUT_VN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  ns: [
    'home',
    'address',
    'file',
    'password',
    'security',
    'profileUser',
    'cartuser',
    'cartpopover',
    'myorder',
    'productdetail',
    'addashboard',
    'login',
    'register',
    'notfound',
    'asignfilter',
    'checkout',
  ],
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
