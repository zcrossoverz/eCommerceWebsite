import { CartItem as CartItemType } from 'src/types/cart';

interface Props {
  cartItem: CartItemType;
}
import { baseURL } from 'src/constants/constants';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
import { formatPrice } from 'src/utils/formatPrice';
function CartItem({ cartItem }: Props) {
  return (
    <Link
      to={`${path.product}/${cartItem.id}`}
      className='flex cursor-pointer items-center justify-between px-2 py-4 duration-300 hover:bg-slate-100'
    >
      <div className='max-w-[2rem] flex-shrink-0'>
        <img className='w-full' src={`${baseURL}/${cartItem.option.image}`} alt='' />
      </div>
      <div className='mx-2 flex-grow line-clamp-1'>{cartItem.name}</div>
      <div>
        <span>
          {formatPrice(Number(cartItem.option.price))} x {cartItem.option.quantity}
        </span>
      </div>
    </Link>
  );
}
export default CartItem;
