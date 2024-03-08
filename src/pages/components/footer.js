import Link from 'next/link'
import React from 'react'

const Footer = () => {

  return (
    <>
      <section className="mainfooter">
        <div className="custom-container">
          <div className="footer">
            <div className="footerdetail">
              <Link href="/"><img src="\assets\footerassets\footerlogo.svg" alt="footerlogo" className="footerlogo" /></Link>
              <p className="rightreservepara">© 2024 Wizard NFT Marketplace. All Rights Reserved.</p>
            </div>
            <div className='parent-right'>
              <div className="footerlinks">
                <div className="footerlinksinner">
                  <h6 className="footerhead">Company</h6>
                  <Link href="/aboutus" className="footerpara">About Us</Link>
                </div>
                <div className="footerlinksinner">
                <h6 className="footerhead">Marketplace</h6>
                <Link href="/discovercollection" className="footerpara">Explore Collections</Link>
                <Link href="/launchpad" className="footerpara">Launchpad</Link>
                <a target='_blank' href="https://creatorwizard.vercel.app/" className="footerpara">Create Collection</a>
              </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">Resources</h6>
                  <Link href="/termsandcondition" className="footerpara">Terms of Service</Link>
                  <Link href="/privacypolicy" className="footerpara">Privacy Policy</Link>
                </div>
                <div className="footerlinksinner">
                  <h6 className="footerhead">follow</h6>
                  <a href='https://twitter.com/wizardgallery_' target='_blank' className="footerpara">Twitter</a>
                  <a href='https://t.me/+i7xcJ-EBosFjYjVk' target='_blank' className="footerpara">TG Announcement</a>
                  <a href='https://t.me/+76DP_bkMEUpjMzNk' target='_blank' className="footerpara">Telegram</a>
                  <a href='https://medium.com/@wizardgallery.xyz' target='_blank' className="footerpara">Medium</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
