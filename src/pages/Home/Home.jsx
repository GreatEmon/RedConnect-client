import React, { use } from 'react'
import Banner from '../../components/Banner'
import Featured from '../../components/Featured'
import ContactUs from '../../components/ContactUs'
import { AuthContext } from '../../context/AuthProvider'
import Loading from '../../components/Loading'

const Home = () => {
  const {user,loading} = use(AuthContext)
  if(loading) return <Loading></Loading>
  return (
    <div className='container mx-auto'>
        <Banner></Banner>
        <Featured></Featured>
        <ContactUs></ContactUs>
    </div>
  )
}

export default Home