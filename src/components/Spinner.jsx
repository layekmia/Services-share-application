export default function LoadSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="w-14 h-14 md:w-20 md:h-20 border-4  rounded-full border-t-4 border-t-blue-600 animate-spin"></div>
    </div>
  );
}
