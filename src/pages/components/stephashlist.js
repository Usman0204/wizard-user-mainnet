'use client'

import React, { useState } from 'react'

const Stephashlist = ({ onNext }) => {
    const [toggle, setToggle] = useState(true);
    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerhashlist">
                    <p className="stepheadparacollection">Step 4 of 5</p>
                    <h4 className="stepheadcollection">NFT Hash List</h4>
                    <p className="collectionpara">Please upload your mint hash list for your NFTs. To see how to retrieve your hash list, Read this guide.</p>
                    <div className="derivativemain">
                        <p className="derivativepara newmargin">Have you already minted?</p>
                        <label class="switch">
                            <input type="checkbox" />
                            <div class="slidercheck"></div>
                            <div class="slider-card">
                                <div class="slider-card-face slider-card-front"></div>
                                <div class="slider-card-face slider-card-back"></div>
                            </div>
                        </label>

                    </div>
                    <div className="stepinputmain maxwidthhundred">
                        <p className="stepinputpara">Date when your mint started (UTC)</p>
                        <input type="text" className="stepinput" placeholder='' />
                    </div>
                    <div className="stepinputmain maxwidthhundred">
                        <p className="stepinputpara">Total supply</p>
                        <input type="text" className="stepinput" placeholder='' />
                        <p className="newstepinputpara">Number of total items in the collection existing or expected</p>
                    </div>
                    <div className="haslistmain">
                        {
                            toggle ?
                                <>
                                    <div className="hashlistupper">
                                        <p className="hashespara">Hashes <span className="white">0</span> / Total Supply <span className="white">10000</span></p>
                                        <button onClick={() => setToggle(false)} className="findbtn">Find hash list using creator Address</button>
                                    </div>

                                    <div className="hashinnermain">
                                        <p className="hashpara">
                                            [ <br />
                                            “hash 1”, <br />
                                            “hash 2” <br />
                                            ... <br />
                                            ]
                                        </p>
                                    </div>
                                </>
                                :
                                <div className="importmainhash">
                                    <h6 className="importhashhead">Import from Verified creator address - <span className="blue">see this guide</span></h6>
                                    <div className="hashinput">
                                        <input type="text" placeholder='https://supercollection.io' className='hashinputinner' />
                                        <button className="fetchbtn">Fetch</button>
                                    </div>
                                    <div className="mintmain">
                                        <p className="mintpara">No mints</p>
                                    </div>
                                    <div className="lastbtns">
                                        <p onClick={() => setToggle(true)} className="cancelpara">Cancel</p>
                                        <button className="bluebtn">Create new hash list based on this list</button>
                                        <button className="bluebtn">Add to existing list</button>
                                    </div>
                                </div>
                        }

                    </div>
                    <button className="stepbtn" onClick={onNext}>
                        Review
                    </button>
                </div>
            </section>
        </>
    )
}

export default Stephashlist