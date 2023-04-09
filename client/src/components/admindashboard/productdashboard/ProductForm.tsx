import { useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from '../breadcrumb';
import { useQuery } from '@tanstack/react-query';
import brandApi from 'src/apis/brand.api';
import { useEffect, useState } from 'react';
import productsApi from 'src/apis/product.api';
import { toast } from 'react-toastify';
import HelmetSale from 'src/components/Helmet';

export default function ProductForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const brand = useQuery(['get_all_brands'], () => brandApi.getAllBrand(''));
  const [name, setName] = useState('');
  const [brand_id, setBrandId] = useState(-1);
  const [image, setImage] = useState<File>();
  const [description, setDesc] = useState('');
  const [ram, setRam] = useState('');
  const [rom, setRom] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');

  console.log(location.state.type);

  useEffect(() => {
    if (location.state.type === 'edit') {
      productsApi
        .getProductDetail(location.state.id)
        .then((res) => res.data)
        .then((data) => {
          setName(data.name);
          setBrandId(data.brand_id !== undefined ? data.brand_id : -1);
          setDesc(data.description);
        });
    }
  }, []);

  const createProduct = async () => {
    if (!image) {
      toast.error('please select image for product');
      return;
    }
    const data = new FormData();
    data.append('name', name);
    data.append('brand_id', `${brand_id}`);
    data.append('description', description);
    data.append('ram', ram);
    data.append('rom', rom);
    data.append('color', color);
    data.append('price', price);
    data.append('image', image);
    const response = await productsApi.createProduct(data);

    if (response.status === 200) toast.success('create new product success!');
    else toast.error(`an error occured when create product: ${response.statusText}`);
  };

  const updateProduct = async () => {
    const response = await productsApi.updateProduct(Number(location.state.id), {
      name,
      description,
      brand_id,
    });

    if (response.status === 200) toast.success('update product success!');
    else toast.error(`an error occured when update product: ${response.statusText}`);
  };

  return (
    <div className='mt-4'>
      <HelmetSale
        title={`Admin Dashboard | ${location.state.type === 'create' ? 'Create Product' : 'Update Product'}`}
      ></HelmetSale>
      <BreadCrumb path={['Product', `${location.state.type === 'create' ? 'Create' : 'Update'} Product`]} />
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border bg-white p-4'>
                <h1 className='text-lg font-semibold leading-loose'>
                  {location.state.type === 'create' ? 'CREATE PRODUCT' : 'UPDATE INFORMATION PRODUCT'}
                </h1>
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div>
                    <p className='text-md pb-1 indent-2 leading-normal'>Name</p>
                    <input
                      type='text'
                      className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                      placeholder='Name...'
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className='text-md pb-1 indent-2 leading-normal'>Select Brand</p>
                    <select
                      className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                      onChange={(e) => setBrandId(Number(e.target.value))}
                    >
                      <option>Select Brand</option>
                      {brand.data?.data.map((e: { id: number; name: string }, i) => (
                        <option key={i.toString()} value={e.id} selected={brand_id === e.id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {location.state.type === 'create' && (
                  <div className='pt-4'>
                    <p className='text-md pb-1 indent-2 leading-normal'>Image</p>
                    <input
                      className='bg-gray-150 w-full cursor-pointer rounded-lg border border-gray-300 text-sm font-medium leading-loose text-gray-900 focus:outline-none'
                      type='file'
                      onChange={(e) => {
                        const image = e.target.files;
                        if (image?.length) {
                          setImage(image[0]);
                        }
                      }}
                    />
                    <p className='mt-1 text-sm text-gray-500'>JPEG, PNG or JPG (MAX. 800x400px).</p>
                  </div>
                )}
                <div className='pt-4'>
                  <p className='text-md pb-1 indent-2 leading-normal'>Description</p>
                  <textarea
                    placeholder='Description of product...'
                    rows={4}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    onChange={(e) => setDesc(e.target.value)}
                    defaultValue={description}
                  ></textarea>
                </div>
                {location.state.type === 'create' && (
                  <>
                    <div className='grid grid-cols-2 gap-4 pt-4'>
                      <div>
                        <p className='text-md pb-1 indent-2 leading-normal'>RAM</p>
                        <input
                          type='text'
                          className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                          placeholder='8GB'
                          onChange={(e) => setRam(e.target.value)}
                        />
                      </div>
                      <div>
                        <p className='text-md pb-1 indent-2 leading-normal'>ROM</p>
                        <input
                          type='text'
                          className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                          placeholder='256GB'
                          onChange={(e) => setRom(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 pt-2'>
                      <div>
                        <p className='text-md pb-1 indent-2 leading-normal'>COLOR</p>
                        <input
                          type='text'
                          className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                          placeholder='BLACK'
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                      <div>
                        <p className='text-md pb-1 indent-2 leading-normal'>PRICE</p>
                        <input
                          type='text'
                          className='bg-gray-150 w-full rounded-md border border-gray-300 py-2 px-4'
                          placeholder='100000'
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className='flex justify-start pt-4 pb-2'>
                  <button
                    className='mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600'
                    onClick={async () => {
                      if (location.state.type === 'create') await createProduct();
                      if (location.state.type === 'edit') await updateProduct();
                    }}
                  >
                    SAVE
                  </button>
                  <button
                    className='mr-2 mb-2 rounded-lg border border-gray-300 bg-gray-700 px-5 py-2.5 text-sm font-medium text-white text-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200'
                    onClick={() => navigate('/admin/product')}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
