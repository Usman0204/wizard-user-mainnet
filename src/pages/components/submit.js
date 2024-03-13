'use client'

import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const Submit = () => {

    return (
        <>
            <section className='stepmain'>
                <div style={{ width: "100%" }}>
                    <h4 className="stepheadcollection">Submit</h4>
                    <p className="collectionpara">Review your details and submit</p>
                    <div className="submit-section">
                        <div className="main-heading-top">
                            <h6>Launchpad Info</h6>
                        </div>
                        <div className="profile-conent">
                            <label>Launchpad Image</label>
                            <div className="profile-img">
                                <img src="\assets\dummy-imgs\collection\cover-img-collection.png" alt="img" className='img-fluid' />
                            </div>
                        </div>
                        <div className="basic-data">
                            <div className="twice-field-text">
                                <div className="single-text">
                                    <p>Launchpad Name</p>
                                    <h6>Spiritual but not religious</h6>
                                </div>
                                <div className="single-text">
                                    <p>Launchpad</p>
                                    <h6>Limited edition</h6>
                                </div>
                            </div>
                            <div className="single-text">
                                <p>Launchpad Description</p>
                                <h6>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</h6>
                            </div>
                            <div className="twice-field-text">
                                <div className="single-text">
                                    <p>Total Supply</p>
                                    <h6>4,444</h6>
                                </div>
                                <div className="single-text">
                                    <p>Price</p>
                                    <h6>Games</h6>
                                </div>
                            </div>
                        </div>
                        <div className="team-info">
                            <h5>Team Info</h5>
                            <div className="parent parent-mobile">
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Team Member 1</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>John Doe</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Designation</p>
                                            <h6>Designer</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Twitter</p>
                                            <h6>http://me.xn--c6h</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Team Member 2</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>John Doe</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Designation</p>
                                            <h6>Designer</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Twitter</p>
                                            <h6>http://me.xn--c6h</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-info mint-info">
                            <h5>Mint info</h5>
                            <div className="single-text">
                                <p>Mint Start Date</p>
                                <h6>01/02/2024 2:44 PM</h6>
                            </div>
                        </div>
                        <div className="team-info mint-info">
                            <div className="parent parent-mobile">
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Mint Stage 1</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>Presale 1</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Duration</p>
                                            <h6>1d 2h 23m</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Sale Price</p>
                                            <h6>15.258 Core</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="left-side">
                                    <div className="main-heading">
                                        <h6>Mint Stage 2</h6>
                                    </div>
                                    <div className="parent">
                                        <div className="single-text">
                                            <p>Name</p>
                                            <h6>Presale 1</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Duration</p>
                                            <h6>1d 2h 23m</h6>
                                        </div>
                                        <div className="single-text">
                                            <p>Sale Price</p>
                                            <h6>15.258 Core</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-info earnings">
                            <h5>Earnings</h5>
                           <div className="parent parent-mobile">
                           <div className="left-side">
                                <div className="parent">
                                    <div className="single-text">
                                        <p>earnings address</p>
                                        <h6>0xab6fd6074782c805933...</h6>
                                    </div>
                                    <div className="single-text">
                                        <p>Platform Fees</p>
                                        <h6>90%</h6>
                                    </div>
                                    <div className="single-text">
                                        <p>Your Earning</p>
                                        <h6>10%</h6>
                                    </div>
                                </div>
                            </div>
                           </div>
                        </div>
                    </div>
                    <button className="stepbtn">
                        Submit
                    </button>
                </div>
            </section>
        </>
    )
}

export default Submit