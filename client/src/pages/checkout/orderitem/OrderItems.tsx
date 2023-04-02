import { useTranslation } from 'react-i18next';
import { baseURL } from 'src/constants/constants';
import { formatPrice } from 'src/utils/formatPrice';
interface Props {
  orderItem: {
    product_name: string;
    product_option_id: number;
    ram: string;
    rom: string;
    color: string;
    quantity: number;
    image: string;
    prices: number;
  };
}
function OrderItem({ orderItem }: Props) {
  const { t } = useTranslation('myorder');
  return (
    <div className='flex w-full items-center border-b p-2'>
      <div className='flex-shrink-0'>
        <img src={`${baseURL}/${orderItem.image}`} alt='img' className='h-[3rem] w-[3rem] object-cover' />
      </div>
      <div className='flex-grow'>
        <h2 className='text-base font-medium line-clamp-2'>{orderItem.product_name}</h2>
        <div className='flex w-full items-center justify-start'>
          <div className='flex-grow'>
            <span className='border-r pr-2 text-sm font-medium text-slate-400'>
              RAM: <i>{orderItem.ram}</i>
            </span>
            <span className='border-r px-2 text-sm font-medium text-slate-400'>
              ROM: <i>{orderItem.rom}</i>
            </span>
            <span className='border-r px-2 text-sm font-medium text-slate-400'>
              {t('myorder.color')}: <i>{orderItem.color}</i>
            </span>
            <div className='inline-block'>
              <span className='flex-shrink text-base font-semibold text-orange-400'>
                {formatPrice(orderItem.prices)}
              </span>
              <span className='px-2 text-sm font-medium text-orange-400'>x{orderItem.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderItem;
