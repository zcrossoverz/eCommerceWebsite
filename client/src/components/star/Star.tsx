import React, { useState } from 'react';
import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';
interface Props {
  ratings: number;
}
function Star({ ratings }: Props) {
  const [reviews, setReview] = useState<number>(ratings);
  const rating = Array.from({ length: 5 }, (_, i) => {
    const nums = i + 0.5;
    return (
      <span key={i}>
        {reviews >= i + 1 ? (
          <MdStar onClick={() => setReview(i + 1)} className='text-md text-yellow-300' />
        ) : reviews >= nums ? (
          <MdStarHalf className='text-md text-yellow-300' />
        ) : (
          <MdStarBorder onClick={() => setReview(i + 1)} className='text-md text-yellow-300' />
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
