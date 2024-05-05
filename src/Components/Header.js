import { React, useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'


function Header() {

    const [menutoggle, setMenutoggle] = useState(false)

   

    const closeMenu = () => {
        setMenutoggle(false)
    }

    return (
        <div className="header">
            <div className="logo-nav">
            <Link to='/'>
                <a href="#home">LIBRARY</a>
            </Link>
           
            </div>
            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Search Here'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={() => { closeMenu() }}>
                    <Link to='/'>
                            <a href="#home">Home</a>
                        </Link>
                       
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                    <Link to='/books'>
                        <a href="#books">Books</a>
                        </Link>
                        
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                    <Link to='/signin'>
                        <a href='signin'>SignIn</a>
                        </Link>
                       
                    </li>
                </ul>
            </div>

           
        </div>
    )
}

export default Header
