import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
// interface Props {
//   children: React.ReactNode;
// }
// type ProtectedRouteProps = {
//   isAuth: boolean;
//   isAdmin:boolean;
//   authenticationPath: string;
//   outlet: JSX.Element;a
// };
function AdminRoute() {
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  if (userInfo && userInfo.role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to='/' />;
}
export default AdminRoute;
