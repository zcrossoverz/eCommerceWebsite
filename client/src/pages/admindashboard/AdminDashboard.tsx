
import { useSelector } from 'react-redux';
import SidebarDashboard from 'src/components/admindashboard/sidebardashboard';
import { dashboardTabInterface, dashboard_tab } from 'src/constants/adminTab';
import { selectCurrentTab } from 'src/slices/navigation.slice';

// brand, invenoty, feedback, report

function AdminDashboard() {
  const currentTab = useSelector(selectCurrentTab) as keyof dashboardTabInterface;

  return (
    <div className='z-1 flex min-h-screen gap-2 bg-blue-50/50 p-4'>
      <div className='fixed hidden h-[calc(100vh-32px)] w-72 rounded-xl bg-sidebar_dashboard md:block md:overflow-hidden'>
        <SidebarDashboard active={dashboard_tab[currentTab].name} />
      </div>
      <div className='-mt-2 w-screen md:ml-80'>{dashboard_tab[currentTab].component}</div>
    </div>
  );
}
export default AdminDashboard;
