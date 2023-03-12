import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import productsApi from 'src/apis/product.api';
import Pagination from 'src/components/paginate';
import Product from 'src/components/product';
import useQueryParams from 'src/hooks/useQueryParams';
import AsignFillter from './asignfilter';
import SortProduct from './sortlist';

function ProductList() {
  const queryParams = useQueryParams();
  const { data: products } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productsApi.getProductsList(queryParams),
  });

  return (
    <div className='mx-auto max-w-7xl py-4 px-2'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='hidden md:col-span-3 md:block'>
          <AsignFillter />
        </div>
        <div className='col-span-12 md:col-span-9'>
          <div>
            <SortProduct />
          </div>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {products &&
              products.data.data &&
              products.data.data.map((product) => {
                return (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                );
              })}
          </div>
          <Pagination queryConfig={queryParams} pageSize={products?.data.last_page || 1} />
        </div>
      </div>
    </div>
  );
}
export default ProductList;
