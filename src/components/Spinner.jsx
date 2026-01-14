export default function Spinner() {
  return (
    <div className="w-6 h-6 mx-auto relative">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-transparent border-b-transparent animate-spin opacity-30 backdrop-blur-sm"></div>
    </div>
  );
}
