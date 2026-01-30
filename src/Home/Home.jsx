import React from 'react'
import Hero from './Hero/Hero'
import Services from './Services/Services'
import Books from './BooksSlider/Books'
import Footer from './Footer/Footer'

function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Books />
      <Footer />
    </div>
  )
}

export default Home