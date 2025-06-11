import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";

const ServiceContext = createContext();

export default function ServiceProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName: name, email, photoURL: image, uid } = currentUser;
        setUser({ name, email, image, uid });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, authLoading, isOpen, setIsOpen };
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

export function useService() {
  return useContext(ServiceContext);
}
