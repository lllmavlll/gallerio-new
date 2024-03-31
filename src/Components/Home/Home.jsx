import React from 'react'
import Header from './HomeComponents/Header';
import Footer from './HomeComponents/Footer';
import Body from './HomeComponents/Body';

const Home = () => {

  return (
    <div className='max-w-4xl mx-auto'>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default Home