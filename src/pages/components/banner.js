import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <>
      <section className="main-banner">
      <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
        <div className="custom-container">
          <div className="row">
            <div className="col-xl-7 col-12 m-auto padd-sm">
              <div className="main-content">
                <h4>Buy, Own & Sell NFTs <span>In The Wizard Gallery</span>Marketplace</h4>
                {/* <p>Wizard Gallery is the first NFT marketplace built for the Core ecosystem.</p> */}
                <p>Wizard Gallery is a marketplace built on and for the Core ecosystem</p>
                <div className="twice-btns">
                  <Link href="/discovercollection" className='btn-explore'>Explore</Link>
                  <a href="https://creator.wizardgallery.xyz/" target='_blank' className='btn-learn'>Apply For LaunchPad</a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-12 m-auto padd-sm displaynoneinmobile">
              <div className="wrapper-img">
                <img src="\assets\landing\static\banner-img1.png" alt="img" className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner
