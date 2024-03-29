import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Environment from '@/utils/Enviroment';

var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Link from 'next/link';
import axios from 'axios';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Newcollections = () => {

    const api_url = Environment.api_url
    const [mainCardData, setMainCardData] = useState(null);
    // console.log("collection detail",mainCardData)
    const [accessToken, setAccessToken] = useState("");
    const owl_option = {
        nav: true,
        dots: false,
        dotsEach: false,
        loop: true,
        autoplay:false,
        autoplayTimeout: 2000,
        navText: [
            "<img src='/assets/landing/static/carousel-arrow-back.svg' alt='img' />",
            "<img src='/assets/landing/static/carousel-arrow-next.svg' alt='img' />",
        ],
        responsive: {
            0: {
                items: 1.3,
                margin: 10,
                autoplay: true,
            },
            361: {
                items: 1.3,
                margin: 10,
                autoplay: true,
            },
            600: {
                items: 1.3,
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
    //         getNewCollections();
    //     }
    // }, []);
    const getNewCollections = async () => {
        try {
            const response = await axios.get(`${api_url}/launchpads/collections?limit=50`, {
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
        getNewCollections();
    }, []);

    // const mainCardData = [
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/5.png",
    //         title: "Scream Society OG",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/6.png",
    //         title: "Bullish Monkeys",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/7.png",
    //         title: "Kinzoku",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/8.png",
    //         title: "Pixel Mob",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/5.png",
    //         title: "Scream Society OG",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/6.png",
    //         title: "Bullish Monkeys",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/7.png",
    //         title: "Kinzoku",
    //     },
    //     {
    //         imageUrl: "/assets/dummy-imgs/allcards/8.png",
    //         title: "Pixel Mob",
    //     },
    // ];

    return (
        // <section className='launchpad-drops new-collections'>
        //     <div className="custom-container">
        //         <div className="upper-content">
        //             <h5>New Collections</h5>
        //             {/* <div className="right-btns">
        //             <Link href="/seeall" className="btn-seeall">See All</Link>
        //             </div> */}
        //         </div>
        //         {mainCardData &&
        //             (
        //                 <div className="bottom-cards">
        //                     <div className="owl_option">
        //                         <OwlCarousel
        //                             className="owl-theme"
        //                             {...owl_option}
        //                         >
        //                             {mainCardData?.map((item, index) => (
        //                                 <Link key={index} href={`/collections?id=${item?._id}`}>
        //                                     <div className="main-card" >
        //                                         <div className="main-img">
        //                                             <img src={item?.imageUrl} alt="img" className='img-fluid' />
        //                                         </div>
        //                                         <div className="bottom-text">
        //                                             <h5>{item?.name}</h5>
        //                                         </div>
        //                                     </div>
        //                                 </Link>
        //                             ))}
        //                         </OwlCarousel>
        //                     </div>
        //                 </div>
        //             )
        //         }

        //     </div>
        // </section>
        <section className='launchpad-drops new-collections new-collections-style-updated'>
        <div className="custom-container">
            <div className="upper-content">
                <h5>New Collections</h5>
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
                                {mainCardData?.map((item, index) => (
                                    <Link key={index} href={`/launchpads/${item?._id}`}>
                                        {console.log('item',item)}
                                        <div className="main-card-new" >
                                            <span className='bottom-bg-linear'></span>
                                            <div className="main-img">
                                                <img src={item?.imageUrl} alt="img" className='img-fluid' />
                                            </div>
                                            <div className="bottom-text">
                                                <h5>{item?.name}</h5>
                                                <p>Hot Collection</p>
                                                <div className="hidden-data">
                                                    <p className='para'>{item?.description?.length > 110 ? item?.description?.slice(0, 110) + '...' : item?.description} </p>
                                                    <a href="#" className='btn-explore'>Explore collection</a>
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

export default Newcollections;
