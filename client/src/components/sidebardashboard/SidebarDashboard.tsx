import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
// eslint-disable-next-line import/named
import { IconType } from "react-icons/lib";

type PropsButton = {
  name: string;
  Icon: IconType;
  active: boolean;
}

const ButtonNav = ({ name, Icon, active = false }: PropsButton) => {
  return <div className={`flex items-center mx-4 px-4 rounded-md ${active && "bg-blue-400"}`}>
    <Icon className="text-white"/>
    <button className='text-white py-4 text-left px-4'>{name}</button>
    </div>;
};
function SidebarDashboard() {
  return (<div>
      <div className='mx-2 flex items-center py-6'>
        <div className='w-full text-center text-base font-semibold text-white'>Admin Dashboard</div>
      </div>
        <hr className='border-cyan-800' />
      <div className="my-4">
        <ButtonNav name={"Home"} Icon={AiFillHome} active={true} />
        <ButtonNav name={"Products"} Icon={BsFillCartFill} active={false} />
        <ButtonNav name={"Orders"} Icon={FaMoneyCheckAlt} active={false} />
        <ButtonNav name={"Setting"} Icon={AiFillSetting} active={false} />
      </div>
        </div>
      );
}
export default SidebarDashboard;

// Home, Products, Orders, 