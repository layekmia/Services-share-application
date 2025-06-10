import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext } from "react";
import auth from "../firebase/firebase";


const AuthContext = createContext();

export default function AuthProvider({children}){



  function createAccount(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function userLogin(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signout(){
    return signOut(auth);
  }

  const value = {
    createAccount,
    userLogin,
    signout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
