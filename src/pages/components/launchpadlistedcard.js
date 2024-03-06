import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Launchpadlistedcard = () => {
    const launchpadData = [
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/1.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/2.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/3.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/4.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/5.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },
        {
            title: 'GREENCY-NEKO',
            image: '/assets/dummy-imgs/allcards/6.png',
            price: 584.85,
            currency: 'Core',
            items: 7777,
            minted: 6789,
        },

    ];

    return (
        <section className="launchpad-cards launchpadlisted-cards">
            <div className="parent-cards">
                {launchpadData.map((card, index) => (
                    <div className="single-card" key={index}>
                        <div className="main-img">
                            <img src={card.image} alt="img" className="img-fluid" />
                        </div>
                        <div className="bottom-content">
                            <h6 className="main-title">{card.title}</h6>
                            <div className="progress-div">
                                <div className="upper-text">
                                    <h6>Total Minted</h6>
                                    <p>0% <span>(0000/5555)</span></p>
                                </div>
                                <ProgressBar now={60} />
                            </div>
                            <div className="fundraise-text">
                                <h6>Total Funds Raised</h6>
                                <p>0 Core</p>
                            </div>
                            <div className="timer-div">
                                <p className="live">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                    </svg>
                                    Live
                                </p>
                                <h6>
                                    <span>Ends :</span> 08 25m 13s
                                </h6>
                            </div>
                        </div>
                        <a href="#" className='btn-mint'>Claim funds & Launch</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Launchpadlistedcard;
