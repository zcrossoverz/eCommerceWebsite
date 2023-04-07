import { AiOutlineFileDone } from 'react-icons/ai';
import { BsReceiptCutoff, BsTruck } from 'react-icons/bs';
import { GoPackage } from 'react-icons/go';
import { MdLoop } from 'react-icons/md';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { TiArrowBackOutline } from 'react-icons/ti';
export enum StatusOrder {
  PENDING = 0,
  PROCESSING = 2,
  SHIPPED = 3,
  COMPLETED = 4,
  RETURNED = 5,
  RETURNED_COMPLETED = 6,
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
  { name: 'Hoàn trả', component: <TiArrowBackOutline />, id: 5 },
  { name: 'Đã trả hàng', component: <AiOutlineFileDone />, id: 6 },
];
