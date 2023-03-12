import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}
export default useQueryParams;
