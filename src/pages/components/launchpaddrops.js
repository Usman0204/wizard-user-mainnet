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

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Launchpaddrops = () => {
    const api_url = Environment.api_url
    const [mainCardData, setMainCardData] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const owl_option = {
        nav: true,
        dots: false,
        dotsEach: false,
        loop: false,
        autoplay: false,
        navText: [
            "<img src='/assets/landing/static/carousel-arrow-back.svg' alt='img' />",
            "<img src='/assets/landing/static/carousel-arrow-next.svg' alt='img' />",
        ],
        responsive: {
            0: {
                items: 1,
                margin: 10,
            },
            361: {
                items: 1.3,
                margin: 10,
                loop: true,
                nav: false,
                dots: true,
                dotsEach: true
            },
            600: {
                items: 1.3,
                margin: 10,
                loop: true,
                nav: false,
                dots: true,
                dotsEach: true
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
            const response = await axios.get(`${api_url}/launchpads/listed?limit=200&offset=1&duration[]=live`, {
                // headers: {
                //     Authorization: "Bearer " + accessToken,
                //     'Content-Type': 'application/json',
                // },
            });
            setMainCardData(response.data.data);
        } catch (error) {
            console.error('Error fetching launch pad data:', error);
        }
    };
    // useEffect(() => {
    //     const val = localStorage.getItem("accessToken");
    //     setAccessToken(val);
    // }, []);


    useEffect(() => {
        console.log("mainCardData", mainCardData);
        getLaunchPadDrops();
    }, []);

    // const mainCardData = [
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/1.png",
    //         title: "GREENCY-NEKO",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/2.png",
    //         title: "Ordinal Codes",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/3.png",
    //         title: "Quekz x SolPlug",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/4.png",
    //         title: "SAGA",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/5.png",
    //         title: "GREENCY-NEKO",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/6.png",
    //         title: "GREENCY-NEKO",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/7.png",
    //         title: "GREENCY-NEKO",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/8.png",
    //         title: "GREENCY-NEKO",
    //         price: "584.85 Core",
    //         items: "7,777",
    //         minted: "6789",
    //     },

    // ];

    return (
        <section className='launchpad-drops'>
            <div className="custom-container">
                <div className="upper-content">
                    <h5>Launchpad drops</h5>
                    <div className="right-btns">
                        <Link href="/launchpad" className="btn-seeall">See All</Link>
                    </div>
                </div>
                {mainCardData &&
                    (
                        <div className="bottom-cards">
                            <div className="owl_option">
                                <OwlCarousel
                                    className="owl-theme"
                                    {...owl_option}
                                >
                                    {mainCardData.launchpads.map((item, index) => (
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
                                                            <p>{item?.price || 0}</p>
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
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </OwlCarousel>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    );
};

export default Launchpaddrops;
