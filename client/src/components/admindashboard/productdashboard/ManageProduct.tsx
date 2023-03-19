import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import productsApi from 'src/apis/product.api';
import { useState } from 'react';

export default function ManageProduct() {
  const [params, setParams] = useState({
    limit: '10',
    page: '1',
  });
  const { data, isLoading } = useQuery(['products', params], () => productsApi.getProductsList(params));

  return (
    <div className='mt-4'>
      <BreadCrumb path={['Product', 'Manage Product']} />
      <div className='mt-4 grid grid-cols-6'>
        <div className='col-span-2 mr-4'>
          <input
            className='w-full appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='search'
          />
        </div>
        <div className='col-span-1'>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'>
            <option className='mt-1' selected>
              Sort by
            </option>
            <option className='mt-1' value='sale'>
              sale
            </option>
            <option className='mt-1' value='stock'>
              stock
            </option>
          </select>
        </div>
        <div className='col-span-1 col-end-7'>
          <button className='rounded-xl bg-blue-900 py-3 px-8 text-gray-400 hover:bg-blue-600 hover:text-white hover:shadow-primary hover:shadow-lg'>
            CREATE
          </button>
        </div>
      </div>
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border'>
                {isLoading && (
                  <div className='grid h-80 place-items-center'>
                    <svg
                      aria-hidden='true'
                      className='mr-2 inline h-8 w-8 animate-spin fill-purple-600 text-gray-500'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                )}
                {data?.data && (
                  <table className='min-w-full divide-y divide-gray-200 bg-white'>
                    <thead className='bg-pink-400/20'>
                      <tr>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                          ID
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                          Name
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                          Brand
                        </th>
                        <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                          Edit
                        </th>
                        <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {data?.data.data.map((e, i) => {
                        return (
                          <tr key={i.toString()}>
                            <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'>{e.id}</td>
                            <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.name}</td>
                            <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>{e.brand}</td>
                            <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                              <div className='text-green-500 hover:text-green-700'>Edit</div>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                              <div className='text-red-500 hover:text-red-700'>Delete</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
