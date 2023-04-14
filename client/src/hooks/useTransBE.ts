import i18n from 'i18next';
import { locales } from 'src/i18n/i18n';

const transBE = (str: string) => {
  const currentLanguage = i18n.language;
  if (currentLanguage === 'en') {
    switch (str) {
      case 'Đã đặt hàng':
        return 'Ordered';
      case 'Đã thanh toán':
        return 'Paid';
      case 'Đang xử lý':
        return 'Processing';
      case 'Đang vận chuyển':
        return 'Shipping';
      case 'Đã nhận hàng':
        return 'Completed';
      case 'Hoàn trả':
        return 'Return';
      case 'Đã trả hàng':
        return 'Returned';
      default:
        return str;
    }
  }
  if (currentLanguage === 'vi') {
    return str;
  }
};
export default transBE;
