import MainDashboard from 'src/components/maindashboard';
import SidebarDashboard from 'src/components/sidebardashboard';


function AdminDashboard() {
  return (
    <div className='flex bg-blue-50 min-h-screen p-4 gap-2'>
      <div className='bg-cyan-900 h-[calc(100vh-32px)] w-72 rounded-xl fixed hidden md:block md:overflow-hidden'>
        <SidebarDashboard />
      </div>
      <div className='bg-blue-200 w-screen md:ml-80'>
        <MainDashboard />
      </div>
    </div>
  );
}
export default AdminDashboard;
