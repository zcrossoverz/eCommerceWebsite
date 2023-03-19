import { Helmet } from 'react-helmet-async';
function HelmetSale({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
export default HelmetSale;
