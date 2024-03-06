'use client'

import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const Stepdetail = ({ onNext }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const items = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]
    const [selectedItem1, setSelectedItem1] = useState("");
    const items1 = ["Pfps", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports", "Games", "Art", "Virtual_worlds", "Music", "Photography", "Sports"]

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
                    <p className="stepheadparacollection">Step 3 of 5</p>
                    <h4 className="stepheadcollection">Listing details</h4>
                    <p className="collectionpara">Enter in the details on your collection that will be used for your marketplace page on magiceden.io</p>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Collection Description</p>
                        <input type="text" className="stepinput" placeholder='2000 unique NFTs governed by DAO' />
                    </div>
                    <div className="profileimgmain">
                        <h6 className="profilehead">Profile Image (500x500px)</h6>
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
                    <div className="derivativemain">
                        <h6 className="derivativehead">Derivative</h6>
                        <label class="switch">
                            <input type="checkbox" />
                            <div class="slidercheck"></div>
                            <div class="slider-card">
                                <div class="slider-card-face slider-card-front"></div>
                                <div class="slider-card-face slider-card-back"></div>
                            </div>
                        </label>
                        <p className="derivativepara">Is your artwork a derivative of other artwork on ANY blockchain?</p>
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">Link To The Original Artwork</p>
                        <input type="text" className="stepinput" placeholder='https://' />
                    </div>
                    <div className="stepinputmain">
                        <p className="stepinputpara">original name</p>
                        <input type="text" className="stepinput" placeholder='Collection name' />
                    </div>
                    <div className="categoriesmain">
                        <h6 className="categoryhead">Categories</h6>
                        <div className="categorydropdown">
                            <h6 className="categorydrophead">Primary Category</h6>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {selectedItem ? <h6>{selectedItem}</h6> : "-"}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <g clip-path="url(#clip0_212_9058)">
                                            <path d="M4.99997 7.85018C4.82075 7.85018 4.64155 7.78175 4.50492 7.64518L0.205141 3.34536C-0.0683805 3.07184 -0.0683805 2.62837 0.205141 2.35496C0.478553 2.08155 0.921933 2.08155 1.19548 2.35496L4.99997 6.15968L8.80449 2.35509C9.07801 2.08168 9.52135 2.08168 9.79474 2.35509C10.0684 2.6285 10.0684 3.07197 9.79474 3.3455L5.49503 7.64531C5.35832 7.78191 5.17913 7.85018 4.99997 7.85018Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_212_9058">
                                                <rect width="10" height="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {items.map((item, index) => (
                                        <a key={index} className="dropdown-item drop" onClick={() => setSelectedItem(item)}>
                                            {item}
                                        </a>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <p className="categorydroppara">Select the primary category that you would like for this collection to be listed under</p>
                        </div>
                        <div className="categorydropdown">
                            <h6 className="categorydrophead">secondary Category</h6>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {selectedItem1 ? <h6>{selectedItem1}</h6> : "-"}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <g clip-path="url(#clip0_212_9058)">
                                            <path d="M4.99997 7.85018C4.82075 7.85018 4.64155 7.78175 4.50492 7.64518L0.205141 3.34536C-0.0683805 3.07184 -0.0683805 2.62837 0.205141 2.35496C0.478553 2.08155 0.921933 2.08155 1.19548 2.35496L4.99997 6.15968L8.80449 2.35509C9.07801 2.08168 9.52135 2.08168 9.79474 2.35509C10.0684 2.6285 10.0684 3.07197 9.79474 3.3455L5.49503 7.64531C5.35832 7.78191 5.17913 7.85018 4.99997 7.85018Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_212_9058">
                                                <rect width="10" height="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {items1.map((item, index) => (
                                        <a key={index} className="dropdown-item drop" onClick={() => setSelectedItem1(item)}>
                                            {item}
                                        </a>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <p className="categorydroppara">Select the primary category that you would like for this collection to be listed under</p>
                        </div>
                    </div>
                    <div className="socialweblinks">
                        <h3 className="socialwebhead">Social & Web Links</h3>
                        <p className="socialwebpara">Input your social and website links for your collection. These links will be displayed on your collection page</p>
                        <p className="scoialweblowerpara">Please link your Twitter account</p>
                        <button className="uploadbtn">Link Twitter</button>
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Discord Invite Code (Optional)</p>
                            <p className="ligthsteppara">https://discord.gg/</p>
                            <input type="text" className="stepinput" placeholder='-' />
                        </div>
                        <div className="stepinputmain marginmain">
                            <p className="stepinputpara">Website Url (Optional)</p>
                            <input type="text" className="stepinput" placeholder='https://supercollection.io' />
                        </div>
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

export default Stepdetail