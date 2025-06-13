import { useNavigate } from "react-router-dom";
import ErrorPageAnimation from "./animation/ErrorAnimation";

export default function ErrorPage() {
  const navigate = useNavigate('')
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
     <div className="max-w-xl mx-auto h-[400px] items-center">
       <ErrorPageAnimation/>
     </div>
      <button onClick={() => navigate('/')} className="py-2 px-5 bg-blue-600 rounded text-white">Back to Home page</button>
    </div>
  );
}