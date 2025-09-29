import React, { use } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { AuthContext } from '../context/AuthProvider'
import Loading from '../components/Loading'

const MainLayout = () => {

  const {user, loading} = use(AuthContext)

  if(loading) return <Loading></Loading>
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer> 
    </>
  )
}

export default MainLayout