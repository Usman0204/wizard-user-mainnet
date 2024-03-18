import React, { useEffect, useState } from 'react'
import Newcollections from './newcollections'
import Navbar from './navbar'
import Footer from './footer'
import Liveauction from './liveauction'
import Auctionbid from './auctionbid'
import Topseller from './topseller'

const seeall = () => {
  const [tab, setTab]=useState('')
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    console.log(id);
    setTab(id)
  }, [])
  
  return (
    <>
    <Navbar />
      <section className="seeall">
            <div className="bottom-parent">
          {/* {tab === 'newCollection' &&   <Newcollections />} */}
          {tab === 'buynow' &&  <Liveauction tab={tab}/>}
          {tab === 'liveauction' && <Auctionbid tab={tab} />}
          {tab === 'topseller' && <Topseller tab={tab} />}
            </div>
            {/* <div className="bottom-btn-seemore">
                <a href="#">See more</a>
            </div> */}
      </section>
      <Footer />
    </>
  )
}

export default seeall
