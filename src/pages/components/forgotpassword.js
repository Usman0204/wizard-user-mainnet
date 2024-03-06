import Link from 'next/link'
import React from 'react'

const ForgotPassword = () => {
  return (
    <>
     <section className="login-section">
        <div className="parent">
            <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
            <div className="main-card">
                <div className="main-heading">
                    <h6>Forgot your Password?</h6>
                    <p>Enter your registered email to receive password reset instructions.</p>
                </div>
                <div className="option-field">
                    <label>Email</label>
                    <input type="text" placeholder='Your email...' />
                </div>
                <Link href="/createnewpassword" className='btn-sign mb-0'>Send</Link>
            </div>
        </div>
     </section>
    </>
  )
}

export default ForgotPassword
