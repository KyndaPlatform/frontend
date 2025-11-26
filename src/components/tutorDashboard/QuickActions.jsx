import Icon from "../tutorLayout/Icons";

const actions = [
  {
    title: "Create Course",
    subtitle: "Add New Teaching Material",
    icon: "graduationCap",
    active: true,
  },
  {
    title: "Schedule Section",
    subtitle: "Set up new class sections",
    icon: "calendarClock",
  },
  {
    title: "View Reports",
    subtitle: "Analyze your performance",
    icon: "coinStack",
  },
  {
    title: "Upload Resources",
    subtitle: "Share more resources",
    icon: "bookOpen",
  },
];

export default function QuickActions() {
  return (
    <div
      className="
        w-full px-6 py-4 bg-[#FFFFFF] rounded-xl
        shadow-[0px_2px_10px_rgba(212,212,216,0.20)]
        shadow-[0px_4px_11.3px_rgba(212,212,216,0.14)]
        shadow-[inset_0px_0px_1px_rgba(212,212,216,0.15)]
        outline outline-1 outline-offset-[-1px] outline-[#E5E5E5]
        flex flex-col gap-6
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div
  className="
    w-5 h-5 bg-[#E6F6F9] rounded-full relative
    flex items-center justify-center
    shadow-[0px_2px_10px_rgba(212,212,216,0.20),0px_4px_11.3px_rgba(212,212,216,0.14),inset_0px_0px_1px_rgba(212,212,216,0.15)]
    outline outline-1 outline-offset-[-1px] outline-[#E6F6F9]
  "
>
  <Icon icon="circleCheck" size={12} />
</div>

        <h2 className="text-[#2D2D2D] text-xl font-semibold font-inter leading-7">
          Quick Actions
        </h2>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {actions.map((a, i) => (
          <div
            key={i}
            className={`
              px-4 py-6 rounded-xl
              outline outline-1 outline-offset-[-1px]
              flex flex-col items-center gap-6
              ${a.active ? "bg-[#E6F6F9] outline-[#E6F6F9] " : "bg-[#F9F9F9] outline-[#E5E5E5]"}
              transition-all duration-200 cursor-pointer

              hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)]
              hover:outline-[#E6F6F9]
              hover:-translate-y-[2px]
            `}
          >
            {/* TOP ICON BUBBLE */}
            <div
              className={`
                p-1.5 rounded-full
                ${a.active ? "bg-[#00A9C1] outline-[#00A9C1]" : "bg-[#F1F5F9] outline-[#E5E5E5]"}
                outline outline-1 outline-offset-[-1px]
                flex justify-center items-center
                transition-all duration-200

                group-hover:bg-['#E6F6F9']
              `}
            >
              <Icon icon={a.icon} size={20} />
            </div>

            {/* TEXT */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-[#344256] text-xl font-semibold font-inter leading-7">
                {a.title}
              </p>
              <p className="text-center text-[#848B94] text-base font-normal font-inter leading-6 w-52">
                {a.subtitle}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

