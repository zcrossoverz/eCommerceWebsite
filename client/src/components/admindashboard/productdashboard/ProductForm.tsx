import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import productsApi from 'src/apis/product.api';
import Pagination from 'src/components/paginate';
import useQueryParams from 'src/hooks/useQueryParams';
import { useEffect, useState } from 'react';

export default function ProductForm() {
  return (
    <div className='mt-4'>
      <BreadCrumb path={['Product', 'Create Product']} />
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border p-4 bg-white'>
                <div className='flex gap-6'>
                    <p>Name: </p>
                    <input className='appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
