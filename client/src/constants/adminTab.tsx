import InventoryDashboard from 'src/components/admindashboard/inventorydashboard';
import MainDashboard from 'src/components/admindashboard/maindashboard/MainDashboard';
import OrderDashboard from 'src/components/admindashboard/orderdashboard';
import ProductDashboard from 'src/components/admindashboard/productdashboard';
import ManageBrand from 'src/components/admindashboard/productdashboard/ManageBrand';
import ManageCoupon from 'src/components/admindashboard/productdashboard/ManageCoupon';
import ManageProduct from 'src/components/admindashboard/productdashboard/ManageProduct';
import ReportDashboard from 'src/components/admindashboard/reportdashboard';
import UserDashboard from 'src/components/admindashboard/userdashboard';

export interface dashboardTabInterface {
  [name: string]: {
    name: string;
    component: JSX.Element;
  };
}

export const dashboard_tab: dashboardTabInterface = {
  home: { name: 'home_dashboard', component: <MainDashboard /> },
  product: { name: 'product_dashboard', component: <ProductDashboard /> },
  manage_product: { name: 'product_dashboard', component: <ManageProduct /> },
  manage_brand: { name: 'product_dashboard', component: <ManageBrand /> },
  manage_coupon: { name: 'product_dashboard', component: <ManageCoupon /> },
  order: { name: 'order_dashboard', component: <OrderDashboard /> },
  inventory: { name: 'inventory_dashboard', component: <InventoryDashboard /> },
  report: { name: 'report_dashboard', component: <ReportDashboard /> },
  user: { name: 'user_dashboard', component: <UserDashboard /> },
};
