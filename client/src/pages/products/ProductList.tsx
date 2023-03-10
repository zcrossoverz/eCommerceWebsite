import Product from 'src/components/product';
import AsignFillter from './asignfilter';
import SortProduct from './sortlist';

function ProductList() {
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
            {Array(20)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductList;
