import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { app } from '../firebae.configue'
import axios from "axios";

export const AuthContext = createContext()
export const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(false)
  const [role, setRole] = useState(null);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData)
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setLoading(false)
      }
    });

    return () => unsubscribe()

  }, [])

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Simple fetch – no axios needed
    fetch(`http://localhost:3000/role?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setRole(data.role);        // "admin" | "volunteer" | "donor"
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);






  const authData = {
    role,
    register,
    login,
    user,
    setUser,
    logout,
    loading,
    setLoading,
    updateUser,
    admin,
    setAdmin
  }


  return <AuthContext value={authData}> {children}</AuthContext>
}

export default AuthProvider