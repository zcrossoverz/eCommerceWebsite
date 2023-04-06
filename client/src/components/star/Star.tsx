import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setRating } from 'src/slices/product.slice';
interface Props {
  ratings: number;
  size?: string;
  mode?: string;
}

function Star({ ratings, size, mode }: Props) {
  const dispatch = useDispatch();
  const handleChangeRating = (rate: number, mode?: string) => {
    if (mode === 'COMMENT') {
      console.log(rate);
      dispatch(
        setRating({
          rating: rate,
        })
      );
    }
  };
  const rating = Array.from({ length: 5 }, (_, i) => {
    const nums = i + 0.5;
    return (
      <span key={i}>
        {ratings >= i + 1 ? (
          <MdStar
            className={`text-yellow-300 ${size ? 'text-' + size : 'text-md'}`}
            onClick={() => handleChangeRating(i + 1, mode)}
          />
        ) : ratings >= nums ? (
          <MdStarHalf className='text-md text-yellow-300' />
        ) : (
          <MdStarBorder
            className={`text-yellow-300 ${size ? 'text-' + size : 'text-md'}`}
            onClick={() => handleChangeRating(i + 1, mode)}
          />
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
