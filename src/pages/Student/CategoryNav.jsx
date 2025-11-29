import { useState } from "react";
import { ListFilter, X } from "lucide-react";

const category = [
  "science",
  "english",
  "mathematics",
  "art",
  "exam prep",
  "literacy",
  "junior classes",
  "senior classes",
  "WAEC/NECO",
  "JAMB/UTME",
];

export default function CategoryNav() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
  };
  return (
    <section className="bg-[#0B0C2E] py-3">
      <div className="max-w-screen-2xl mx-auto flex justify-between px-4">
        <div className="flex gap-2 flex-wrap">
          {category.map((cat) => (
            <button
              className="text-white text-sm font-medium capitalize bg-white/10 px-4 py-2 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              key={cat}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            className="inline-flex gap-2 bg-[#FF6839] text-white px-4 py-2 rounded-full cursor-pointer transition-transform active:scale-95"
            onClick={handleToggleSearch}
          >
            Filter <ListFilter size={18} />
          </button>
          {toggleSearch && <SearchFilter />}
        </div>
      </div>
    </section>
  );
}

function SearchFilter() {
  return (
    <div className="absolute top-full right-0  translate-y-2 bg-white w-[450px] py-4 shadow">
      <header className="flex justify-between px-4 pb-2 border-b border-gray-200">
        <h3>search on kynda</h3>
        <button className="flex justify-center items-center w-7 h-7 bg-[#E2E8F0] rounded-full cursor-pointer">
          <X size={16} color="#2D2D2D" />
        </button>
      </header>
    </div>
  );
}
