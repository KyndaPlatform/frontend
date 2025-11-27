import StudentNavbar from "../../components/StudentNavbar";
import Footer from "../../components/Footer";
import LaptopImg from "../../../public/images/laptop.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const totalLessons = 7;

// dummy data for the courses
const courseTemplate = {
  date: new Date(),
  duration: "2:46:12",
  thumbnail: LaptopImg,
  subject: "Mathematics & Physics class",
  total: totalLessons,
  completed: 5,
};

// course to generate the randomly completed
const course = () => ({
  ...courseTemplate,
  completed: Math.floor(Math.random() * (totalLessons + 1)),
});

export default function MyLearning() {
  const courses = Array.from({ length: 8 }, course);

  return (
    <>
      <StudentNavbar />
      <main className="py-8">
        {/* courses enrolled section */}

        <section className="max-w-screen-2xl mx-auto px-4">
          <h1 className="my-14 text-[#0B0C2E] font-bold text-4xl">
            Enrolled Sections
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4">
            {courses.map((course, idx) => (
              <EnrolledCourse key={idx} course={course} />
            ))}
          </div>
        </section>

        {/* courses completed section */}
        <section className="max-w-screen-2xl mx-auto mt-48 px-4">
          <h1 className="my-14 text-[#0B0C2E] font-bold text-4xl">
            Completed Section
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4">
            {courses.map((course, idx) => (
              <CompletedCourse key={idx} course={course} />
            ))}
          </div>
        </section>

        {/* recommeded for you section */}
        <section className="max-w-screen-2xl mx-auto mt-48 px-4">
          <div className="flex justify-between items-center">
            <h1 className="my-14 text-[#0B0C2E] font-bold text-4xl">
              Recommeded for you
            </h1>
            <div className="flex gap-3">
              <button className="flex justify-center items-center h-10 w-10 shadow rounded-full hover:bg-[#00A9C1] hover:text-white cursor-pointer">
                <ChevronLeft />
              </button>
              <button className="flex justify-center items-center h-10 w-10 shadow rounded-full hover:bg-[#00A9C1] hover:text-white cursor-pointer">
                <ChevronRight />
              </button>
            </div>
          </div>
          {/*  the recommended cards*/}
          <div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EnrolledCourse({ course }) {
  return (
    <article className="p-4 rounded-xl shadow border border-[#E2E8F0]">
      <header className="mb-4 flex justify-between items-center">
        <p className="font-bold capitalize text-base ">
          Next class:
          <span className="font-thin">{course.date.toLocaleDateString()}</span>
        </p>
        <time className="font-medium text-[#00A9C1]">{course.duration}</time>
      </header>
      <figure className="w-full ">
        <img src={course.thumbnail} alt="laptop image" className="w-full" />
      </figure>
      <figcaption className="my-4 font-bold text-[#0B0C2E]">
        {course.subject}
      </figcaption>
      <div className="w-full h-3 rounded-xl bg-[#E2E8F0]">
        <div
          className="h-full rounded-xl bg-[#00A9C1]"
          style={{ width: `${(course.completed / course.total) * 100}%` }}
        ></div>
      </div>
      <p className="my-2 text-right text-[#344256]">
        Lesson {course.completed} of {course.total}
      </p>
      <button className="bg-[#F1F5F9] w-full mt-4 p-3 text-[#1E2382] border border-[#E2E8F0] rounded-lg cursor-pointer">
        Join your class
      </button>
    </article>
  );
}

function CompletedCourse({ course }) {
  return (
    <article className="p-4 rounded-xl shadow border border-[#E2E8F0]">
      <figure className="w-full ">
        <img src={course.thumbnail} alt="laptop image" className="w-full" />
      </figure>
      <figcaption className="my-4 font-bold text-[#0B0C2E]">
        {course.subject}
      </figcaption>
      <div className="w-full h-3 rounded-xl bg-[#E2E8F0]">
        <div
          className="h-full rounded-xl bg-green-500"
          style={{ width: `100%` }}
        ></div>
      </div>
      <p className="my-2 text-right text-[#344256]">Lesson 7 of 7</p>
      <button className="bg-[#00A9C1] w-full mt-4 p-3 text-[#E6F6F9] rounded-lg cursor-pointer">
        Class Completed
      </button>
    </article>
  );
}
