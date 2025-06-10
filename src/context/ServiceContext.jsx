import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";

const ServiceContext = createContext();

export default function ServiceProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        const { displayName: name, email, photoURL: image, uid } = currentUser;
        setUser({ name, email, image, uid });
      } else {
        setUser(null);
      }
      setIsUserLoggedIn(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, isOpen, setIsOpen, isUserLoggedIn };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

function useService() {
  return useContext(ServiceContext);
}

export { useService };
