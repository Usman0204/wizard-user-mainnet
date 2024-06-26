import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Countdown from 'react-countdown';
import Link from 'next/link';

const Launchpadcards = ({ Listeddata, data }) => {
    // console.log("listed Data ====", Listeddata)

    const GetTime = (time) => {
        let endtime = new Date(time)
        return endtime;
    }

    let stagePrice = function (mintStages, mintStartTime) {
        const now = new Date();
        const liveStage = mintStages?.find((stage, index) => {

            const stageStartTime = index === 0 ? new Date(mintStartTime) : new Date(mintStages[index - 1].mintStageTime);
            const stageEndTime = index === mintStages.length - 1 ? new Date(mintStages[index].mintStageTime) : new Date(mintStages[index].mintStageTime);
            return now >= stageStartTime && now < stageEndTime;
        });
        let _id = mintStages?.indexOf(liveStage)
        // console.log(_id);
        if (liveStage) {
            return liveStage.price
        } else {
            return mintStages?.[0]?.price || 0
        }
    }

    return (
        <section className="launchpad-cards">
            <div className="parent-cards">
                {Listeddata?.map((card, index) => {
                    let mintStage = card?.mintStages
                    let mintStartTime = card?.mintStartTime
                    return (
                        card?.minted === card?.itemsCreated ||
                        <Link key={index} href={'/launchpaddetailpage?id=' + card?._id}>
                            <div className="single-card" >
                                <div className="main-img">
                                    <img src={card.imageUrl} alt="img" className="img-fluid" />
                                </div>
                                <div className="bottom-content">
                                    <h6 className="main-title">{card.name}</h6>
                                    <div className="twice-text">
                                        <div className="text">
                                            <p>PRICE</p>
                                            <h6>
                                                    {stagePrice(mintStage, mintStartTime)}
                                                {/* <span>{card.currency}</span> */}
                                            </h6>
                                        </div>
                                        <div className="text">
                                            <p>Items</p>
                                            <h6>{card.itemsCreated}</h6>
                                        </div>
                                        <div className="text">
                                            <p>MINTED</p>
                                            <h6>{card.minted}</h6>
                                        </div>
                                    </div>
                                    {data === 'live' ?
                                        <div className="timer-div">
                                            <p className="live">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                    <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                </svg>
                                                Live
                                            </p>
                                            <h6>
                                                <span>Ends In :</span> <Countdown date={GetTime(card?.mintEndTime)} />
                                            </h6>
                                        </div>
                                        : data === 'upcoming' ?
                                            <div className="timer-div">
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Upcoming
                                                </p>
                                                <h6>
                                                    <span>Start In :</span> <Countdown date={GetTime(card?.mintStartTime)} />
                                                </h6>
                                            </div>
                                            :
                                            <div className="timer-div">
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Past
                                                </p>
                                                <h6>
                                                    <span>Ended :</span> <Countdown date={GetTime(card?.mintEndTime)} />
                                                </h6>
                                            </div>
                                    }

                                </div>
                                {/* {Listeddata !== "upcoming" && Listeddata !== "past" && (
                                <a href="#" className='btn-mint'>Mint</a>
                            )} */}
                                {/* <a href="#" className='btn-mint'>Mint</a> */}
                            </div>
                        </Link>
                    )

                })}
                {Listeddata?.map((card, index) => {
                    let mintStage = card?.mintStages
                    let mintStartTime = card?.mintStartTime
                    return (
                        card?.minted === card?.itemsCreated &&
                        <Link key={index} href={'/launchpaddetailpage?id=' + card?._id}>
                            <div className="single-card" >
                                <div className="main-img">
                                    <img src={card.imageUrl} alt="img" className="img-fluid" />
                                </div>
                                <div className="bottom-content">
                                    {console.log(card)}
                                    <h6 className="main-title">{card.name}</h6>
                                    <div className="twice-text">
                                        <div className="text">
                                            <p>PRICE</p>
                                            <h6>
                                                {stagePrice(mintStage, mintStartTime)}
                                                {/* <span>{card.currency}</span> */}
                                            </h6>
                                        </div>
                                        <div className="text">
                                            <p>Items</p>
                                            <h6>{card.itemsCreated}</h6>
                                        </div>
                                        <div className="text">
                                            <p>MINTED</p>
                                            <h6>{card.minted}</h6>
                                        </div>
                                    </div>
                                    {data === 'live' ?
                                        <div className="timer-div">
                                            {/* <p className="live">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                    <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                </svg>
                                                Live
                                            </p> */}
                                            <h6>
                                                <span>SOLD OUT</span> 
                                            </h6>
                                        </div>
                                        : data === 'upcoming' ?
                                            <div className="timer-div">
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Upcoming
                                                </p>
                                                <h6>
                                                    <span>Start In :</span> <Countdown date={GetTime(card?.mintStartTime)} />
                                                </h6>
                                            </div>
                                            :
                                            <div className="timer-div">
                                                <p className="live">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                        <circle cx="5" cy="5.5" r="5" fill="#04C182" />
                                                    </svg>
                                                    Past
                                                </p>
                                                <h6>
                                                    <span>Ended :</span> <Countdown date={GetTime(card?.mintEndTime)} />
                                                </h6>
                                            </div>
                                    }

                                </div>
                                {/* {Listeddata !== "upcoming" && Listeddata !== "past" && (
                                <a href="#" className='btn-mint'>Mint</a>
                            )} */}
                                {/* <a href="#" className='btn-mint'>Mint</a> */}
                            </div>
                        </Link>
                    )

                })}
            </div>
        </section>
    );
};

export default Launchpadcards;
