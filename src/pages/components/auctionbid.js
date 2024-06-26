import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Link from 'next/link';
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import AuctionTimmer from './auctiontimer';
import CountdownTimer from './auctiontimer';
import ReactPaginate from 'react-paginate';
import Loader from '@/hooks/loader';
import MediaType from './mediaType';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Auctionbid = ({ tab }) => {
    const [cardData, setUpcomingdata] = useState([])
    const [filters, setFilters] = useState({ name: 'Recently Listed', value: '-1' })
    const [dataset, setdataset] = useState();
    const [loader, setloader] = useState(false)
    const api_url = Environment?.api_url
    const [page, setPage] = useState(1);
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
                items: 2.2,
                margin: 10,
            },
            1000: {
                items: 3,
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

    const GetUpcomingDetail = () => {
        setloader(true)
        let tok = localStorage.getItem("accessToken");

        // Calculate the offset based on the current page
        let offset = page;

        // Base URL for the upcoming NFTs endpoint
        let baseUrl = `${api_url}/nfts/auctions`;

        // Apply filters
        let orderField = (filters?.name === 'All' || filters?.name === 'Recently Listed') ? 'createdAt' : 'price';
        let orderDirection = filters?.name === 'Low to High' ? '1' : '-1';
        // let status = (filters?.name === 'High to Low' || filters?.name === 'Low to High') ? 'onSale' : '';

        // Construct the final URL with filters and pagination
        let url = `${baseUrl}?offset=${offset}&limit=50&orderField=${orderField}&orderDirection=${orderDirection}`;
        // if (status) {
        //     url += `&status=${status}`;
        // }

        var config = {
            method: "get",
            url: url,
            headers: {
                // Authorization header, uncomment if required
                // authorization: `Bearer ${tok}`,
            },
        };

        axios(config)
            .then(function (response) {
                // Append new data to the existing dataset array
                setdataset(response?.data?.data)
                setUpcomingdata(prev => [...prev, ...(response?.data?.data?.auctionNfts)]);
                setloader(false)
                // Optionally, increment the page state to load the next page on subsequent calls
                // setPage(prevPage => prevPage + 1);
            })
            .catch(function (error) {
                setloader(false)
                // Handle errors here
            });
    };

    useEffect(() => {
        GetUpcomingDetail()
    }, [filters, page])


    const resetDataAndFetch = () => {
        setUpcomingdata([]); // Clear existing data
        setPage(1); // Reset pagination to page 1

        // getCollectionItemsDetails(); // Fetch data with new filters/sort
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])
    const handlePageChange = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1);
    };
    return (
        <>
            {loader && (tab === 'liveauction' && <Loader />)}
            <section className="live-auction">
                <div className="custom-container">
                    <div className="upper-content">
                        <h5>Live Auction</h5>
                        {tab === 'liveauction' || <div className="right-btns">
                            <Link href="/seeall?id=liveauction" className="btn-seeall">
                                Explore All
                            </Link>
                        </div>}
                        {tab != 'liveauction' || <div className="right-btns">
                            <div className="dropdown">
                                <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {filters?.name === 'All' ? 'Price' : filters?.name}<img src="\assets\landing\static\dropdown-arrow.svg" alt="img" className="img-fluid" />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => { setFilters({ name: 'All', value: '1' }); resetDataAndFetch(); }} >All</a></li>
                                    <li><a className="dropdown-item" onClick={() => { setFilters({ name: 'Low to High', value: '1' }); resetDataAndFetch(); }} >Low to High</a></li>
                                    <li><a className="dropdown-item" onClick={() => { setFilters({ name: 'High to Low', value: '-1' }); resetDataAndFetch(); }} >High to Low</a></li>
                                    <li><a className="dropdown-item" onClick={() => { setFilters({ name: 'Recently Listed', value: '-1' }); resetDataAndFetch(); }} >Recently Listed</a></li>
                                </ul>
                            </div>
                        </div>}
                    </div>
                    <div className={tab === 'liveauction' ? "bottom-cards" : "bottom-cards displaynoneinmobile"}>
                        {cardData?.slice(0, tab === 'buynow' ? 20000 : 8)?.map((card, id) => (
                            <Link key={id} href={`/nftdetail?id=${card?._id}`}>
                                <div className="main-card">
                                    <div className="main-img">
                                        <MediaType hash={card?.nft} classNameD='img-fluid main-img-card' />
                                        {/* <img
                                            src={'https://ipfs.io/ipfs' + card?.nft}
                                            alt="img"
                                            className="img-fluid main-img-card"
                                        /> */}
                                        <img
                                            src="/assets/landing/static/live-auction-abs.svg"
                                            alt="img"
                                            className="img-fluid abs-img"
                                        />
                                    </div>
                                    <div className="bottom-text">
                                        <div className="twice-text">
                                            <div className="left-text">
                                                <h6>
                                                    <span>By</span>
                                                    {card?.launchpadId?.name}{' '}
                                                    <img
                                                        src="/assets/landing/static/verify-icon.svg"
                                                        alt="img"
                                                        className="img-fluid"
                                                    />
                                                </h6>
                                                <h5>#{card?.tokenID}</h5>
                                            </div>
                                            <div className="right-text">
                                                <h6>Price</h6>
                                                <h5>
                                                    <img
                                                        src="/assets/landing/static/price-icon.svg"
                                                        alt="img"
                                                        className="img-fluid"
                                                    />
                                                    {card?.price || 0} <span>Core</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="timer ">
                                            {/* card?.duration = 2024-02-24T07:26:00.000Z */}
                                            {/* <h6><Timer endTime="2024-02-24T07:26:00.000Z" /></h6> */}
                                            {/* <h6><Timer duration={"2024-02-24T07:26:00.000Z"} /></h6> */}
                                            <h6><CountdownTimer endDate={card?.duration} /></h6>
                                        </div>
                                    </div>
                                    <Link href={`/nftdetail?id=${card?._id}`} className='btn-forbid'>Place a bid</Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {cardData?.length > 0 &&
                        (
                            <div className={tab === 'liveauction' ? "bottom-cards d-none " : "bottom-cards d-none displayblockinmobile"}>
                                <div className="owl_option">

                                    <OwlCarousel
                                        className="owl-theme"
                                        {...owl_option}
                                    >
                                        {cardData?.slice(0, tab === 'liveauction' ? 20000 : 8)?.map((card) => (
                                            <Link key={card.id} href={`/nftdetail?id=${card?._id}`}>
                                                <div className="main-card">
                                                    <div className="main-img">
                                                        <MediaType hash={card.nft} classNameD='img-fluid main-img-card' />
                                                        {/* <img
                                                            src={'https://ipfs.io/ipfs' + card.nft}
                                                            alt="img"
                                                            className="img-fluid main-img-card"
                                                        /> */}
                                                        <img
                                                            src="/assets/landing/static/live-auction-abs.svg"
                                                            alt="img"
                                                            className="img-fluid abs-img"
                                                        />
                                                    </div>
                                                    <div className="bottom-text">
                                                        <div className="twice-text">
                                                            <div className="left-text">
                                                                <h6>
                                                                    <span>By</span>
                                                                    {card?.launchpadId?.name}{' '}
                                                                    <img
                                                                        src="/assets/landing/static/verify-icon.svg"
                                                                        alt="img"
                                                                        className="img-fluid"
                                                                        style={{ width: "auto" }}
                                                                    />
                                                                </h6>
                                                                <h5>#{card?.tokenID}</h5>
                                                            </div>
                                                            <div className="right-text">
                                                                <h6>Price</h6>
                                                                <h5>
                                                                    <img
                                                                        src="/assets/landing/static/price-icon.svg"
                                                                        alt="img"
                                                                        className="img-fluid"
                                                                    />
                                                                    {card.price || 0} <span>Core</span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="timer ">
                                                            {/* card?.duration = 2024-02-24T07:26:00.000Z */}
                                                            {/* <h6><Timer endTime="2024-02-24T07:26:00.000Z" /></h6> */}
                                                            {/* <h6><Timer duration={"2024-02-24T07:26:00.000Z"} /></h6> */}
                                                            <h6><CountdownTimer endDate={card?.duration} /></h6>
                                                        </div>
                                                        {/* <div className="timer">
                                             <h6>05D : 12H : 07M : 45S</h6>
                                         </div> */}
                                                    </div>
                                                </div></Link>
                                        ))
                                        }
                                    </OwlCarousel>

                                </div>
                            </div>
                        )

                    }

                </div>
                {tab != 'liveauction' ||
                    (dataset?.pages > page &&
                        <div className="bottom-btn-seemore">
                            {/* <a className='' onClick={() => setPage(page + 1)}>{loader ? 'Loading...' : 'See more'} </a> */}
                            <div className="paginationmain mt-5">
                                <ReactPaginate
                                    previousLabel="Previous"
                                    nextLabel="Next"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageCount={Math.ceil(dataset?.pages)}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    forcePage={page - 1}
                                />
                            </div>
                        </div>)
                }
            </section>
            {/* <section className="live-auction">
                <div className="custom-container">
                    <div className="upper-content">
                        <h5>Live Auctions</h5>
                        <div className="right-btns">
                            <Link href="/launchpads" className="btn-seeall">
                                Explore All
                            </Link>
                        </div>
                    </div>
                    <div className="bottom-cards displaynoneinmobile">
                        {cardData.map((card) => (
                            <div key={card.id} className="main-card">
                                <div className="main-img">
                                    <img
                                        src={card.imageSrc}
                                        alt="img"
                                        className="img-fluid main-img-card"
                                    />
                                    <img
                                        src="/assets/landing/static/live-auction-abs.svg"
                                        alt="img"
                                        className="img-fluid abs-img"
                                    />
                                </div>
                                <div className="bottom-text">
                                    <div className="twice-text">
                                        <div className="left-text">
                                            <h6>
                                                <span>By</span>
                                                {card.artist}{' '}
                                                <img
                                                    src="/assets/landing/static/verify-icon.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                            </h6>
                                            <h5>{card.cardNumber}</h5>
                                        </div>
                                        <div className="right-text">
                                            <h6>Price</h6>
                                            <h5>
                                                <img
                                                    src="/assets/landing/static/price-icon.svg"
                                                    alt="img"
                                                    className="img-fluid"
                                                />
                                                {card.price} <span>Core</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="timer">
                                        <h6>05D : 12H : 07M : 45S</h6>
                                    </div>
                                </div>
                                <Link href="/nftdetail" className='btn-forbid'>Place a bid</Link>
                            </div>
                        ))}
                    </div>
                    <div className="bottom-cards d-none displayblockinmobile">
                        <div className="owl_option">
                            <OwlCarousel
                                className="owl-theme"
                                {...owl_option}
                            >
                                {cardData.map((card) => (
                                    <div key={card.id} className="main-card">
                                        <div className="main-img">
                                            <img
                                                src={card.imageSrc}
                                                alt="img"
                                                className="img-fluid main-img-card"
                                            />
                                            <img
                                                src="/assets/landing/static/live-auction-abs.svg"
                                                alt="img"
                                                className="img-fluid abs-img"
                                            />
                                        </div>
                                        <div className="bottom-text">
                                            <div className="twice-text">
                                                <div className="left-text">
                                                    <h6>
                                                        <span>By</span>
                                                        {card.artist}{' '}
                                                        <img
                                                            src="/assets/landing/static/verify-icon.svg"
                                                            alt="img"
                                                            className="img-fluid"
                                                            style={{ width: "auto" }}
                                                        />
                                                    </h6>
                                                    <h5>{card.cardNumber}</h5>
                                                </div>
                                                <div className="right-text">
                                                    <h6>Price</h6>
                                                    <h5>
                                                        <img
                                                            src="/assets/landing/static/price-icon.svg"
                                                            alt="img"
                                                            className="img-fluid"
                                                        />
                                                        {card.price} <span>Core</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="timer">
                                                <h6>05D : 12H : 07M : 45S</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Auctionbid;
