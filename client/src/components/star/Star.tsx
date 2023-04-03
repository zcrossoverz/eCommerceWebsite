import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';
interface Props {
  ratings: number;
  size?: string;
  mode?: string;
}
const handleChangeRating = (rate: number, mode?: string) => {
  if (mode === 'COMMENT') {
    console.log(rate);
  }
};
function Star({ ratings, size, mode }: Props) {
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
