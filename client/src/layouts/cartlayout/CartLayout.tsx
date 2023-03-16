import Footer from 'src/components/footer';
import Header from 'src/components/header';
interface Props {
  children: React.ReactNode;
}
function Cartlayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
export default Cartlayout;
