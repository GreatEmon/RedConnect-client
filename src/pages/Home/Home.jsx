import React from 'react'
import Banner from '../../components/Banner'
import Featured from '../../components/Featured'
import ContactUs from '../../components/ContactUs'

const Home = () => {
  return (
    <div className='container mx-auto'>
        <Banner></Banner>
        <Featured></Featured>
        <ContactUs></ContactUs>
    </div>
  )
}

export default Home