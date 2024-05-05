// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Carousel = ({ slides, autoplayDelay = 3000 }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Increment current slide index
//       setCurrentSlide((prevSlide) =>
//         prevSlide === slides.length - 1 ? 0 : prevSlide + 1
//       );
//     }, autoplayDelay);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [currentSlide, slides.length, autoplayDelay]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: false, // Autoplay handled by useEffect
//     autoplaySpeed: autoplayDelay,
//     beforeChange: (oldIndex, newIndex) => {
//       setCurrentSlide(newIndex);
//     },
//   };

//   return (
//     <div className="w-full relative h-[300px]">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index}>
//             <img src={slide.imageUrl} alt={`Slide ${index}`} className="w-full  object-contain" />
//           </div>
//         ))}
//       </Slider>
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`h-2 w-2 rounded-full mx-2 cursor-pointer ${
//               index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./Carousel.css";

 const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;