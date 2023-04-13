import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { HiCheck, HiOutlineChevronUpDown } from 'react-icons/hi2';
import { baseURL } from 'src/constants/constants';
import { produce } from 'immer';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { isNumber } from 'lodash';
import { InboundNote } from 'src/types/inventory.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import inboundNoteApi from 'src/apis/inboundnote.api';
import analysisApi from 'src/apis/analysis.api';
import BreadCrumb from '../breadcrumb';
import HelmetSEO from 'src/components/Helmet';
interface ProductData {
  product_option_id: number;
  quantity: number;
  images: string;
  name: string;
  ram: string;
  rom: string;
  color: string;
}

enum ModeCreateInboundNote {
  'changeQuantity',
  'delete',
  'add',
}
function CreateInboundNote() {
  const [stateCreateInboundNote, setStateCreateInboundNote] = useState<ProductData[]>([]);
  const [selected, setSelected] = useState<ProductData>({
    product_option_id: 0,
    quantity: 0,
    images: '',
    name: '',
    ram: '',
    rom: '',
    color: '',
  });
  const [selectedArr, setSelectedArr] = useState<ProductData[]>([]);
  const [mode, setMode] = useState<ModeCreateInboundNote>();
  const [selectedQuantity, setSelectedQuantity] = useState<
    {
      id: number;
      quantity: number | '';
    }[]
  >([]);
  const [query, setQuery] = useState<string>('');
  useQuery({
    queryKey: ['AnalysProductOpt'],
    queryFn: () => analysisApi.getProducts({ page: '1', limit: '9999999999' }),
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setStateCreateInboundNote(data.data.data);
      setSelected(data.data.data[0]);
    },
  });

  const createInboundNoteMutation = useMutation({
    mutationFn: (body: InboundNote) => inboundNoteApi.createInboundNote(body),
    retry: 1,
  });

  useEffect(() => {
    if (selectedArr.length) {
      if (ModeCreateInboundNote.add) {
        setSelectedQuantity(
          produce((dr) => {
            if (
              dr &&
              dr[dr.length - 1] &&
              dr[dr.length - 1].id === selectedArr[selectedArr.length - 1].product_option_id
            ) {
              return;
            }
            dr.push({
              id: selectedArr[selectedArr.length - 1].product_option_id
                ? selectedArr[selectedArr.length - 1].product_option_id
                : 0,
              quantity: 1,
            });
            return dr;
          })
        );
      }
    }
  }, [selectedArr, mode]);
  const filteredProducts =
    query === ''
      ? stateCreateInboundNote
      : stateCreateInboundNote.filter((product: ProductData) =>
          product.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  const handleAddSelected = (id: number) => {
    if (selected) {
      setSelectedArr(
        produce((draft) => {
          const i = draft.findIndex((it) => it.product_option_id === id);
          if (i >= 0) {
            toast.warning('Sản phẩm đã được thêm', { autoClose: 2000 });
            return;
          }
          draft.push(selected);
          return draft;
        })
      );
      setMode((prev) => {
        if (prev !== ModeCreateInboundNote.add) {
          return ModeCreateInboundNote.add;
        }
        return;
      });
    }
  };
  const handleIncrease = (id: number) => {
    setSelectedQuantity(
      produce((draft) => {
        const i = draft.findIndex((it) => it.id === id);
        if (i >= 0) {
          draft[i].quantity = Number(draft[i].quantity) + 1;
        }
        return draft;
      })
    );
    setMode((prev) => {
      if (prev !== ModeCreateInboundNote.changeQuantity) {
        return ModeCreateInboundNote.changeQuantity;
      }
      return;
    });
  };
  const handleDecrease = (id: number) => {
    setSelectedQuantity(
      produce((draft) => {
        const i = draft.findIndex((it) => it.id === id);
        if (i >= 0 && Number(draft[i].quantity) > 1) {
          draft[i].quantity = Number(draft[i].quantity) - 1;
        }
        return draft;
      })
    );
    setMode((prev) => {
      if (prev !== ModeCreateInboundNote.changeQuantity) {
        return ModeCreateInboundNote.changeQuantity;
      }
      return;
    });
  };
  const handleDelete = (id: number) => {
    setSelectedArr(
      produce((draft) => {
        const i = draft.findIndex((it) => it.product_option_id === id);
        draft.splice(i, 1);
        return draft;
      })
    );
    setSelectedQuantity(
      produce((draft) => {
        const i = draft.findIndex((it) => it.id === id);
        if (i >= 0 && Number(draft[i].quantity) >= 1) {
          draft.splice(i, 1);
        }
        return draft;
      })
    );
    setMode((prev) => {
      if (prev !== ModeCreateInboundNote.delete) {
        return ModeCreateInboundNote.delete;
      }
      return;
    });
  };
  const handleCreateInboundNote = () => {
    if (selectedQuantity.length) {
      const body: InboundNote = {
        data: selectedQuantity.map((e) => ({
          product_option_id: e.id,
          quantity: Number(e.quantity) ? Number(e.quantity) : 1,
        })),
      };
      createInboundNoteMutation.mutate(body, {
        onSuccess() {
          toast.success('Tạo phiếu thành công', { autoClose: 2000 });
          setSelectedArr([]);
          setSelectedQuantity([]);
        },
      });
    }
  };
  return (
    <>
      <HelmetSEO title='Tạo phiếu nhập' />
      <BreadCrumb path={['Fstore', 'Admin', 'Kho', 'Tạo phiếu']} />
      <section className='mt-2 flex min-h-full flex-col items-center justify-start bg-white'>
        <header className='flex w-full items-center border-b p-2 lg:w-1/2'>
          <aside className='mr-2 w-full'>
            <Combobox value={selected} onChange={setSelected}>
              <div className='relative mt-1'>
                <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                  <Combobox.Input
                    className='w-full border border-emerald-500 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                    displayValue={(product: ProductData) =>
                      `${product.name} - ${product.ram}/${product.rom} - ${product.color}`
                    }
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                    <HiOutlineChevronUpDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {filteredProducts.length === 0 && query !== '' ? (
                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>Nothing found.</div>
                    ) : (
                      filteredProducts.map((product) => (
                        <Combobox.Option
                          key={product.product_option_id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-2 pr-4 text-xs lg:pl-10 lg:text-base ${
                              active ? 'bg-teal-600 text-white' : 'text-gray-900'
                            }`
                          }
                          value={product}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'}`}
                              >
                                <img
                                  src={`${baseURL}/${product.images}`}
                                  alt='img'
                                  className='mr-2 max-h-[2rem] object-cover'
                                />
                                <span>{`${product.name} - ${product.ram}/${product.rom} - ${product.color}`}</span>
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <HiCheck className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </aside>
          <aside>
            <button
              onClick={() => {
                handleAddSelected(selected.product_option_id);
              }}
              className='rounded-md bg-emerald-500 px-2 py-2 text-xs text-white shadow-sm hover:bg-emerald-600 md:px-4'
            >
              Thêm
            </button>
          </aside>
        </header>
        <main className='min-h-[20rem] w-full p-2'>
          <h2 className='text-center text-lg font-semibold text-emerald-400'>
            Chọn sản phẩm và ấn thêm để thêm sản phẩm
          </h2>
          <article className='max-h-[18rem] overflow-y-auto'>
            {selectedArr &&
              selectedArr.map((prod, i) => (
                <div key={prod.product_option_id} className='mt-2 flex cursor-pointer items-center bg-slate-50'>
                  <img src={`${baseURL}/${prod.images}`} className='max-h-[3rem] object-cover' alt='' />
                  <div className='ml-2 flex flex-grow flex-col'>
                    <span className='text-xs md:text-base'>{`${prod.name} - ${prod.ram}/${prod.rom} - ${prod.color}`}</span>
                    <button
                      onClick={() => handleDelete(prod.product_option_id)}
                      className='inline-block text-start text-xs text-orange-400 hover:text-orange-600'
                    >
                      Xóa
                    </button>
                  </div>
                  <div className='flex items-center pr-2'>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <span
                      className='rounded-[4px] bg-green-400 px-1.5 py-0.5 duration-200 hover:bg-green-300'
                      onClick={() => handleDecrease(prod.product_option_id)}
                    >
                      <HiMinus size={16} />
                    </span>
                    <input
                      type='number'
                      value={selectedQuantity[i] ? selectedQuantity[i].quantity : 1}
                      onChange={(e) => {
                        setSelectedQuantity(
                          produce((draft) => {
                            if (isNumber(Number(e.target.value))) {
                              if (Number(e.target.value) === 0) {
                                draft[i].quantity = '';
                              } else {
                                draft[i].quantity = Number(e.target.value);
                              }
                            }
                            return draft;
                          })
                        );
                      }}
                      className='mx-1 max-w-[3rem] rounded-md border-2 border-orange-400 text-center focus:outline-none'
                    />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <span
                      className='rounded-[4px] bg-green-400 px-1.5 py-0.5 duration-200 hover:bg-green-300'
                      onClick={() => handleIncrease(prod.product_option_id)}
                    >
                      <HiPlus size={16} />
                    </span>
                  </div>
                </div>
              ))}
            {selectedArr.length !== 0 && (
              <button
                onClick={handleCreateInboundNote}
                className='mt-2 rounded-md bg-emerald-500 px-4 py-2 text-white shadow-sm hover:bg-emerald-600'
              >
                Tạo phiếu nhập
              </button>
            )}
          </article>
        </main>
      </section>
    </>
  );
}
export default CreateInboundNote;
