// import React from 'react'
// import './About.css'
// import about from './about.jpg'

// function About() {
//     return (
//         <div className='about-box'>
//             <h2 className="about-title">About the Library</h2>
//             <div className="about-data">
//                 <div className="about-img">
//                 <img src={about} alt="" />
//                 </div>
//                 <div>
//                     <p className="about-text">
//                     Our department library is like a magical place filled with all sorts of interesting books and resources. It's right in the middle of our department and is like a secret hideaway for anyone who loves learning. Inside, you can find books on everything our department is all about, from the basics to the newest and coolest stuff.
//                     <br></br><br></br>
//                     What makes our library extra special is that it's made just for us it's like a personalized collection of knowledge tailor-made for our studies. The library is not just a quiet place to read; it's also a cool spot to meet up with friends for group projects or to join fun events like workshops and book clubs.
//                     <br></br>
//                     <br></br>Picture comfy corners where you can get lost in a good book, and modern study spots that make learning a breeze. Our department library isn't just a place to grab books; it's a hub of activity where we come together to explore, learn, and share ideas. It's like the heart of our academic journey, always ready to inspire and fuel our curiosity.<br/>
//                         <br/>
//                         Your suggestions for improvement are always welcome!
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default About


import React from 'react'
import './About.css'
import about from './about.jpg'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src={about} alt="about" />
                </div>
                <div>
                    <p className="about-text">
                    Our department library is like a magical place filled with all sorts of interesting books and resources. It's right in the middle of our department and is like a secret hideaway for anyone who loves learning. Inside, you can find books on everything our department is all about, from the basics to the newest and coolest stuff.
                    <br></br><br></br>
                    What makes our library extra special is that it's made just for us it's like a personalized collection of knowledge tailor-made for our studies. The library is not just a quiet place to read; it's also a cool spot to meet up with friends for group projects or to join fun events like workshops and book clubs.
                    <br></br>
                    <br></br>Picture comfy corners where you can get lost in a good book, and modern study spots that make learning a breeze. Our department library isn't just a place to grab books; it's a hub of activity where we come together to explore, learn, and share ideas. It's like the heart of our academic journey, always ready to inspire and fuel our curiosity.<br/>
                        <br/>
                        Your suggestions for improvement are always welcome!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
