import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from 'src/contexts/app.context';

function ProtectedRoute() {
  const { isAuth } = useContext(AppContext);
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
}
export default ProtectedRoute;
