import { useQuery } from '@tanstack/react-query';
import BreadCrumb from '../breadcrumb';
import orderApi from 'src/apis/order.api';
import { formatPrice } from 'src/utils/formatPrice';
import HelmetSale from 'src/components/Helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productsApi from 'src/apis/product.api';

export default function DetailProduct() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  if (product_id === undefined || !Number(product_id)) navigate('/admin/product');
  const { data, refetch } = useQuery(['get_product_details'], () =>
    productsApi.getProductDetail(product_id !== undefined ? product_id : '1')
  );

  console.log(data);

  return (
    <div className='mt-4'>
      <HelmetSale title='Admin Dashboard | Detail Order'></HelmetSale>
      <BreadCrumb path={['Product', 'Product Dashboard', 'Detail']} />
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border bg-white p-4'>
                <h1 className='py-2 text-lg font-semibold'>PRODUCT DETAIL</h1>

                <hr className='my-2 bg-gray-600' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
