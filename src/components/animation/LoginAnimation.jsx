import Lottie from "lottie-react";
import animation from "../../../public/animation/login.json";

export default function LoginAnimation() {
  return <Lottie className="w-full h-full" animationData={animation} />;
}
