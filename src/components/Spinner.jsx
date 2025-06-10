export default function LoadSpinner() {
  return (
   <div className="w-full h-screen flex items-center justify-center dark:bg-gray-800">
     <div className="w-20 h-20 border-4  rounded-full border-t-4 border-t-blue-600 animate-spin"></div>
   </div>
  );
}