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
function App() {
  return (
    <div>
      <Routes>
        <Route
          index
          path={path.home}
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />

        <Route path='' element={<ProtectedRoute />}>
          <Route
            path={path.profile}
            element={
              <Profile>
                <ProfileUser />
              </Profile>
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
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
