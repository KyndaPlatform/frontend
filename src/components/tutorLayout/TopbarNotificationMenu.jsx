import Icon from "./Icons";
import { useEffect, useState } from "react";

export default function NotificationMenu({ onClose, anchorRef }) {
  const [pos, setPos] = useState({ top: 60, right: 40 });

  // Position menu under notification icon
  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      });
    }
  }, [anchorRef]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-20"
      />

      {/* MENU */}
      <div
        style={{ top: pos.top, right: pos.right }}
        className="
          fixed w-96 p-4 bg-[#FFFFFF] rounded-xl 
          shadow-[5px_5px_50px_0px_rgba(26,32,44,0.06)]
          flex flex-col gap-4 z-30 transition-all
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#2D2D2D] text-xl font-bold">Notification</h2>

          <button onClick={onClose}>
            <Icon icon="horizontalDots" />
          </button>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="flex flex-col">

          {/* ITEM 1 (With red new dot) */}
          <div className="px-4 py-3 flex gap-3 item-center">
            <div className="w-8 h-8 bg-[#FFF1F1] rounded-full flex justify-center items-center">
              <Icon icon="redBell" />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-[#2D2D2D] text-base font-semibold truncate max-w-[200px]">
                  Training session reminder
                </p>
                <p className="text-[#848B94] text-[10px]">Now</p>
              </div>

              <div className="flex gap-2 items-start">
                <p className="text-[#6B7280] text-sm truncate max-w-[250px]">
                  Don't forget to join your upcoming training session on the HR
                  Management Dashboard.
                </p>
                <span><Icon icon="redDot" size={8}/></span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* ITEM 2 */}
          <div className="px-4 py-3 flex gap-3 item-center">
            <div className="w-8 h-8 bg-[#F6F7F8] rounded-full flex justify-center items-center">
              <Icon icon="settingsPurple" />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-[#2D2D2D] text-base font-semibold truncate max-w-[200px]">
                  New integration announcement
                </p>
                <p className="text-[#848B94] text-[10px]">9:00 AM</p>
              </div>

              <p className="text-[#6B7280] text-sm truncate max-w-[250px]">
                Our HR Management Dashboard now integrates with [integration
                name].
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* ITEM 3 */}
          <div className="px-4 py-3 flex gap-3 item-center">
            <div className="w-8 h-8 bg-[#EEFFEE] rounded-full flex justify-center items-center">
              <Icon icon="users" />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-[#2D2D2D] text-base font-semibold truncate max-w-[200px]">
                  User feedback survey
                </p>
                <p className="text-[#848B94] text-[10px]">1 Oct 2022</p>
              </div>

              <p className="text-[#6B7280] text-sm truncate max-w-[250px]">
                Take our quick user feedback survey and help us improve our
                system.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full px-6 py-3 bg-[#1E2382] rounded-xl text-[#FFFFFF] text-base font-medium cursor-pointer">
          Show All Notifications
        </button>
      </div>
    </>
  );
}
