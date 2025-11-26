import Icon from "../tutorLayout/Icons";


const stats = [
  {
    label: "Total Earnings",
    value: "₦125,000",
    change: "+3 from last month",
    color: "text-[#4CAF50]",
    topIcon: "bookOpen",
    icon: "upwardTrendGreen"
  },
  {
    label: "Completed Courses",
    value: "84",
    change: "-2.5 hours this week",
    color: "text-[#D00707]",
    topIcon: "pending",
    icon: "downwardTrend"
  },
  {
    label: "Student Satisfaction",
    value: "96%",
    change: "+12% from last month",
    color: "text-[#4CAF50]",
    topIcon: "upwardTrendGrey",
    icon: "upwardTrendGreen"
  },
  {
    label: "Active Students",
    value: "428",
    change: "Requires your attention",
    color: "text-[#FFA726]",
    topIcon: "info",
    icon: "upwardTrendYellow"
  }
];

export default function StatsSection() {
  return (
    <div>{/* Header container */}
      <div className="w-full pb-3 flex items-center gap-20">

        {/* Left block (title + description) */}
        <div className="w-[637px] flex flex-col gap-1.5">

          {/* Title row */}
          <div className="w-[670px] flex items-center gap-4">
            <h2 className="text-[#344256] text-2xl font-inter font-medium leading-8">
              Dashboard
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-[#6B7280] text-base font-dmSans font-normal leading-6">
            Overview of your teaching activities and performance
          </p>
        </div>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div 
          key={i}
          className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow p-4 space-y-3
          cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)]
              hover:outline-[#E6F6F9]
              hover:-translate-y-[2px]"
        >
          <p className="flex justify-between items-center w-full">
            <span className="text-[#6B7280] text-xs font-medium font-dmsans">{s.label}</span>
            <span><Icon icon={s.topIcon} size={16} /></span>
          </p>
          <p className="text-[#2D2D2D] text-3xl font-bold font-inter">{s.value}</p>
          <p className="flex space-x-2">
            <span><Icon icon={s.icon} size={16}/></span>
          <span className={`${s.color} text-xs font-medium font-dmsans`}>{s.change}</span></p>
        </div>
      ))}
    </div>
  </div>
  );
}
