'use client'

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

import dynamic from 'next/dynamic';
import Footer from './footer';

const StepLaunchpadInfo = dynamic(() => import('./launchpadinfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepTeamInfo = dynamic(() => import('./teaminfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepMintInfo = dynamic(() => import('./mintinfo'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepEarnings = dynamic(() => import('./earnings'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const StepSubmit = dynamic(() => import('./submit'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

// const StepItemsList = dynamic(() => import('./itemslist'), {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
// });





const Createlaunchpadcollection = () => {
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
                return <><StepLaunchpadInfo onNext={handleNextStep} /></>;
            case 2:
                return <><StepTeamInfo onNext={handleNextStep} /></>;
            case 3:
                return <><StepMintInfo onNext={handleNextStep} /></>;
            case 4:
                return <><StepEarnings onNext={handleNextStep} /></>;
            case 5:
                return <><StepSubmit onNext={handleNextStep} /></>;
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
                                    <li><a className={currentStep == 1 ? 'active listinner' : 'listinner'}>Launchpad Info {currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}
                                    </a></li>
                                    <li><a className={currentStep == 2 ? 'active listinner' : 'listinner'}>Team Info {currentStep === 3 || currentStep === 4 || currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 3 ? 'active listinner' : 'listinner'}>Mint info {currentStep === 4 || currentStep === 5  ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 4 ? 'active listinner' : 'listinner'}>Earnings {currentStep === 5 ? (
                                        <img src="\assets\tick-circle.svg" alt="img" className='ticker' />
                                    ) : null}</a></li>
                                    <li><a className={currentStep == 5 ? 'active listinner' : 'listinner'}>Submit</a></li>
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

export default Createlaunchpadcollection;

