import { BsReceiptCutoff, BsTruck } from 'react-icons/bs';
import { GoPackage } from 'react-icons/go';
import { MdLoop } from 'react-icons/md';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
export enum StatusOrder {
  'Đã đặt hàng' = 0,
  'Đã được tiếp nhận và xử lý' = 2,
  'Đã bàn giao cho đơn vị vận chuyển.' = 3,
  'Giao hàng thành công' = 4,
}
export const timeLine: {
  name: string;
  component: JSX.Element;
  id: number;
}[] = [
  { name: 'Đã đặt hàng', component: <BsReceiptCutoff />, id: 0 },
  { name: 'Đã thanh toán', component: <RiMoneyDollarBoxLine />, id: 1 },
  { name: 'Đang xử lý', component: <MdLoop />, id: 2 },
  { name: 'Đang vận chuyển', component: <BsTruck />, id: 3 },
  { name: 'Đã nhận hàng', component: <GoPackage />, id: 4 },
];
