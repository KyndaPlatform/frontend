import Icon from "./Icons";

export default function SidebarProfile({onClick}) {
  return (
    <div onClick={onClick} className="w-54 flex items-center justify-between cursor-pointer">

      {/* LEFT SIDE — Avatar & Text */}
      <div className="flex items-center gap-2">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#858C95] flex items-center justify-center overflow-hidden">
          <img
            src="../../images/tutor-profile-pic.jpg"
            alt="User avatar"
            className="w-12 h-10 object-cover"
          />
        </div>

        {/* Name + Role */}
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <p className="text-[#2D2D2D] text-sm font-medium leading-5">
              Belrah Mercy
            </p>

            {/* Online Indicator */}
            <div className="w-5 h-5 flex items-center justify-center">
              <Icon icon="verified" size={18} />
            </div>
          </div>

          <p className="text-[#858C95] text-xs font-normal leading-4">
            Tutor
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — Dropdown Chevron */}
      <div className="w-4 h-4 flex items-center justify-center">
        <Icon icon="arrowDown" size={10} />
      </div>

    </div>
  );
}