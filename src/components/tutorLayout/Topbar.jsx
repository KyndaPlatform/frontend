import { useState, useRef } from "react";
import Icon from "./Icons";
import NotificationMenu from "./TopbarNotificationMenu";
import AiToolsMenu from "./AiToolsMenu";

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const notifRef = useRef(null);
  const [showAiMenu, setShowAiMenu] = useState(false);
  const aiRef = useRef(null);

  return (
    <>
      {/* TOPBAR */}
      <div className="pl-6 pr-10 py-4 bg-[#FFFFFF] border-b border-[#E5E5E5] flex justify-between items-center relative z-30">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-20">

          {/* Welcome Text */}
          <div className="w-80 flex items-center">
            <p className="text-[#020A1F] text-2xl font-semibold leading-8">
              Welcome Back Belrah!🖐
            </p>
          </div>

          {/* Search Bar */}
          <div
            className="
              w-72 p-3 bg-[#FAFAFA] rounded-full 
              shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)]
              outline outline-1 outline-offset-[-1px] outline-[#EDEDED]
              flex items-center gap-2
            "
          >
            <Icon icon="search"/>

            <input
              type="text"
              placeholder="search"
              className="flex-1 bg-transparent text-gray-400 text-base font-medium leading-5 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* KYNDA ASSISTANT BUTTON */}
          <button
            ref={aiRef}
            onClick={() => {setShowAiMenu(!showAiMenu);
            setShowMenu(false);
            }}
            className="
              p-3 bg-[#E2E8F0] rounded-full
              outline outline-1 outline-offset-[-1px] outline-[#E5E5E5]
              flex items-center gap-1 scale-92 cursor-pointer
            "
          >
            <Icon icon="aiLogo" />
            <span className="text-[#1E2382] text-base font-medium leading-6">
              Kynda Assistant
            </span>
          </button>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">

            {/* NOTIFICATION BUTTON */}
            <div
              ref={notifRef}
              onClick={() => {setShowMenu(!showMenu);
                setShowAiMenu(false)
              }}
              className="
                w-10 h-10 relative bg-[#FAFAFA] rounded-full 
                outline outline-1 outline-offset-[-1px] outline-[#EDEDED] 
                overflow-hidden cursor-pointer
              "
            >
              <div className="absolute left-[10px] top-[10px] inline-flex">
                <div className="w-6 h-6 relative rounded-[5px] overflow-hidden">
                  <Icon icon="topbarBell" />
                </div>

                {/* Notification Badge */}
                <div className="absolute left-[16px] top-0 w-1.5 h-1.5 bg-[#D00707] rounded-xl outline outline-2 outline-[#FFFFFF]"></div>
              </div>
            </div>

            {/* Settings Icon */}
            <div
              className="
                w-10 h-10 relative bg-[#FAFAFA] rounded-full 
                outline outline-1 outline-offset-[-1px] outline-[#EDEDED] overflow-hidden
              "
            >
              <div className="w-6 h-6 absolute left-[10px] top-[10px] overflow-hidden">
                <Icon icon="topbarMessage" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION MENU */}
      {showMenu && (
        <NotificationMenu
          onClose={() => setShowMenu(false)}
          anchorRef={notifRef}
        />
      )}

      {/* AI TOOLS MENU */}
      {showAiMenu && (
        <AiToolsMenu
        onClose={() => setShowAiMenu(false)}
        anchorRef={aiRef}
      />
)}
    </>
  );
}
