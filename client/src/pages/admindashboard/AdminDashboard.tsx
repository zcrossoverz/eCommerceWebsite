import MainDashboard from 'src/components/maindashboard';
import SidebarDashboard from 'src/components/sidebardashboard';

function AdminDashboard() {
  return (
    <div className='grid grid-cols-12 '>
      <div className='col-span-3 bg-amber-500 p-1 md:p-4'>
        <SidebarDashboard />
      </div>
      <div className='col-span-9 bg-teal-400 p-1 md:p-4'>
        <MainDashboard />
      </div>
    </div>
  );
}
export default AdminDashboard;
