import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/mainlayout';
import AuthLayout from './layouts/authlayout';
import ProductList from './pages/products';
import RejectedRoute from './routes/rejectedroute';
import ProtectedRoute from './routes/protectedroute';
import Profile from './layouts/profile';
import ProfileUser from './pages/profileuser';
import path from './constants/path';
import Banner from './components/banner';
import AdminDashboard from './pages/admindashboard';
import AdminRoute from './routes/adminroute';
import ProductDetails from './components/productdetails';
import ProductDetailsLayout from './layouts/productdetails';
import CartLayout from './layouts/cartlayout';
import CartUser from './pages/cart';
import NotFound from './pages/notfoundpage';
import CheckoutLayout from './layouts/checkoutlayout';
import Checkout from './pages/checkout';
function App() {
  return (
    <div>
      <Routes>
        <Route
          index
          path={path.home}
          element={
            <MainLayout>
              <Banner />
              <ProductList />
            </MainLayout>
          }
        />
        <Route path='' element={<ProtectedRoute />}>
          <Route
            path={path.checkout}
            element={
              <CheckoutLayout>
                <Checkout />
              </CheckoutLayout>
            }
          />
          <Route
            path={path.profile}
            element={
              <Profile>
                <ProfileUser />
              </Profile>
            }
          ></Route>
          <Route
            path={path.cart}
            element={
              <CartLayout>
                <CartUser />
              </CartLayout>
            }
          />
        </Route>

        <Route path='' element={<RejectedRoute />}>
          <Route
            path={path.login}
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          <Route
            path={path.register}
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Route>
        <Route path='' element={<AdminRoute />}>
          <Route path={path.admin} element={<AdminDashboard />} />
        </Route>
        <Route
          path={path.productDetails}
          element={
            <ProductDetailsLayout>
              <ProductDetails />
            </ProductDetailsLayout>
          }
        ></Route>

        <Route
          path={path.brand}
          element={
            <MainLayout>
              <Banner />
              <ProductList />
            </MainLayout>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
