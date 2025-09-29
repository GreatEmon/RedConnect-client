import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import Loading from '../components/Loading'
import { AuthContext } from '../context/AuthProvider'
import Swal from 'sweetalert2'


const PrivateRouteAll = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children
    } else {
        Swal.fire({
            title: "Please Log In ",
            text: "Log in to see",
            icon: "error"
        });
        return <Navigate state={location.pathname} to='/login'></Navigate>
        
    }
}

export default PrivateRouteAll