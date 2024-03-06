'use client'

import React, { useRef, useState } from 'react'

const Teaminfo = ({ onNext }) => {

    const [teamMembers, setTeamMembers] = useState([]);
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

    const handleAddTeamMember = () => {
        setTeamMembers([...teamMembers, {}]);
    };

    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainerdetail">
                    <h4 className="stepheadcollection">Team Info</h4>
                    <p className="collectionpara">Tell us about the Launchpad.</p>
                    <div className="addteammembers">
                        <a onClick={handleAddTeamMember}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M13.5 9.5625H4.5C4.1925 9.5625 3.9375 9.3075 3.9375 9C3.9375 8.6925 4.1925 8.4375 4.5 8.4375H13.5C13.8075 8.4375 14.0625 8.6925 14.0625 9C14.0625 9.3075 13.8075 9.5625 13.5 9.5625Z" fill="#862FC0" />
                            <path d="M9 14.0625C8.6925 14.0625 8.4375 13.8075 8.4375 13.5V4.5C8.4375 4.1925 8.6925 3.9375 9 3.9375C9.3075 3.9375 9.5625 4.1925 9.5625 4.5V13.5C9.5625 13.8075 9.3075 14.0625 9 14.0625Z" fill="#862FC0" />
                        </svg> Add a Team Members</a>
                    </div>
                    <div className="team-members">
                        <div className="profileimgmain">
                            <h6 className="profilehead">Team Member Image (500x500px)</h6>
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
                            <p className="uploadpara">Max file size 5MB.</p>
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Name</p>
                            <input type="text" className="stepinput" placeholder='Team Member Name' />
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Designation</p>
                            <input type="text" className="stepinput" placeholder='Team Member Designation' />
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Twitter</p>
                            <input type="text" className="stepinput" placeholder='Team Member Twitter' />
                        </div>
                    </div>
                    {teamMembers.map((index) => (
                    <div key={index} className="team-members">
                        <div className="profileimgmain">
                            <h6 className="profilehead">Team Member Image (500x500px)</h6>
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
                            <p className="uploadpara">Max file size 5MB.</p>
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Name</p>
                            <input type="text" className="stepinput" placeholder='Team Member Name' />
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Designation</p>
                            <input type="text" className="stepinput" placeholder='Team Member Designation' />
                        </div>
                        <div className="stepinputmain">
                            <p className="stepinputpara">Team Member Twitter</p>
                            <input type="text" className="stepinput" placeholder='Team Member Twitter' />
                        </div>
                    </div>
                     ))}
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

export default Teaminfo