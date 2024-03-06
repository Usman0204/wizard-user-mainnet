'use client'

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

import dynamic from 'next/dynamic';
import Footer from './footer';

const Stepintroduction = dynamic(() => import('./stepintroduction'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Stepcollection = dynamic(() => import('./stepcollection'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Stepdetail = dynamic(() => import('./stepdetail'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Stephashlist = dynamic(() => import('./stephashlist'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Stepwhitelist = dynamic(() => import('./stepwhitelist'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const Stepsubmit = dynamic(() => import('./stepsubmit'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});



const CreateNewCollections = () => {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => {
            // Save the current step to localStorage whenever it changes
            if (isLocalStorageAvailable) {
                localStorage.setItem('currentStep', (prevStep + 1).toString());
            }
            return prevStep + 1;
        });
    };

    useEffect(() => {
        // Save the initial step to localStorage when the component mounts
        if (isLocalStorageAvailable) {
            const storedStep = localStorage.getItem('currentStep');

            if (!storedStep) {
                localStorage.setItem('currentStep', currentStep.toString());
            } else {
                setCurrentStep(parseInt(storedStep));
            }
        }
    }, [currentStep, isLocalStorageAvailable]);


    const renderContent = () => {
        switch (currentStep) {
            case 1:
                return <><Stepintroduction onNext={handleNextStep} /></>;
            case 2:
                return <><Stepcollection onNext={handleNextStep} /></>;
            case 3:
                return <><Stepdetail onNext={handleNextStep} /></>;
            case 4:
                return <><Stephashlist onNext={handleNextStep} /></>;
            case 5:
                return <><Stepwhitelist onNext={handleNextStep} /></>;
            case 6:
                return <><Stepsubmit /></>;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <section className='createnew'>
                <span className="bottomshade"></span>
                <div className="custom-container">
                    <div className='createparent'>
                        <div className='left'>
                            <h2>Apply for listing</h2>
                            <div className='leftcard'>
                                <ul>
                                    <li><a className={currentStep == 1 ? 'active listinner' : 'listinner'}>Introduction {currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5 || currentStep === 6 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}
                                    </a></li>
                                    <li><a className={currentStep == 2 ? 'active listinner' : 'listinner'}>Collection {currentStep === 3 || currentStep === 4 || currentStep === 5 || currentStep === 6 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 3 ? 'active listinner' : 'listinner'}>Details {currentStep === 4 || currentStep === 5 || currentStep === 6 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 4 ? 'active listinner' : 'listinner'}>Hash list {currentStep === 5 || currentStep === 6 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 5 ? 'active listinner' : 'listinner'}>Whitelist {currentStep === 6 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 6 ? 'active listinner' : 'listinner'}>Submit</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='content'>{renderContent()}</div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CreateNewCollections;
