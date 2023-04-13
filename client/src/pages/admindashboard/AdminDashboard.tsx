import SidebarDashboard from 'src/components/admindashboard/sidebardashboard';
import { dashboard_tab } from 'src/constants/adminTab';
import { Route, Routes } from 'react-router';

// brand, invenoty, feedback, report

function AdminDashboard() {
  return (
    <div className='z-1 flex min-h-screen gap-2 bg-blue-50/50 lg:p-4'>
      <div className='fixed left-0 top-0 z-50 w-full bg-sidebar_dashboard lg:top-4 lg:left-2 lg:h-[calc(100vh-32px)] lg:w-72 lg:rounded-xl'>
        <SidebarDashboard />
      </div>
      <div className='mt-[4rem] w-screen lg:-mt-2 lg:ml-80'>
        <Routes>
          {dashboard_tab.map((e) => (
            <Route path={e.link} element={e.component} key={e.name} />
          ))}
        </Routes>
      </div>
    </div>
  );
}
export default AdminDashboard;
