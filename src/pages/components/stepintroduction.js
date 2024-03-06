'use client'
import React, { useState } from 'react'

const Stepintroduction = ({ onNext }) => {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleInnerSelectionClick = (index) => {
        setSelectedIdx(index);
    };

    const [selectedIdx1, setSelectedIdx1] = useState(0);

    const handleInnerSelectionClick1 = (index) => {
        setSelectedIdx1(index);
    };
    return (
        <>
            <section className='stepmain'>
                <div className="stepcontainer">
                    <p className="stepheadpara">Step 1 of 5</p>
                    <h4 className="stephead">Let&apos;s list your collection!</h4>
                    <p className="inputpara">Which blockchain is your collection on?</p>
                    <div className="mainselection">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className="innerselction"
                                onClick={() => handleInnerSelectionClick(index)}
                            >
                                <p className="innerselectiontext">
                                    {index === selectedIdx ? '' : ''}
                                    {/* Display the text for each inner selection */}
                                    {index === 0 && 'Ethereum'}
                                    {index === 1 && 'Solana'}
                                    {index === 2 && 'Bitcoin'}
                                </p>
                                {index === selectedIdx && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99935 18.9587C5.05768 18.9587 1.04102 14.942 1.04102 10.0003C1.04102 5.05866 5.05768 1.04199 9.99935 1.04199C14.941 1.04199 18.9577 5.05866 18.9577 10.0003C18.9577 14.942 14.941 18.9587 9.99935 18.9587ZM9.99935 2.29199C5.74935 2.29199 2.29102 5.75033 2.29102 10.0003C2.29102 14.2503 5.74935 17.7087 9.99935 17.7087C14.2493 17.7087 17.7077 14.2503 17.7077 10.0003C17.7077 5.75033 14.2493 2.29199 9.99935 2.29199Z" fill="#862FC0" />
                                        <path d="M8.81719 12.9837C8.65052 12.9837 8.49219 12.917 8.37552 12.8003L6.01719 10.442C5.77552 10.2003 5.77552 9.80033 6.01719 9.55866C6.25885 9.31699 6.65885 9.31699 6.90052 9.55866L8.81719 11.4753L13.1005 7.19199C13.3422 6.95033 13.7422 6.95033 13.9839 7.19199C14.2255 7.43366 14.2255 7.83366 13.9839 8.07533L9.25885 12.8003C9.14219 12.917 8.98385 12.9837 8.81719 12.9837Z" fill="white" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="inputpara">Is the artwork in your collection, profile picture, and banner either your original artwork or artwork you have legal permission to use, distribute, and sell?</p>
                    <div className="mainselection">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className="innerselction"
                                onClick={() => handleInnerSelectionClick1(index)}
                            >
                                <p className="innerselectiontext">
                                    {index === selectedIdx1 ? '' : ''}
                                    {/* Display the text for each inner selection */}
                                    {index === 0 && 'Yes, I am the author'}
                                    {index === 1 && 'Yes, I am the author'}
                                    {index === 2 && 'No'}
                                </p>
                                {index === selectedIdx1 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99935 18.9587C5.05768 18.9587 1.04102 14.942 1.04102 10.0003C1.04102 5.05866 5.05768 1.04199 9.99935 1.04199C14.941 1.04199 18.9577 5.05866 18.9577 10.0003C18.9577 14.942 14.941 18.9587 9.99935 18.9587ZM9.99935 2.29199C5.74935 2.29199 2.29102 5.75033 2.29102 10.0003C2.29102 14.2503 5.74935 17.7087 9.99935 17.7087C14.2493 17.7087 17.7077 14.2503 17.7077 10.0003C17.7077 5.75033 14.2493 2.29199 9.99935 2.29199Z" fill="#862FC0" />
                                        <path d="M8.81719 12.9837C8.65052 12.9837 8.49219 12.917 8.37552 12.8003L6.01719 10.442C5.77552 10.2003 5.77552 9.80033 6.01719 9.55866C6.25885 9.31699 6.65885 9.31699 6.90052 9.55866L8.81719 11.4753L13.1005 7.19199C13.3422 6.95033 13.7422 6.95033 13.9839 7.19199C14.2255 7.43366 14.2255 7.83366 13.9839 8.07533L9.25885 12.8003C9.14219 12.917 8.98385 12.9837 8.81719 12.9837Z" fill="white" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="inputpara">Does your collection adopt the Metaplex Certified Collections standard?</p>
                    <label class="switch">
                        <input type="checkbox" />
                        <div class="slidercheck"></div>
                        <div class="slider-card">
                            <div class="slider-card-face slider-card-front"></div>
                            <div class="slider-card-face slider-card-back"></div>
                        </div>
                    </label>
                    <button className="stepbtn" onClick={onNext}>
                        Lets Go
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

export default Stepintroduction