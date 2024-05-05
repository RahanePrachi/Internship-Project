import React from 'react'
import './Stats.css'


function Stats() {
    return (
        <div className='stats'>
            <div className='stats-block'>
                
                <p className='stats-title'>Total Books</p>
                <p className='stats-count'>3254</p>
            </div>
            <div className='stats-block'>
                
                <p className='stats-title'>Total Members</p>
                <p className='stats-count'>254</p>
            </div>
            <div className='stats-block'>
                
                <p className='stats-title'>Reservations</p>
                <p className='stats-count'>54</p>
            </div>
        </div>
    )
}

export default Stats