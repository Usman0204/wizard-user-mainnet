import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <>
     <section className="login-section">
        <div className="parent">
            <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
            <div className="main-card">
                <div className="main-heading">
                    <h6>Sign In</h6>
                    <p>Enter your credentials to access your account</p>
                </div>
                <div className="option-field">
                    <label>Email</label>
                    <input type="text" placeholder='Your email...' />
                </div>
                <div className="option-field">
                    <label>Password</label>
                    <input type="text" placeholder='Your password...' />
                </div>
                <a href="#" className='btn-remember'>Remember me</a>
                <Link href="/" className='btn-sign'>Sign In</Link>
                <Link href="/forgotpassword" className='btn-forgot'>Forgot Password?</Link>
            </div>
        </div>
     </section>
    </>
  )
}

export default Login
