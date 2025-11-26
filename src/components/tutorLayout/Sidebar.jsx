import {useState, useRef, useEffect} from "react";
import Logo from "../Logo";
import Icon from "./Icons";
import SidebarProfile from "./SidebarProfile";
import SidebarProfileMenu from "./SidebarProfileMenu";

const navItems = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "My Sections", icon: "sections" },
  { label: "Courses", icon: "courses" },
  { label: "Resources", icon: "resources" },
  { label: "Earnings", icon: "earnings" },
  { label: "Report", icon: "report" },
  { label: "Message", icon: "message" }
];

export default function Sidebar() {

  const[showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  //close menu when clicking outside of menu block
  useEffect(()=>{
    function handleClickOutside(event){
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setShowMenu(false);
      }
    }

    if (showMenu) {
    document.addEventListener("mousedown", handleClickOutside);
    }

    return()=>{
    document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [showMenu]);






  return (
    <aside className="bg-[#FFFFFF] border-r border-[#E5E5E5] p-4 flex flex-col justify-between">
      
      {/* Logo */}
      <Logo />
      
      {/* Menu */}
      <div className="mt-8 mb-8 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="
              w-full h-10 px-3 py-2.5 rounded-2xl 
              flex items-center gap-3
              hover:bg-[#F6F6F6] transition
            "
          >
            {/* Icon container */}
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon icon={item.icon} size={20} />
            </div>

            {/* Label */}
            <span className="text-[#6B7280] text-base font-medium leading-6">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* SUBSCRIPTION BOX */}
<div className="relative pb-8 w-54 bg-[#FFF6E9] border border-[#FFA726] rounded-2xl shadow p-3 pt-4">
  
  {/* TEXT CONTENT */}
  <div className="flex flex-col items-center gap-1.5">
    <p className="text-[#FF6839] text-base font-semibold leading-6 text-center">
      Upgraded to Premium 🚀
    </p>

    <p className="text-[#2D2D2D] text-xs font-normal leading-4 text-center w-46">
      Get 7 days free and unlock all the features of the pro plan.
    </p>
  </div>

  {/* BUTTON – OVERLAPS BOTTOM */}
  <button
    className="
      absolute left-1/2 -translate-x-1/2
      bottom-[-20px]
      w-44 h-10 rounded-full
      flex items-center justify-center gap-2
      text-[#FFFFFF] text-sm font-semibold
      bg-gradient-to-l from-[#FF6839] to-[#FFA726]
      shadow-md
      cursor-pointer
    "
  >
    <div className="w-5 h-5 flex items-center justify-center">
      <Icon icon="premiumCrown" size={18} />
    </div>
    Change Plan
  </button>
 </div>

 {/* TUTOR PROFIlE*/}
      <div className="mt-auto pt-8">
        <div className="transition-opacity duration-300" style={{ opacity: showMenu ? 0 : 1 }}>
  {!showMenu && (
    <SidebarProfile onClick={() => setShowMenu(true)} />
  )}
</div>

<div
  ref={menuRef}
  className="transition-opacity duration-300"
  style={{ opacity: showMenu ? 1 : 0 }}
>
  {showMenu && (
    <SidebarProfileMenu />
  )}
</div>

      </div>

    </aside>
  );
}
