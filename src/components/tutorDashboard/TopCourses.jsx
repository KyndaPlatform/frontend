import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#009BFF", "#FFA726", "#4CAF50", "#398DC2", "#FF6839"];

const pieData = [
  { name: "Physics", value: 30 },
  { name: "Chemistry", value: 35 },
  { name: "Mathematics", value: 25 },
  { name: "Exam Prep", value: 10 },
  { name: "English", value: 5 },
];

const courseList = [
  { title: "Physics", amount: "$240", percent: "(30%)" },
  { title: "Chemistry", amount: "$240", percent: "(35%)" },
  { title: "Mathematics", amount: "$440", percent: "(25%)" },
  { title: "Exam Prep", amount: "$40", percent: "(10%)" },
  { title: "English", amount: "$40", percent: "(5%)" },
];

export default function TopCourses() {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] shadow rounded-xl p-6">
      
      <h2 className="text-[#2D2D2D] text-xl font-semibold font-inter leading-7">
        Top Enrolled Courses
      </h2>

      <div className="flex gap-6 mt-6">
        
        {/* Pie Chart */}
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* List */}
        <div className="flex-1 space-y-4">
          {courseList.map((course, i) => (
            <div key={i} className="flex justify-between items-center">
              
              <p className="text-[#344256] text-sm font-medium font-inter">
                {course.title}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[#00A9C1] text-sm font-medium font-inter">
                  {course.amount}
                </span>

                <span className="text-[#848B94] text-sm font-normal font-inter">
                  {course.percent}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
