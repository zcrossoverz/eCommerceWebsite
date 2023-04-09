import SidebarDashboard from 'src/components/admindashboard/sidebardashboard';
import { dashboard_tab } from 'src/constants/adminTab';
import { Route, Routes } from 'react-router';

// brand, invenoty, feedback, report

function AdminDashboard() {
  return (
    <div className='z-1 flex min-h-screen gap-2 bg-blue-50/50 p-4'>
      <div className='fixed hidden h-[calc(100vh-32px)] w-72 rounded-xl bg-sidebar_dashboard md:block'>
        <SidebarDashboard />
      </div>
      <div className='-mt-2 w-screen md:ml-80'>
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
