import { useEffect } from "react";

export default function ServiceToDo() {

    useEffect(() => {
    document.title = "Service-To-Do | ServiceSphere";
  }, []);

  return (
    <div>ServiceToDo</div>
  );
}