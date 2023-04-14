/* eslint-disable react/display-name */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from 'src/utils/formatPrice';
import type { TFunction } from 'i18next';

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
      t,
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
      t: TFunction<'addashboard', undefined, 'addashboard'>;
    },
    ref
  ) => {
    return (
      <div ref={ref} className='p-8'>
        <p className='text-xl font-semibold leading-loose'>{t('orders.cty')}</p>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold leading-loose'>{t('orders.invoice')}</h1>
        </div>
        <p className='mb-1 italic underline underline-offset-2'>{t('orders.infoorder')}</p>
        <p>
          {t('orders.ordercode')}: #{id}
        </p>
        <p>
          {t('orders.customer')}: {name}
        </p>
        <p>
          {t('orders.status')}: <span className='font-semibold'>{t('orders.paid')}</span>
        </p>
        <p>
          {t('orders.methodpayment')}: {method_payment}
        </p>
        <p>
          {t('user.datecre')}: {date}
        </p>

        <p className='mt-4 italic underline underline-offset-2'>{t('orders.detailorder')}</p>
        <table className='mt-2 w-full border-collapse border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600'>{t('inventory.No')}</th>
              <th className='border border-slate-600'>{t('detailproduct.nameproduct')}</th>
              <th className='border border-slate-600'>{t('detailproduct.detail')}</th>
              <th className='border border-slate-600'>{t('orders.quantity')}</th>
              <th className='border border-slate-600'>{t('orders.pricelist')}</th>
              <th className='border border-slate-600'>{t('orders.totalmoney')}</th>
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
                {t('orders.discount')}
              </td>
              <td className='border border-slate-600'>{formatPrice(discount)}</td>
            </tr>
            <tr>
              <td className='border border-slate-600' colSpan={5}>
                {t('orders.totalmoney')}
              </td>
              <td className='border border-slate-600'>{formatPrice(total)}</td>
            </tr>
          </tbody>
        </table>
        <div className='flex flex-col pt-6 text-right'>
          <p className='mr-4 pr-10 font-bold'>{t('orders.salesman')}</p>
          <p className='mr-4 pr-12'>{t('orders.signwritename')}</p>
        </div>
      </div>
    );
  }
);
