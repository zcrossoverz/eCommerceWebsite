import { useState } from 'react';
import MainDashboard from 'src/components/admindashboard/maindashboard';
import ProductDashboard from 'src/components/admindashboard/productdashboard';
import SidebarDashboard from 'src/components/admindashboard/sidebardashboard';

// brand, invenoty, feedback, report

function AdminDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <div className='flex min-h-screen gap-2 bg-blue-50/50 p-4 z-1'>
      <div className='fixed hidden h-[calc(100vh-32px)] w-72 rounded-xl bg-sidebar_dashboard md:block md:overflow-hidden'>
        <SidebarDashboard active={tab} />
      </div>
      <div className='-mt-2 w-screen md:ml-80'>
      {tab == 0 && <MainDashboard />}
      {tab == 1 && <ProductDashboard />}
      </div>
    </div>
  );
}
export default AdminDashboard;
