import classNames from 'classnames';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { createSearchParams, Link } from 'react-router-dom';
import path from 'src/constants/path';
import { ProductListConfig } from 'src/types/product.type';

interface Props {
  pageSize: number;
  queryConfig: {
    [key in keyof ProductListConfig]: string;
  };
}
const RANGE = 2;
function Pagination({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page);
  let dotAfter = false;
  let dotBefore = false;
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true;
      return (
        <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
          ...
        </span>
      );
    }
    return null;
  };
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true;
      return (
        <span key={index} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
          ...
        </span>
      );
    }
    return null;
  };
  const renderPagination = () => {
    return Array(pageSize || 1)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index);
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index);
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              'mx-2 min-w-[2.4rem] cursor-pointer rounded border bg-white px-3 py-2 text-center shadow-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page,
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded border bg-white/60 px-3 py-2 shadow-sm'>
          <GrPrevious />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className='mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm'
        >
          <GrPrevious />
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded border bg-white/60 px-3 py-2 shadow-sm'>
          <GrNext />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'
        >
          <GrNext />
        </Link>
      )}
    </div>
  );
}
export default Pagination;
