import Link from 'next/link'
import React from 'react'

const Create = () => {
    return (
        <>
            <section className="login-section">
                <div className="parent">
                    <img src="\login-logo.svg" alt="img" className='img-fluid login-logo' />
                    <div className="main-card">
                        <div className="main-heading">
                            <h6>Create New Password</h6>
                            <p>Your new password must be different  from previously used passwords.</p>
                        </div>
                        <div className="option-field">
                            <label>New Password</label>
                            <input type="password" placeholder='New Password' />
                            <svg className='eye' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z" stroke="#745F8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.9998 21.2468C15.5298 21.2468 18.8198 19.1668 21.1098 15.5668C22.0098 14.1568 22.0098 11.7868 21.1098 10.3768C18.8198 6.77678 15.5298 4.69678 11.9998 4.69678C8.46984 4.69678 5.17984 6.77678 2.88984 10.3768C1.98984 11.7868 1.98984 14.1568 2.88984 15.5668C5.17984 19.1668 8.46984 21.2468 11.9998 21.2468Z" stroke="#745F8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="password-must">
                            <h5>Password Must:</h5>
                            <ul>
                                <li> Be at least 8 characters long</li>
                                <li>Have at least one uppercase</li>
                                <li>Contain at least one special character</li>
                            </ul>
                        </div>
                        <div className="option-field">
                            <label>Confirm New Password</label>
                            <input type="password" placeholder='Confirm New Password' />
                            <svg className='eye' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M15.5799 12.9765C15.5799 14.9565 13.9799 16.5565 11.9999 16.5565C10.0199 16.5565 8.41992 14.9565 8.41992 12.9765C8.41992 10.9965 10.0199 9.39648 11.9999 9.39648C13.9799 9.39648 15.5799 10.9965 15.5799 12.9765Z" stroke="#745F8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.9998 21.2468C15.5298 21.2468 18.8198 19.1668 21.1098 15.5668C22.0098 14.1568 22.0098 11.7868 21.1098 10.3768C18.8198 6.77678 15.5298 4.69678 11.9998 4.69678C8.46984 4.69678 5.17984 6.77678 2.88984 10.3768C1.98984 11.7868 1.98984 14.1568 2.88984 15.5668C5.17984 19.1668 8.46984 21.2468 11.9998 21.2468Z" stroke="#745F8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <Link href="/successpassword" className='btn-sign mb-0'>Confirm</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create
