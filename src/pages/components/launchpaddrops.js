import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Environment from '@/utils/Enviroment';
// import { ToastContainer, toast } from 'react-toastify';

var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Link from 'next/link';
import axios from 'axios';
import CountdownTimer from './auctiontimer';
// import OwlCarousel from 'react-owl-carousel';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Launchpaddrops = () => {
    const api_url = Environment.api_url
    const [mainCardData, setMainCardData] = useState([]);
    // const [time, setTime] = useState({ name: 'Live', value: 'live' })
    const [accessToken, setAccessToken] = useState("");
    const owl_option = {
        nav: true,
        dots: false,
        dotsEach: false,
        loop: false,
        autoplay: false,
        autoplayTimeout: 2000,
        navText: [
            "<img src='/assets/landing/static/carousel-arrow-back.svg' alt='img' />",
            "<img src='/assets/landing/static/carousel-arrow-next.svg' alt='img' />",
        ],
        responsive: {
            0: {
                items: 1.3,
                loop: true,
                margin: 10,
                autoplay: true,
            },
            361: {
                items: 1.3,
                loop: true,
                margin: 10,
                autoplay: true,
            },
            600: {
                items: 1.3,
                loop: true,
                margin: 10,
                autoplay: true,
            },
            700: {
                items: 3,
                margin: 10,
            },
            1000: {
                items: 4,
                margin: 10,
            },
            1200: {
                items: 4,
                margin: 10,
            },
            1900: {
                items: 6,
                margin: 10,
            },
            2000: {
                items: 7,
                margin: 10,
            },
            2250: {
                items: 8,
                margin: 10,
            },
        },
    };


    // useEffect(() => {
    //     const storedData = localStorage.getItem('mainCardData');

    //     if (storedData) {
    //         setMainCardData(JSON.parse(storedData));
    //     } else {
    //         getLaunchPadDrops();
    //     }
    // }, []);

    const getLaunchPadDrops = async () => {
        try {
            const response = await axios.get(`${api_url}/launchpads/listed?limit=200&&orderField=createdAt&orderDirection=-1&offset=1&duration[]=live&duration[]=upcoming`);
            let launchpadDrops = response?.data.data.launchpads
            setMainCardData(launchpadDrops);
            // if (launchpadDrops?.length  === 0){
            //     setTime({ name: 'Upcomming', value: 'upcoming' })
            // }
        } catch (error) {
            console.error('Error fetching launch pad data:', error);
        }
    };
    // useEffect(() => {
    //     const val = localStorage.getItem("accessToken");
    //     setAccessToken(val);
    // }, []);
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

    useEffect(() => {
        console.log("mainCardData", mainCardData);
        getLaunchPadDrops();
        setTimeout(() => {
            getLaunchPadDrops();
        }, 500);

    }, []);
    console.log(mainCardData,);

    return (
        // top - collections
        <section className=' launchpad-drops '>
            <div className="custom-container">
                <div className="upper-content">
                    <h5>Launchpad drops</h5>
                    {/* <div className="right-btns">
                        <div className="dropdown">
                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {time?.name} <img src="\assets\landing\static\dropdown-arrow.svg" alt="img" className="img-fluid" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Live', value: 'live' }) }} >Live</a></li>
                                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Upcomming', value: 'upcoming' }) }} >Upcoming</a></li>
                                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Past', value: 'past' }) }} >Past</a></li>
                            </ul>
                        </div>
                        <Link href="/launchpad" className="btn-seeall">See All</Link>
                    </div> */}

                </div>
                {mainCardData?.length > 0 &&
                    (

                        <div className="bottom-cards">
                            <div className="owl_option">
                                <OwlCarousel
                                    className="owl-theme"
                                    {...owl_option}
                                >
                                    {mainCardData?.map((item, index) => {
                                        let isUpcoming = new Date(item?.mintStartTime) > new Date()
                                        let mintStage = item?.mintStages
                                        let mintStartTime = item?.mintStartTime
                                        return (
                                            item?.minted === item?.itemsCreated ||
                                            <Link key={index} href={'/launchpaddetailpage?id=' + item?._id}>
                                                <div className="main-card" key={index}>
                                                    <div className="main-img">
                                                        <img src={item?.imageUrl} alt="img" className='img-fluid' />
                                                    </div>
                                                    <div className="bottom-text">
                                                        <h5>{item?.name}</h5>
                                                        <div className="inner-text">
                                                            <div className="text">
                                                                <h6>PRICE</h6>
                                                                <p>{stagePrice(mintStage, mintStartTime)}</p>
                                                            </div>
                                                            <div className="text">
                                                                <h6>Items</h6>
                                                                <p>{item?.itemsCreated}</p>
                                                            </div>
                                                            <div className="text">
                                                                <h6>MINTED</h6>
                                                                <p>{item?.minted}</p>
                                                            </div>
                                                        </div>

                                                        {
                                                            isUpcoming ?
                                                                <div className="timer ">
                                                                    <h6>Starts <CountdownTimer endDate={item?.mintStartTime} /></h6>
                                                                </div>
                                                                :
                                                                <div className="timer ">
                                                                    <h6>🟢 <span className='green'>Live</span> <CountdownTimer endDate={item?.mintEndTime} /></h6>
                                                                </div>
                                                        }
                                                    </div>
                                                    {/* <a href="#" className='btn-mint'>Google Calender</a> */}
                                                </div>
                                            </Link>

                                        )
                                    })}
                                    {mainCardData?.map((item, index) => {
                                        let mintStage = item?.mintStages
                                        let mintStartTime = item?.mintStartTime
                                        return (
                                            item?.minted === item?.itemsCreated &&
                                            <Link key={index} href={'/launchpaddetailpage?id=' + item?._id}>
                                                <div className="main-card" key={index}>
                                                    <div className="main-img">
                                                        <img src={item?.imageUrl} alt="img" className='img-fluid' />
                                                    </div>
                                                    <div className="bottom-text">
                                                        <h5>{item?.name}</h5>
                                                        <div className="inner-text">
                                                            <div className="text">
                                                                <h6>PRICE</h6>
                                                                <p>{stagePrice(mintStage, mintStartTime)}</p>
                                                            </div>
                                                            <div className="text">
                                                                <h6>Items</h6>
                                                                <p>{item?.itemsCreated}</p>
                                                            </div>
                                                            <div className="text">
                                                                <h6>MINTED</h6>
                                                                <p>{item?.minted}</p>
                                                            </div>
                                                        </div>
                                                        <div className="timer ">
                                                            <h6 className='text-secondary'>Sold Out</h6>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>

                                        )
                                    })}
                                </OwlCarousel>
                            </div>
                        </div>
                    )}

            </div>
        </section>

    );
};

export default Launchpaddrops;
