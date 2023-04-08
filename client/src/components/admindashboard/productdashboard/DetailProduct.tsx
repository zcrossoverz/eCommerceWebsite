import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import orderApi from 'src/apis/order.api';
import { formatPrice } from 'src/utils/formatPrice';
import HelmetSale from 'src/components/Helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productsApi from 'src/apis/product.api';
import { dateToString } from 'src/utils/convertDate';
import { LineChart } from '../maindashboard/chart/LineChart';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { baseURL } from 'src/constants/constants';

export default function DetailProduct() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  if (product_id === undefined || !Number(product_id)) navigate('/admin/product');
  const { data, refetch } = useQuery(['get_product_details'], () =>
    productsApi.getProductDetail(product_id !== undefined ? product_id : '1')
  );
  const product = data?.data;
  console.log(product);
  const product_options = product?.product_options ? product.product_options : [];

  return (
    <div className='mt-4'>
      <HelmetSale title='Admin Dashboard | Detail Order'></HelmetSale>
      <BreadCrumb path={['Product', 'Product Dashboard', 'Detail']} />
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block grid w-full grid-cols-2 gap-4 align-middle'>
              <div className=' overflow-hidden rounded-xl border bg-white p-4'>
                <h1 className='py-2 text-lg font-semibold'>PRODUCT DETAILS</h1>
                <div className='pt-1'>ID Product: {product?.id}</div>
                <div className='pt-1'>Name Product: {product?.name}</div>
                <div className='pt-1'>Brand: {product?.brand}</div>
                <div className='h-24 overflow-hidden pt-1'>
                  Description: <span className='overflow-ellipsis line-clamp-3'>{product?.description}</span>
                </div>
                <div className='pt-1'>Create At: {dateToString(product?.createAt ? product.createAt : '')}</div>
                <div className='pt-1'>Update At: {dateToString(product?.updateAt ? product.updateAt : '')}</div>
              </div>
              <div className='overflow-hidden rounded-xl border bg-white p-4'>
                <LineChart />
              </div>
            </div>

            <div className='mt-4 inline-block w-full gap-4 align-middle'>
              <div className='rounded-xl bg-white p-4'>
                <div className='grid grid-cols-2'>
                  <h1 className='py-2 text-lg font-semibold'>PRODUCT OPTIONS</h1>
                  <div className='flex justify-end'>
                    <button className='mr-8 rounded-lg bg-red-400 px-4 py-2 text-white'>ADD OPTION</button>
                  </div>
                </div>
                <div className='relative mt-4 overflow-x-auto'>
                  <table className='w-full text-left text-sm text-gray-500'>
                    <thead className='bg-cyan-100 text-xs uppercase text-gray-700'>
                      <tr>
                        <th className='px-2 py-3'>ID Option</th>
                        <th className='px-6 py-3'>Image</th>
                        <th className='px-6 py-3'>Specifications</th>
                        <th className='px-6 py-3'>Price</th>
                        <th className='px-6 py-3 text-center'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product_options.map((e, i) => {
                        return (
                          <tr className='border-b bg-white' key={i.toString()}>
                            <th className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                              {e.product_option_id}
                            </th>
                            <td className='px-6 py-4'>
                              <img
                                className='h-32 w-24 text-left'
                                src={`${baseURL}/${e.image?.image_url !== undefined ? e.image?.image_url : ''}`}
                                alt={`product_image`}
                              />
                            </td>
                            <td className='px-6 py-4'>{`${e.ram}/${e.rom} - ${e.color}`}</td>
                            <td className='px-6 py-4'>{formatPrice(Number(e.price) ? Number(e.price) : 0)}</td>
                            <td className='px-6 py-4 text-center'>
                              <button className='pr-1 text-green-500 hover:text-green-700'>
                                <AiOutlineEdit className='text-2xl' />
                              </button>
                              <button className='text-red-500 hover:text-red-700'>
                                <AiOutlineDelete className='text-2xl' />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
