import Sidebar from "../../components/tutorLayout/Sidebar";
import Topbar from "../../components/tutorLayout/Topbar";
import StatsSection from "../../components/tutorDashboard/StatsSection";
import MonthlyChart from "../../components/tutorDashboard/MonthlyChart";
import TopCourses from "../../components/tutorDashboard/TopCourses";
import QuickActions from "../../components/tutorDashboard/QuickActions";

export default function TutorDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="pt-4 px-8 pb-6 space-y-10">
          <StatsSection />
          
          <div className="grid grid-cols xl:grid-cols-2 gap-4">
            <MonthlyChart />
            <TopCourses />
          </div>

          <QuickActions />
        </main>
      </div>
    </div>  );
}