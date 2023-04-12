/* eslint-disable react/display-name */

import React from 'react';
import { formatPrice } from 'src/utils/formatPrice';

export const PrintOrder = React.forwardRef(
  (
    {
      id,
      name,
      date,
      method_payment,
      order_items,
      discount,
      total,
    }: {
      id: number;
      name: string;
      date: string;
      method_payment: string;
      discount: number;
      total: number;
      order_items: {
        product_name: string;
        product_option_id: number;
        ram: string;
        rom: string;
        color: string;
        quantity: number;
        image: string;
        prices: number;
      }[];
    },
    ref
  ) => {
    return (
      <div ref={ref} className='p-8'>
        <p className='text-xl font-semibold leading-loose'>CTY TNHH 3 THÀNH VIÊN FSTORE</p>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold leading-loose'>HÓA ĐƠN MUA HÀNG</h1>
        </div>
        <p className='mb-1 italic underline underline-offset-2'>Thông tin đơn hàng</p>
        <p>Mã đơn: #{id}</p>
        <p>Khách hàng: {name}</p>
        <p>
          Trạng thái: <span className='font-semibold'>Đã thanh toán</span>
        </p>
        <p>Phương thức thanh toán: {method_payment}</p>
        <p>Ngày tạo: {date}</p>

        <p className='mt-4 italic underline underline-offset-2'>Chi tiết đơn hàng</p>
        <table className='mt-2 w-full border-collapse border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600'>STT</th>
              <th className='border border-slate-600'>Tên sản phẩm</th>
              <th className='border border-slate-600'>Chi tiết</th>
              <th className='border border-slate-600'>Số lượng</th>
              <th className='border border-slate-600'>Đơn giá</th>
              <th className='border border-slate-600'>Tổng tiền</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {order_items.map((e, i) => {
              return (
                <tr key={i.toString()}>
                  <td className='border border-slate-600'>{i + 1}</td>
                  <td className='border border-slate-600'>{e.product_name}</td>
                  <td className='border border-slate-600'>{`${e.ram}/${e.rom} - ${e.color}`}</td>
                  <td className='border border-slate-600'>{e.quantity}</td>
                  <td className='border border-slate-600'>{formatPrice(e.prices)}</td>
                  <td className='border border-slate-600'>{formatPrice(e.prices * e.quantity)}</td>
                </tr>
              );
            })}
            <tr>
              <td className='border border-slate-600' colSpan={5}>
                Giảm giá
              </td>
              <td className='border border-slate-600'>{formatPrice(discount)}</td>
            </tr>
            <tr>
              <td className='border border-slate-600' colSpan={5}>
                Tổng thành tiền
              </td>
              <td className='border border-slate-600'>{formatPrice(total)}</td>
            </tr>
          </tbody>
        </table>
        <div className='flex flex-col pt-6 text-right'>
          <p className='mr-4 pr-10 font-bold'>Người bán hàng</p>
          <p className='mr-4 pr-12'>(Ký ghi rõ họ tên)</p>
        </div>
      </div>
    );
  }
);
