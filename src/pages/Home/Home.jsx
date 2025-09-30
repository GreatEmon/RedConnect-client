import React, { use, useEffect } from 'react'
import Banner from '../../components/Banner'
import Featured from '../../components/Featured'
import ContactUs from '../../components/ContactUs'
import { AuthContext } from '../../context/AuthProvider'
import Loading from '../../components/Loading'


const Home = () => {
  const { user, loading } = use(AuthContext)

  if (loading) return <Loading></Loading>
  return (
    <div className='container mx-auto'>
      <div data-aos="fade-up">
        <Banner ></Banner>
      </div>
      <div data-aos="zoom-in">
        <Featured data-aos="fade-up"></Featured>
      </div>
      <div data-aos="fade-down">
        <ContactUs data-aos="fade-up"></ContactUs>
      </div>
    </div>
  )
}

export default Home