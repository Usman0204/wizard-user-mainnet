import React from 'react'
import Newcollections from './newcollections'
import Navbar from './navbar'
import Footer from './footer'
import Liveauction from './liveauction'
import Auctionbid from './auctionbid'
import Topseller from './topseller'

const seeall = () => {
  return (
    <>
    <Navbar />
      <section className="seeall">
            <div className="bottom-parent">
                <Newcollections />
                <Liveauction />
                <Auctionbid />
                <Topseller />
            </div>
            <div className="bottom-btn-seemore">
                <a href="#">See more</a>
            </div>
      </section>
      <Footer />
    </>
  )
}

export default seeall
