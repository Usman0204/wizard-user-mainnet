import React from 'react'

const maintenance = () => {
    return (
        <>
            <div className="maintenace-section">
                <img src="\miantenance-bg.png" alt="img" className='img-fluid miantenance-bg' />
                <div className="main-content">
                    <img src="\login-logo.svg" alt="img" className='img-fluid main-logo' />
                    <img src="\undermaintenance.png" alt="img" className='img-fluid undermaintenance w-100' />
                    <div className="inside-text">
                        <h5>Site under maintenance</h5>
                        <h6>Hi Wizards! We are in maintenance mode, making sure your experience on Wizard Gallery is unmatched!</h6>
                        <p>We will let you know as soon as we are back. </p>
                        <div className="follow-div">
                            Follow us on X for more updates: <a href="https://twitter.com/wizardgallery_" target='_blank'><img src="\twitter-icon.svg" alt="img" className='img-fluid' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default maintenance
