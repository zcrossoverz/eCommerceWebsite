import React from 'react';
import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';
interface Props {
  ratings: number;
}
function Star({ ratings }: Props) {
  const rating = Array.from({ length: 5 }, (_, i) => {
    const nums = i + 0.5;
    return (
      <span key={i}>
        {ratings >= i + 1 ? (
          <MdStar className='text-md text-yellow-300' />
        ) : ratings >= nums ? (
          <MdStarHalf className='text-md text-yellow-300' />
        ) : (
          <MdStarBorder className='text-md text-yellow-300' />
        )}
      </span>
    );
  });
  return (
    <>
      <div className='flex items-center'>{rating}</div>
    </>
  );
}

export default Star;
