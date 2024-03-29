import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import Link from 'next/link';
var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Topseller = () => {
    const api_url = Environment.api_url
    const [mainCardData, setMainCardData] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    const owl_option = {
        nav: true,
        dots: false,
        dotsEach: false,
        loop: true,
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
                items: 1.9,
                margin: 10,
                // loop: true,
                // nav: false,
                // dots: true,
                // dotsEach: true
            },
            600: {
                items: 1.9,
                margin: 10,
                // loop: true,
                // nav: false,
                // dots: true,
                // dotsEach: true
            },
            700: {
                items: 3.5,
                margin: 10,
            },
            1000: {
                items: 4,
                margin: 10,
            },
            1200: {
                items: 6,
                margin: 10,
            },
            1900: {
                items: 7,
                margin: 10,
            },
            2000: {
                items: 8,
                margin: 10,
            },
            2250: {
                items: 9,
                margin: 10,
            },
        },
    };

    // const mainCardData = [
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts1.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp1.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts2.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp2.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts3.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp3.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts4.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp4.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts5.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp5.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts6.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp6.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts1.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp1.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts2.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp2.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts3.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp3.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts4.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp4.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts5.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp5.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/ts6.png",
    //         imageprofileUrl: '/assets/dummy-imgs/allcards/tp6.png',
    //         title: "Willie Gray",
    //         price: "584.85",
    //     },
    // ];


    const getLaunchPadDrops = async () => {
        try {
            const response = await axios.get(`${api_url}/users/top-seller?limit=50&offset=1&orderField=salesCore&orderDirection=-1`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'application/json',
                },
            });
            setMainCardData(response.data.data.topsellers);
        } catch (error) {
            console.error('Error fetching launch pad data:', error);
        }
    };
    useEffect(() => {
        const val = localStorage.getItem("accessToken");
        setAccessToken(val);
    }, []);


    useEffect(() => {
        // console.log("Access", accessToken);
        getLaunchPadDrops();
    }, []);
    // useEffect(() => {
    //     const storedData = localStorage.getItem('mainCardData');

    //     if (storedData) {
    //         setMainCardData(JSON.parse(storedData));
    //     } else {
    //         getLaunchPadDrops();
    //     }
    // }, []);
    return (
        <section className='top-seller'>
            <div className="custom-container">
                <div className="upper-content">
                    <h5>Top Sellers</h5>
                    {/* <div className="right-btns">
                        <Link href="/seeall" className="btn-seeall">See All</Link>
                    </div> */}
                </div>
                {mainCardData &&
                    (
                        <div className="bottom-cards">
                            <div className="owl_option">
                                <OwlCarousel
                                    className="owl-theme"
                                    {...owl_option}
                                >
                                    {mainCardData?.map((card, index) => (
                                        <Link key={index} href={`/authorprofile?id=${card?._id}`}>
                                            <div className="main-card" >
                                                <div className="main-img">
                                                    <img src={card?.coverPicture ? card?.coverPicture : 'https://res.cloudinary.com/drt6vurtt/image/upload/v1708523096/wizard/cover_jhjfkt.svg'} alt="img" className='img-fluid main-img-bg' />
                                                </div>
                                                <div className="profile-img">
                                                    <img src={card?.picture ? card?.picture : 'https://res.cloudinary.com/drt6vurtt/image/upload/v1708523335/wizard/placeholder-image_qrns9p.png'} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="bottom-text">
                                                    <h5>{card?.name ? card.name : 'Anonymous'}</h5>
                                                    <p>{card.salesCore} <span>Core</span></p>
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

export default Topseller;
