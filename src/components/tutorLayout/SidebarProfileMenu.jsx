import { useNavigate } from "react-router-dom";
import Icon from "./Icons";



const profileMenuItems = [
  { label: "Profile", icon: "profile" },
  { label: "Settings", icon: "settings" },
  { label: "Notification", icon: "notification" },
  { label: "Invite a friend", icon: "invite" },
];

const logoutItem = { label: "Logout", icon: "logOut", danger: true };



export default function SidebarProfileMenu() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // clear stored tokens here
    // localStorage.removeItem("token");

    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-54 mt-5 bg-[#FFFFFF] rounded-xl outline outline-1 outline-[#E5E5E5] inline-flex flex-col">

  {/* MAIN ITEMS */}
  {profileMenuItems.map(item => (
    <button
      key={item.label}
      className="
        w-54 h-9 px-3 py-2 rounded-xl
        flex items-center gap-3
        hover:bg-[#F6F6F6] transition
      "
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <Icon icon={item.icon} />
      </div>

      <span className="text-[#6B7280] text-base font-medium leading-6">
        {item.label}
      </span>
    </button>
  ))}

  {/* DIVIDER */}
  <div className="w-full border-t border-[#E5E5E5]" />

  {/* LOGOUT */}
  <button
    onClick={handleLogout}
    className="
      w-54 h-9 px-3 py-2 rounded-xl
      flex items-center gap-3
      hover:bg-red-100 transition
    "
  >
    <div className="w-6 h-6 flex items-center justify-center">
      <Icon icon={logoutItem.icon} />
    </div>

    <span className="text-[#D00707] text-base font-medium leading-6">
      {logoutItem.label}
    </span>
  </button>

</div>
)}
