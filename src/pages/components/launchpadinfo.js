'use client'

import React, { useRef, useState } from 'react'

const Launchpadinfo = ({ onNext }) => {
   

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = () => {
        setImage(null);
    };

    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <h4 className="stepheadcollection">Launchpad Info</h4>
                    <p className="collectionpara">Tell us about the Launchpad.</p>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Launchpad Name</p>
                        <input type="text" className="stepinput" placeholder='Launchpad Name' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Launchpad Description</p>
                        <textarea type="text" className="stepinput" placeholder='Launchpad Description' />
                    </div>
                    <div className="profileimgmain">
                        <h6 className="profilehead">Launchpad Image (500x500px)</h6>
                        {image ? (
                            <div className="uploadimg">
                                <img src={image} alt="uploadedimg" className="uploadedimg" />
                            </div>
                        ) : (
                            null
                        )}
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        {/* Upload button */}
                        <button className="uploadbtn" onClick={handleButtonClick}>
                            Upload 
                        </button>
                        <p className="uploadpara">Max file size 5MB. This is the image that will show on your collection profile page</p>
                    </div>
                    <div className="editions-div">
                        <div className="inner-edition">
                            <h6>Limited edition</h6>
                            <p>A limited number of items</p>
                        </div>
                        <div className="inner-edition">
                            <h6>Open edition</h6>
                            <p>an unlimited number of items</p>
                        </div>
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Total Supply</p>
                        <input type="text" className="stepinput" placeholder='Total Supply' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Price</p>
                        <input type="text" className="stepinput" placeholder='Price' />
                    </div>
                    <button className="stepbtn" onClick={onNext}>
                        Save & Proced
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className='arrowbtn'>
                            <path d="M10.1194 12.5467C9.99276 12.5467 9.86609 12.5001 9.76609 12.4001C9.57276 12.2067 9.57276 11.8867 9.76609 11.6934L13.4594 8.00008L9.76609 4.30674C9.57276 4.11341 9.57276 3.79341 9.76609 3.60008C9.95943 3.40674 10.2794 3.40674 10.4728 3.60008L14.5194 7.64674C14.7128 7.84008 14.7128 8.16008 14.5194 8.35341L10.4728 12.4001C10.3728 12.5001 10.2461 12.5467 10.1194 12.5467Z" fill="white" />
                            <path d="M14.054 8.5H2.83398C2.56065 8.5 2.33398 8.27333 2.33398 8C2.33398 7.72667 2.56065 7.5 2.83398 7.5H14.054C14.3273 7.5 14.554 7.72667 14.554 8C14.554 8.27333 14.3273 8.5 14.054 8.5Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Launchpadinfo