import React from 'react'
import './PhotoGallery.css'

import gallery3 from './gallery3.JPG'
import gallery4 from './gallery4.jpg'
import gallery5 from './gallery5.jpg'

import gallery6 from './gallery6.JPG'
import gallery7 from './gallery7.jpg'
import gallery8 from './gallery8.jpg'
import gallery9 from './gallery9.jpg'
import gallery10 from './gallery10.jpeg.jpg'


function PhotoGallery() {
    return (
        <div className='photogallery-container'>
            <h1 className='photogallery-title'>Photo Gallery</h1>
            <div className="photogallery-images">
             
                <img src={gallery3} alt=''/>
               
                <img src={gallery6} alt=''/>
                <img src={gallery9} alt=''/>
                <img src={gallery10} alt=''/>
                <img src={gallery7} alt=''/>
                <img src={gallery8}alt=''/>
                <img src={gallery4} alt=''/>
                <img src={gallery5} alt=''/>
                
            </div>
            <button>VIEW MORE</button>
        </div>
    )
}

export default PhotoGallery