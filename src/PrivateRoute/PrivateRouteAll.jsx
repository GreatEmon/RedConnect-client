import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import Loading from '../components/Loading'
import { AuthContext } from '../context/AuthProvider'


const PrivateRouteAll = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

  if (loading) return <Loading />; // wait for Firebase check
 
  
  if (!user) return <Navigate to="/login" state={location.pathname}/>;
  
  return children;

}

export default PrivateRouteAll