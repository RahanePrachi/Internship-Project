import React from 'react'
import './Footer.css'



function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Contact Us</h1>
                        <p>Librarian</p>
                        <p>Information Technology</p>
                        <p>AVCOE</p>
                        
                        <p>Sangamner 422608</p>
                        <p>Maharashtra</p>
                        <p>India</p>
                        <p><b>Email:</b>avcoe@gmail.com</p>
                    </div>
                    <div className='usefull-links'>
                        <h1>Usefull Links</h1>
                        <a href='https://avcoe.org/it.php'>Department</a>
                        <a href='https://ieeexplore.ieee.org/Xplore/home.jsp'>ieeexplore</a>
                        <a href='https://www.delnet.in/'>DELNET</a>
                        <a href='https://ebookcentral.proquest.com/lib/amrutvcoll/home.action'>EBooks</a>
                    </div>
                    <div className='librarian-details'>
                        <h1>Librarian</h1>
                        <p>Name</p>
                        <p>Education</p>
                        <p>Contact: +91 9123456787</p>
                    </div>
                </div>
                
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2024 copyright all right reserved<br /><span>Designed by TechStars❤️ </span></p>
            </div>
        </div>
    )
}

export default Footer