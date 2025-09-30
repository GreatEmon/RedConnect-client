import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { app } from '../firebae.configue'

export const AuthContext = createContext()
export const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [roleLoading, setRoleLoading] = useState(true)
  const [role, setRole] = useState(null);

  const register = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData)
  }



  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    });

    return () => unsubscribe()

  }, [])

  useEffect(() => {
    if (!user) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    // Simple fetch – no axios needed
    fetch(`https://red-connect-backend.vercel.app/role?email=${user.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setRole(data.role);        // "admin" | "volunteer" | "donor"
        setRoleLoading(false)
      })
      .catch((err) => console.log(err));
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
    roleLoading
  }


  return (
  <AuthContext.Provider value={authData}>
    {children}
  </AuthContext.Provider>
);

}

export default AuthProvider