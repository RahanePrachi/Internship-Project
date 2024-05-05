import React from 'react'

import About from '../Components/about'
import Footer from '../Components/Footer'


import PhotoGallery from '../Components/PhotoGallery'
import PopularBooks from '../Components/PopularBooks'
import RecentAddedBooks from '../Components/RecentAddedBooks'

import WelcomeBox from '../Components/WelcomeBox'
import Carousel from '../Components/Carousel';
import slider2 from "./slider2.jpg";
import slider3 from "./slider3.jpg";
import slider4 from "./slider4.jpg";
const slides= [
    {
      "src":`${slider2}` ,
      "alt": "Image 1 for carousel"
    },
    {
      "src": `${slider3}`,
      "alt": "Image 2 for carousel"
    },
    {
      "src":` ${slider4}`,
      "alt": "Image 3 for carousel"
    }
  ];
function Home() {

    return (
        <div id='home'>
            {/* <ImageSlider/> */}
            <Carousel data={slides} />
            <WelcomeBox/>
            <About/>
            <PopularBooks/>
            <RecentAddedBooks/>
            <PhotoGallery/>
            <Footer/>
        </div>
    )
}

export default Home;