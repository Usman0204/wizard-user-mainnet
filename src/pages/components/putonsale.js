import React, { useEffect, useState } from 'react'
import { Dropdown, Modal, Nav } from 'react-bootstrap'
import Navbar from './navbar';
import Footer from './footer';
import Link from 'next/link';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import moment from 'moment';
import CountdownTimer from './Timer/Timer';
import AcceptBid from '@/hooks/acceptBid';
import { useWeb3React } from "@web3-react/core";
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import AcceptOffer from '@/hooks/accpetoffer';
import useAuth from '@/hooks/useAuth';
const Putonsale = () => {
    const [activeTab, setActiveTab] = useState('link-1');
    const [offset, setOffset] = useState(1)
    let { account } = useWeb3React();
    const [likes, setlikes] = useState()
    const [dataset3, setdataset3] = useState()
    const [offerprice, setofferprice] = useState(0)
    const [offerid, setofferid] = useState(null)
    const [offerindex, setofferindex] = useState(null)
    const [dataset, setdataset] = useState();
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    const [bool, setBool] = useState(false);
    const [dataset5, setdataset5] = useState();
    const [idd, setIdd] = useState()
    const [bidsData, setBidsData] = useState()
    const api_url = Environment.api_url;
    let { AcceptBidHook } = AcceptBid()
    let { AcceptOfferHook } = AcceptOffer()
    const { login, logout } = useAuth();
    var router = useRouter();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);

    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);

    const handleClose5 = () => {
        setShow5(false);
        // setcorevalue(0)
    }
    const handleClose6 = () => setShow6(false);
    const handleClose7 = () => setShow7(false);

    const handleShow5 = () => setShow5(true);
    const handleShow6 = () => setShow6(true);
    const handleShow7 = () => setShow7(true);

    const handleShow3 = () => {
        setShow3(true);
        // setTimeout(() => {
        //     setShow3(false);
        //     setShow4(true);
        // }, 2000);
    };

    const handleClose3 = () => {
        setShow4(false);
        setShow3(false)
    };

    const [show4, setShow4] = useState(false);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);


    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    const [heart, setHeart] = useState(true)

    const [startLength, setStartLength] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            const newStartLength = window.innerWidth >= 600 ? 11 : 6;
            setStartLength(newStartLength);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateWalletAddress = (address, endLength = 4) => {
        const start = address?.slice(0, startLength);
        const end = address?.slice(-endLength);
        return `${start}...${end}`;
    };

    const [timeshow, setTimeshow] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const time = new Date("jan 30, 2024 08:00:00");
            const diff = time.getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeshow(true);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            setDay(days);
            setHour(hours);
            setMin(mins);
            setSec(secs);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const getNftDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idd}/details`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset(response?.data?.data?.nft[0])
                setlikes(response?.data?.data?.likes)
                // console.log(response.data.data?._id);
                // setLoader(false);
                // setUpcomingdata(response.data.data.upcomingLaunchpads[0])
                // console.log("response data upcoming", response.data.data.upcomingLaunchpads[0])
            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        setIdd(id)
        // console.log(id);

    }, [bool])
    useEffect(() => {
        (idd && account) && getNftDetails()

    }, [idd, account])

    const getNftActivityDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idd}/activities?limit=10&orderField=createdAt&orderDirection=-1`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset3(response?.data?.data)
                // console.log(response.data.data);
                // setLoader(false);
                // setUpcomingdata(response.data.data.upcomingLaunchpads[0])
                // console.log("response data upcoming", response.data.data.upcomingLaunchpads[0])
            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    }
    const acceptAuc = () => {
        let tok = localStorage.getItem("accessToken");
        const config = {
            // / nfts / { id } / accept - bid / { bidId }
            method: 'patch',
            url: `${api_url}/nfts/${idd}/accept-bid/${bidsData?.[0]?._id}`,
            // data: {
            //     isFixedPrice: true,
            //     price: fee,
            // },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                setLoader(false)
                toast.success("Bid Accepted successfully")
                setShow3(false);
                setShow4(true);
                setTimeout(() => {
                    router.push(`/myprofile`)
                }, 2000);
                // setBool(!bool)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                setLoader(false)
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };
    async function acceptBid() {

        handleClose();
        handleShow3();
        try {
            setLoader(true)
            // console.log(dataset?.collectionAddress, dataset?.tokenID);
            let res = await AcceptBidHook(dataset?.collectionAddress, dataset?.tokenID)
            console.log(res);
            if (res) {
                // setLoader(true)
                acceptAuc()
                // setLoader(false)
            }
            // let res = 
        } catch (error) {
            setShow3(false);
            setLoader(false)
        }
    }
    const BidsHighest = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idd}/bids`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                // console.log("sdsdsd++++++++++", bidsData?.[0]?._id)
                setBidsData(response?.data?.data)
                // console.log(response.data.data);
                // setLoader(false);
                // setUpcomingdata(response.data.data.upcomingLaunchpads[0])
                // console.log("response data upcoming", response.data.data.upcomingLaunchpads[0])
            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    };
    // useEffect(() => {
    //     dataset?._id && BidsHighest();
    // }, [dataset?._id]);
    useEffect(() => {
        if (account && idd) { getNftActivityDetails() }
        if (account && idd) { BidsHighest() }
        var val = window.location.href;
        setlinkuser(val)
        setlinktext('NFT Detail Here TokenID = #' + dataset?.tokenID)
    }, [idd, bool, account])

    const [linkUser, setlinkuser] = useState();
    const [linkText, setlinktext] = useState();

    const twiterPost = async () => {
        console.log("asdasdas")
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(linkUser)}&text=${encodeURIComponent(linkText)}`;
        window.open(tweetUrl, '_blank');
        // clickApi('copyTwitter')
    }

    useEffect(() => {
        OfferNft();
    }, [idd, account]);
    let logoutApi = async () => {
        const connectorId = window?.localStorage.getItem("connectorId")
        logout(connectorId);
        localStorage.setItem("flag", false)
        localStorage.clear()
    }
    const OfferNft = async () => {
        // let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idd}/offers`,
            // headers: {
            //     authorization: `Bearer ` + tok
            // },
        }

        axios(config)
            .then(function (response) {
                // console.log("sdsdsd++++++++++", response.data?.data[0]?.bidPrice)
                setdataset5(response?.data?.data)
                // sethighestbid(response?.data?.data[0]?.bidPrice)
                // console.log(response.data.data);
                // setLoader(false);
                // setUpcomingdata(response.data.data.upcomingLaunchpads[0])
                // console.log("response data upcoming", response.data.data.upcomingLaunchpads[0])
            })
            .catch(function (error) {
                if (error?.request?.status === 401) {
                    logoutApi()
                }
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    };

    const itemoffer = async (item, index) => {
        setofferprice(item?.offerPrice)
        setofferindex(index)
        setofferid(item?._id)
    }

    const acceptOfferSuc = () => {
        let tok = localStorage.getItem("accessToken");
        const config = {
            // / nfts / { id } / accept - bid / { bidId }
            method: 'patch',
            url: `${api_url}/nfts/${idd}/accept-offer/${offerid}`,
            // data: {
            //     isFixedPrice: true,
            //     price: fee,
            // },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                setLoader(false)
                toast.success("Offer Accepted successfully")
                setShow6(false);
                setShow7(true);
                setTimeout(() => {
                    router.push(`/myprofile`)
                }, 2000);
                // setBool(!bool)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                setLoader(false)
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };

    async function acceptoffernew() {

        handleClose5();
        handleShow6();
        try {
            setLoader(true)
            // console.log(dataset?.collectionAddress, dataset?.tokenID);
            let res = await AcceptOfferHook(dataset?.collectionAddress, dataset?.tokenID, offerindex, dataset?.openForBid, dataset?.isFixedPrice )
            console.log(res);
            if (res) {
                // setLoader(true)
                acceptOfferSuc()
                // setLoader(false)
            }
            // let res = 
        } catch (error) {
            setShow6(false);
            // setLoader(false)
        }
    }


        // console.log("item", offerid, idd)

    useEffect(() => {
       
        if (dataset && dataset.currentOwner?.[0]?.walletAddress !== account?.toLowerCase()){
            router.push(`/nftdetail?id=${dataset._id}`);
        }
    }, [account, dataset, router]);

    return (
        <>
            <Navbar />
            <section className="nftdetailmain">
                <div className="custom-container">
                    <div className="nftdetailupper">
                        <div className="nftimagemain">
                            <img src={'https://dweb.link/ipfs' + dataset?.nft || '/assets/profile.png'} alt="nftimginner" className="nftimginner" />
                        </div>
                        <div className="nftdetails">
                            <div className="nftownerdetail">
                                <div className="nftownerimage">
                                    <img src={dataset?.launchpad[0]?.imageUrl} alt="nftownerinnerimage" className="nftownerinnerimage" />
                                </div>
                                <h6 className="nftownername">{dataset?.launchpad[0]?.name}</h6>
                                <img src="\assets\nftdetailassets\verify.svg" alt="verifiedimage" className="verifiedimage" />
                            </div>
                            <h5 className="nftname">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</h5>
                            {/* <div className="royalitymain">
                                <h6 className="royalitypara">Royalties</h6>
                                <span className="royalitypercentage">5%</span>
                            </div> */}
                            <div className="creatorandownermain">
                                <div className="creatorownermain">
                                    <div className="creatorownermainimage">
                                        <img src="\assets\nftdetailassets\creator.png" alt="creatorownerinnerimage" className="creatorownerinnerimage" />
                                    </div>
                                    <div className="creatorownertexts">
                                        <p className="creatorownerpara">Creator</p>
                                        <h6 className="creatorownerwallet">{truncateWalletAddress(dataset?.creator[0]?.walletAddress)}</h6>
                                    </div>
                                </div>

                                <div className="creatorownermain">
                                    <div className="creatorownermainimage">
                                        <img src="\assets\nftdetailassets\currentowner.png" alt="creatorownerinnerimage" className="creatorownerinnerimage" />
                                    </div>
                                    <div className="creatorownertexts">
                                        <p className="creatorownerpara">Current Owner</p>
                                        <h6 className="creatorownerwallet">{truncateWalletAddress(dataset?.currentOwner[0]?.walletAddress)}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="likesharemain">
                                <div className="likeshareleft">
                                    <div className="likemain">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={heart ? 'lineimg' : 'fillimg'} onClick={() => setHeart(!heart)} cursor="pointer">
                                            <path d="M12 21.6496C11.69 21.6496 11.39 21.6096 11.14 21.5196C7.32 20.2096 1.25 15.5596 1.25 8.68961C1.25 5.18961 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00961 12 4.18961C13.17 3.00961 14.75 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.19961 22.75 8.68961C22.75 15.5696 16.68 20.2096 12.86 21.5196C12.61 21.6096 12.31 21.6496 12 21.6496ZM7.56 3.84961C4.91 3.84961 2.75 6.01961 2.75 8.68961C2.75 15.5196 9.32 19.3196 11.63 20.1096C11.81 20.1696 12.2 20.1696 12.38 20.1096C14.68 19.3196 21.26 15.5296 21.26 8.68961C21.26 6.01961 19.1 3.84961 16.45 3.84961C14.93 3.84961 13.52 4.55961 12.61 5.78961C12.33 6.16961 11.69 6.16961 11.41 5.78961C10.48 4.54961 9.08 3.84961 7.56 3.84961Z" fill="#745F8C" />
                                        </svg>
                                        <p className="likepara">{likes ? likes : 0}</p>
                                    </div>
                                    <div className="sharemain" onClick={twiterPost}>
                                        <img src="\assets\nftdetailassets\export.svg" alt="shareimgbrdr" className="shareimgbrdr" />
                                        <p className="sharepara">Share</p>
                                    </div>
                                </div>
                                {/* <Dropdown align='end'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <img src="\assets\nftdetailassets\dropimage.svg" alt="dropimageright" className="dropimageright" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <p className="dropitem">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='dropimg'>
                                                <g id="vuesax/outline/refresh-2">
                                                    <g id="refresh-2">
                                                        <path id="Vector" d="M15.5837 8.50033C15.5837 12.4103 12.4103 15.5837 8.50033 15.5837C4.59033 15.5837 2.20324 11.6453 2.20324 11.6453M2.20324 11.6453H5.40491M2.20324 11.6453V15.187M1.41699 8.50033C1.41699 4.59033 4.56199 1.41699 8.50033 1.41699C13.2249 1.41699 15.5837 5.35533 15.5837 5.35533M15.5837 5.35533V1.81366M15.5837 5.35533H12.4387" stroke="#862FC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                </g>
                                            </svg>
                                            Refresh metadata</p>
                                        <p className="dropitem">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='dropimg'>
                                                <g id="vuesax/outline/flag">
                                                    <g id="flag">
                                                        <path id="Vector" d="M3.64746 16.1149C3.35704 16.1149 3.11621 15.8741 3.11621 15.5837V1.41699C3.11621 1.12658 3.35704 0.885742 3.64746 0.885742C3.93788 0.885742 4.17871 1.12658 4.17871 1.41699V15.5837C4.17871 15.8741 3.93788 16.1149 3.64746 16.1149Z" fill="#745F8C" />
                                                        <path id="Vector_2" d="M11.5808 11.8643H3.64746C3.35704 11.8643 3.11621 11.6234 3.11621 11.333C3.11621 11.0426 3.35704 10.8018 3.64746 10.8018H11.5808C12.3529 10.8018 12.7141 10.5963 12.785 10.4193C12.8558 10.2422 12.7495 9.84551 12.197 9.30009L11.347 8.45009C11 8.14551 10.7875 7.68509 10.7662 7.17509C10.745 6.63676 10.9575 6.10551 11.347 5.71592L12.197 4.86592C12.7212 4.34176 12.8841 3.91676 12.8062 3.73259C12.7283 3.54842 12.3245 3.36426 11.5808 3.36426H3.64746C3.34996 3.36426 3.11621 3.12342 3.11621 2.83301C3.11621 2.54259 3.35704 2.30176 3.64746 2.30176H11.5808C13.132 2.30176 13.6279 2.94634 13.7908 3.32884C13.9466 3.71134 14.0529 4.51884 12.9479 5.62384L12.0979 6.47384C11.9208 6.65092 11.8216 6.89884 11.8287 7.14676C11.8358 7.35926 11.9208 7.55051 12.0695 7.68509L12.9479 8.55634C14.0316 9.64009 13.9254 10.4476 13.7695 10.8372C13.6066 11.2126 13.1037 11.8643 11.5808 11.8643Z" fill="#745F8C" />
                                                    </g>
                                                </g>
                                            </svg>
                                            Report</p>
                                    </Dropdown.Menu>
                                </Dropdown> */}

                            </div>

                            {(!dataset?.isFixedPrice && !dataset?.openForBid && account) &&
                                <div className="putonsalebtns ">

                                    <Link href={`/putonsalemethod?id=${dataset?._id}`} className="bluebtn ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M19.3833 6.89199L19.1416 4.58366C18.7916 2.06699 17.65 1.04199 15.2083 1.04199H13.2416H12.0083H9.47495H8.24162H6.24162C3.79162 1.04199 2.65829 2.06699 2.29995 4.60866L2.07495 6.90032C1.99162 7.79199 2.23329 8.65866 2.75829 9.33366C3.39162 10.1587 4.36662 10.6253 5.44995 10.6253C6.49995 10.6253 7.50829 10.1003 8.14162 9.25866C8.70829 10.1003 9.67495 10.6253 10.75 10.6253C11.825 10.6253 12.7666 10.1253 13.3416 9.29199C13.9833 10.117 14.975 10.6253 16.0083 10.6253C17.1166 10.6253 18.1166 10.1337 18.7416 9.26699C19.2416 8.60032 19.4666 7.75866 19.3833 6.89199Z" fill="white" />
                                            <path d="M10.2083 13.8829C9.14998 13.9912 8.34998 14.8912 8.34998 15.9579V18.2412C8.34998 18.4662 8.53331 18.6496 8.75831 18.6496H12.7333C12.9583 18.6496 13.1416 18.4662 13.1416 18.2412V16.2496C13.15 14.5079 12.125 13.6829 10.2083 13.8829Z" fill="white" />
                                            <path d="M18.5583 12.0001V14.4834C18.5583 16.7834 16.6916 18.6501 14.3916 18.6501C14.1666 18.6501 13.9833 18.4667 13.9833 18.2417V16.2501C13.9833 15.1834 13.6583 14.3501 13.025 13.7834C12.4666 13.2751 11.7083 13.0251 10.7666 13.0251C10.5583 13.0251 10.35 13.0334 10.125 13.0584C8.64165 13.2084 7.51665 14.4584 7.51665 15.9584V18.2417C7.51665 18.4667 7.33332 18.6501 7.10832 18.6501C4.80832 18.6501 2.94165 16.7834 2.94165 14.4834V12.0167C2.94165 11.4334 3.51665 11.0417 4.05832 11.2334C4.28332 11.3084 4.50832 11.3667 4.74165 11.4001C4.84165 11.4167 4.94998 11.4334 5.04998 11.4334C5.18332 11.4501 5.31665 11.4584 5.44998 11.4584C6.41665 11.4584 7.36665 11.1001 8.11665 10.4834C8.83332 11.1001 9.76665 11.4584 10.75 11.4584C11.7416 11.4584 12.6583 11.1167 13.375 10.5001C14.125 11.1084 15.0583 11.4584 16.0083 11.4584C16.1583 11.4584 16.3083 11.4501 16.45 11.4334C16.55 11.4251 16.6416 11.4167 16.7333 11.4001C16.9916 11.3667 17.225 11.2917 17.4583 11.2167C18 11.0334 18.5583 11.4334 18.5583 12.0001Z" fill="white" />
                                        </svg>
                                        Put on Sale</Link>

                                    <Link href={`/putonsalemethod?id=${dataset?._id}`} className="borderbtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M17.8667 15.8667C17.7417 15.9917 17.5834 16.0501 17.4251 16.0501C17.2667 16.0501 17.1084 15.9917 16.9834 15.8667L12.8584 11.7417L13.3001 11.3001L13.7417 10.8584L17.8667 14.9834C18.1084 15.2251 18.1084 15.6251 17.8667 15.8667Z" fill="#862FC0" />
                                            <path d="M6.14172 7.73308L10.975 12.5664C11.3 12.8914 11.3 13.4164 10.975 13.7414L10.225 14.4997C9.55005 15.1664 8.48338 15.1664 7.81672 14.4997L4.20005 10.8831C3.54172 10.2247 3.54172 9.14975 4.20005 8.48308L4.95838 7.72475C5.28338 7.40808 5.81672 7.40808 6.14172 7.73308Z" fill="#862FC0" />
                                            <path d="M16.2417 8.49141L13.0667 11.6581C12.7334 11.9914 12.2 11.9914 11.8667 11.6581L7.05005 6.84141C6.71672 6.50807 6.71672 5.97474 7.05005 5.64141L10.225 2.46641C10.8834 1.80807 11.9584 1.80807 12.625 2.46641L16.2417 6.08307C16.9 6.74974 16.9 7.81641 16.2417 8.49141Z" fill="#862FC0" />
                                            <path d="M7.41675 18.125H2.41675C2.07508 18.125 1.79175 17.8417 1.79175 17.5C1.79175 17.1583 2.07508 16.875 2.41675 16.875H7.41675C7.75841 16.875 8.04175 17.1583 8.04175 17.5C8.04175 17.8417 7.75841 18.125 7.41675 18.125Z" fill="#862FC0" />
                                        </svg>
                                        Put on Auction</Link>
                                </div>
                            }
                            {/* {(dataset?.openForBid) && <div className="putonsalebtns">

                                <Link href={`/putonsalemethod?id=${dataset?._id}`} className="bluebtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M19.3833 6.89199L19.1416 4.58366C18.7916 2.06699 17.65 1.04199 15.2083 1.04199H13.2416H12.0083H9.47495H8.24162H6.24162C3.79162 1.04199 2.65829 2.06699 2.29995 4.60866L2.07495 6.90032C1.99162 7.79199 2.23329 8.65866 2.75829 9.33366C3.39162 10.1587 4.36662 10.6253 5.44995 10.6253C6.49995 10.6253 7.50829 10.1003 8.14162 9.25866C8.70829 10.1003 9.67495 10.6253 10.75 10.6253C11.825 10.6253 12.7666 10.1253 13.3416 9.29199C13.9833 10.117 14.975 10.6253 16.0083 10.6253C17.1166 10.6253 18.1166 10.1337 18.7416 9.26699C19.2416 8.60032 19.4666 7.75866 19.3833 6.89199Z" fill="white" />
                                        <path d="M10.2083 13.8829C9.14998 13.9912 8.34998 14.8912 8.34998 15.9579V18.2412C8.34998 18.4662 8.53331 18.6496 8.75831 18.6496H12.7333C12.9583 18.6496 13.1416 18.4662 13.1416 18.2412V16.2496C13.15 14.5079 12.125 13.6829 10.2083 13.8829Z" fill="white" />
                                        <path d="M18.5583 12.0001V14.4834C18.5583 16.7834 16.6916 18.6501 14.3916 18.6501C14.1666 18.6501 13.9833 18.4667 13.9833 18.2417V16.2501C13.9833 15.1834 13.6583 14.3501 13.025 13.7834C12.4666 13.2751 11.7083 13.0251 10.7666 13.0251C10.5583 13.0251 10.35 13.0334 10.125 13.0584C8.64165 13.2084 7.51665 14.4584 7.51665 15.9584V18.2417C7.51665 18.4667 7.33332 18.6501 7.10832 18.6501C4.80832 18.6501 2.94165 16.7834 2.94165 14.4834V12.0167C2.94165 11.4334 3.51665 11.0417 4.05832 11.2334C4.28332 11.3084 4.50832 11.3667 4.74165 11.4001C4.84165 11.4167 4.94998 11.4334 5.04998 11.4334C5.18332 11.4501 5.31665 11.4584 5.44998 11.4584C6.41665 11.4584 7.36665 11.1001 8.11665 10.4834C8.83332 11.1001 9.76665 11.4584 10.75 11.4584C11.7416 11.4584 12.6583 11.1167 13.375 10.5001C14.125 11.1084 15.0583 11.4584 16.0083 11.4584C16.1583 11.4584 16.3083 11.4501 16.45 11.4334C16.55 11.4251 16.6416 11.4167 16.7333 11.4001C16.9916 11.3667 17.225 11.2917 17.4583 11.2167C18 11.0334 18.5583 11.4334 18.5583 12.0001Z" fill="white" />
                                    </svg>
                                    Put on Sale</Link>

                                <Link href={`/putonsalemethod?id=${dataset?._id}`} className="borderbtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M17.8667 15.8667C17.7417 15.9917 17.5834 16.0501 17.4251 16.0501C17.2667 16.0501 17.1084 15.9917 16.9834 15.8667L12.8584 11.7417L13.3001 11.3001L13.7417 10.8584L17.8667 14.9834C18.1084 15.2251 18.1084 15.6251 17.8667 15.8667Z" fill="#862FC0" />
                                        <path d="M6.14172 7.73308L10.975 12.5664C11.3 12.8914 11.3 13.4164 10.975 13.7414L10.225 14.4997C9.55005 15.1664 8.48338 15.1664 7.81672 14.4997L4.20005 10.8831C3.54172 10.2247 3.54172 9.14975 4.20005 8.48308L4.95838 7.72475C5.28338 7.40808 5.81672 7.40808 6.14172 7.73308Z" fill="#862FC0" />
                                        <path d="M16.2417 8.49141L13.0667 11.6581C12.7334 11.9914 12.2 11.9914 11.8667 11.6581L7.05005 6.84141C6.71672 6.50807 6.71672 5.97474 7.05005 5.64141L10.225 2.46641C10.8834 1.80807 11.9584 1.80807 12.625 2.46641L16.2417 6.08307C16.9 6.74974 16.9 7.81641 16.2417 8.49141Z" fill="#862FC0" />
                                        <path d="M7.41675 18.125H2.41675C2.07508 18.125 1.79175 17.8417 1.79175 17.5C1.79175 17.1583 2.07508 16.875 2.41675 16.875H7.41675C7.75841 16.875 8.04175 17.1583 8.04175 17.5C8.04175 17.8417 7.75841 18.125 7.41675 18.125Z" fill="#862FC0" />
                                    </svg>
                                    Put on Auction</Link>
                            </div>
                            } */}
                            {(dataset?.openForBid && account) && <div className="priceandbid">
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Highest Bid</p>
                                    <h6 className="pricebidhead">{bidsData?.[0]?.bidPrice || 0} Core</h6>
                                    <p className="pricebidlowerpara">= ${bidsData?.[0]?.bidPrice || 0} </p>
                                </div>
                                <div className="pricebidinner">
                                    <p className="pricebidpara">Countdown</p>
                                    <CountdownTimer targetDate={dataset?.duration} />
                                </div>
                            </div>}
                            {/* buy now and place a bid flow buttons */}
                            {/* <div className="pricebidbtns">
                                <button onClick={handleShow} className="bluebtn">Buy for 7.3 Core</button>
                                <button className="borderbtn" onClick={handleShow2}>Place a bid</button>
                            </div> */}
                            {/* <button onClick={acceptAuc}>++++++++++++++++++</button> */}
                            {(bidsData?.length > 0 && dataset?.openForBid && account) &&
                                <div className="acceptbidmainbtn">
                                    <button onClick={handleShow} className="bluebtnaccept">
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='judgeimg'>
                                            <g id="vuesax/bold/judge">
                                                <g id="judge">
                                                    <path id="Vector" d="M17.6167 15.8667C17.4917 15.9917 17.3333 16.0501 17.175 16.0501C17.0167 16.0501 16.8583 15.9917 16.7333 15.8667L12.6083 11.7417L13.05 11.3001L13.4917 10.8584L17.6167 14.9834C17.8583 15.2251 17.8583 15.6251 17.6167 15.8667Z" fill="white" />
                                                    <path id="Vector_2" d="M5.89167 7.73308L10.725 12.5664C11.05 12.8914 11.05 13.4164 10.725 13.7414L9.975 14.4997C9.3 15.1664 8.23333 15.1664 7.56667 14.4997L3.95 10.8831C3.29167 10.2247 3.29167 9.14975 3.95 8.48308L4.70833 7.72475C5.03333 7.40808 5.56667 7.40808 5.89167 7.73308Z" fill="white" />
                                                    <path id="Vector_3" d="M15.9917 8.49141L12.8167 11.6581C12.4833 11.9914 11.95 11.9914 11.6167 11.6581L6.8 6.84141C6.46667 6.50807 6.46667 5.97474 6.8 5.64141L9.975 2.46641C10.6333 1.80807 11.7083 1.80807 12.375 2.46641L15.9917 6.08307C16.65 6.74974 16.65 7.81641 15.9917 8.49141Z" fill="white" />
                                                    <path id="Vector_4" d="M7.16667 18.125H2.16667C1.825 18.125 1.54167 17.8417 1.54167 17.5C1.54167 17.1583 1.825 16.875 2.16667 16.875H7.16667C7.50833 16.875 7.79167 17.1583 7.79167 17.5C7.79167 17.8417 7.50833 18.125 7.16667 18.125Z" fill="white" />
                                                </g>
                                            </g>
                                        </svg>

                                        Accept bid
                                    </button>
                                </div>
                            }
                        </div>

                    </div>
                    <div className="nftdetaillower">
                        <div>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Overview</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="link-2">Properties</Nav.Link>
                                </Nav.Item> */}
                                {dataset?.openForBid &&
                                    (
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3">Bids</Nav.Link>
                                        </Nav.Item>
                                    )
                                }
                                {dataset3?.length > 0 &&
                                <Nav.Item>
                                    <Nav.Link eventKey="link-4">Activity</Nav.Link>
                                </Nav.Item>
                                }
                                <Nav.Item>
                                    <Nav.Link eventKey="link-5">Offers</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {activeTab === 'link-1' && (
                                <>
                                    <div className="nftdetailtabone">
                                        <div className="descriptionmain">
                                            <h6 className="descriptionhead">
                                                Description
                                            </h6>
                                            <p className="descriptionpara">{dataset?.launchpad[0]?.name}.</p>
                                            {/* <p className="descriptionpara">Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit [azuki.com](https://azuki.com) for more details.</p>
                                            <p className="descriptionpara">We rise together. We build together. We grow together.</p> */}
                                        </div>
                                        {/* <div className="royalitytabmain">
                                            <div className="royalitytabhead">
                                                <h5 className="royalitytabheadtext">Royalties</h5>
                                                <span className="royalitytabpercent">5%</span>
                                            </div>
                                            <p className="royalitytabpara">Split royalties are automatically deposited into each recipient&apos;s wallet</p>
                                        </div> */}
                                        <div className="detailtabinner">
                                            <h6 className="detailtabhead">
                                                Details
                                            </h6>
                                            <div className="detailtabdata">
                                                <img src="\assets\launchpaddetailassets\clogo.svg" alt="detailtabimg" className="detailtabimg" />
                                                <p className="detailtabdatapara">Core Network</p>
                                            </div>
                                            <div className="detailtabdata">
                                                <img src="\assets\launchpaddetailassets\clogo.svg" alt="detailtabimg" className="detailtabimg" />
                                                <Link target='_blank' href={`https://scan.coredao.org/address/${dataset?.collectionAddress}`}> <p className="detailtabdatapara">View on Core Scan</p></Link>
                                            </div>
                                            {/* <div className="detailtabdata">
                                                <img src="\assets\nftdetailassets\eye.svg" alt="detailtabimg" className="detailtabimg" />
                                                <p className="detailtabdatapara">Open original</p>
                                            </div> */}
                                            {/* <div className="detailtabrefresh">
                                                <img src="\assets\nftdetailassets\refresh.svg" alt="refreshimg" className="refreshimg" />
                                                <p className="refreshpara">Refresh Metadata</p>
                                            </div> */}
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-2' && (
                                <>
                                    <div className="nftdetailtabtwo">
                                        <div className="rankmaintext">
                                            <h6 className="rankmainhead">Rank</h6>
                                            <span className="ranknumber">2,163 / 10,000</span>
                                        </div>
                                        <div className="ranktable">
                                            <div className="ranktablehead">
                                                <p className="rankinnerhead">Name</p>
                                                <p className="rankinnerhead">Rarity</p>
                                            </div>
                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Hair</p>
                                                    <h6 className="rankhead">Magenta Messy</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Clothing</p>
                                                    <h6 className="rankhead">Red Kimono</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Neck</p>
                                                    <h6 className="rankhead">Chain</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Mouth</p>
                                                    <h6 className="rankhead">Not Bad</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Eyes</p>
                                                    <h6 className="rankhead">Suspicious</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Background</p>
                                                    <h6 className="rankhead">Off White A</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Headgear</p>
                                                    <h6 className="rankhead">Full Bandana</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>

                                            <div className="ranktablerow">
                                                <div className="ranktabletexts">
                                                    <p className="rankpara">Type</p>
                                                    <h6 className="rankhead">Red</h6>
                                                </div>
                                                <p className="rankmainpara">0.9%</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-3' && (
                                <>
                                    <div className="nftdetailtabthree">
                                        {bidsData?.map((item, id) => {
                                            return (
                                                <div key={id} className="bidrow">
                                                    <div className="bidrowleft">
                                                        <div className="bidimg">
                                                            <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                        </div>
                                                        <div className="bidtexts">
                                                            <h6 className="bidtexthead">Bid By: <span className='bidtextpara text-light'>{truncateWalletAddress(item?.biderAddress)}</span> </h6>
                                                            <p className="bidtextpara">{moment(item?.createdAt).fromNow()} <span className="bluetext">Floor bid</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="bidrowright">
                                                        <h6 className="bidrighthead">{item?.bidPrice} Core</h6>
                                                        <p className="bidrightpara">${item?.bidPrice}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </>
                            )}
                            {activeTab === 'link-4' && (
                                <>
                                    <div className="nftdetailtabfour">
                                        <div className="activitymain">
                                            {dataset3?.map((card, index) => {
                                                return (
                                                    <div key={index}>
                                                        {card?.type === 'list' ?
                                                            (
                                                                <div className="activityrow mt-3 mb-3">
                                                                    <div className="activityrowleft">
                                                                        <div className="activityimg">
                                                                            <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                                        </div>
                                                                        <div className="activitytexts">
                                                                            <h6 className="activitytexthead"> {card?.from?.slice(0, 8)}...
                                                                                {card?.from?.slice(
                                                                                    card?.from?.length - 6,
                                                                                    card?.from?.length
                                                                                )} <span className="darktext">listed for</span></h6>
                                                                            <p className="activitytextpara">{moment(card?.createdAt).fromNow()}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="activityrowright">
                                                                        <h6 className="activityrighthead">{card?.price} Core</h6>
                                                                        {/* <p className="activityrightpara">$16,298</p> */}
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            card?.type === 'bid' ?
                                                                (
                                                                    ""
                                                                )
                                                                :
                                                                (
                                                                    <div className="activityrow mt-3 mb-3">
                                                                        <div className="activityrowleft">
                                                                            <div className="activityimg">
                                                                                <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                                            </div>
                                                                            <div className="activitytexts">
                                                                                <h6 className="activitytexthead">{card?.from?.slice(0, 8)}...
                                                                                    {card?.from?.slice(
                                                                                        card?.from?.length - 6,
                                                                                        card?.from?.length
                                                                                    )} <span className="darktext">transferred to</span> {card?.to?.slice(0, 8)}...
                                                                                    {card?.to?.slice(
                                                                                        card?.to?.length - 6,
                                                                                        card?.to?.length
                                                                                    )}</h6>
                                                                                <p className="activitytextpara">{moment(card?.createdAt).fromNow()}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }
                                                    </div>
                                                )
                                            })}


                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-5' && (
                                <>
                                    <div className="nftdetailtabthree">
                                        {dataset5?.map((item, index) => {
                                            return (
                                                <div key={index} className="bidrow">
                                                    <div className="bidrowleft">
                                                        <div className="bidimg">
                                                            <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                        </div>
                                                        <div className="bidtexts">
                                                            <h6 className="bidtexthead">Offer By: <span className='bidtextpara text-light'>{truncateWalletAddress(item?.offerAddress)}</span> </h6>
                                                            <p className="bidtextpara">{moment(item?.createdAt).fromNow()} </p>
                                                        </div>
                                                    </div>
                                                    <div className="bidrowright">
                                                        <h6 className="bidrighthead">{item?.offerPrice} WCore</h6>
                                                        <button onClick={() => { handleShow5(); itemoffer(item, index) }} className="ssdasdasfsdfdsf">Accept Offer</button>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </>
                            )}
                        </div>
                        <div></div>
                    </div>
                </div>
            </section>
            <Footer />
            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src={'https://dweb.link/ipfs' + dataset?.nft} alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to Accept a bid for <span className="whitetext">{dataset?.launchpad[0]?.name}</span> from <span className="whitetext">{dataset?.launchpad[0]?.name}.</span></p>
                    <div className="buyitemmain">
                        <h6 className="buyitemhead">Bid offered</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">{bidsData?.[0]?.bidPrice || 0}</h6>
                            <p className="buyitemrightpara">Core</p>
                        </div>
                    </div>
                    {/* <div className="buydatamain">
                        <div className="buydata">
                            <p className="buydataleft">Service fee</p>
                            <h6 className="buydataright">0.025 Core</h6>
                        </div>
                        <div className="buydata">
                            <p className="buydataleft">Total Bid amount</p>
                            <h6 className="buydataright">3.225 Core</h6>
                        </div>
                    </div> */}
                    <div className="buymodalbtns">
                        <button className="borderbtn" onClick={handleClose}>Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            // acceptAuc()
                            acceptBid()
                            // handleClose();
                            // handleShow3();
                        }}>Accept Bid</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show3} onHide={handleClose3} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">Waiting for blockchain confirmation...</h6>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show4} onHide={handleClose4} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your transaction succeded!</p>
                    <button onClick={handleClose4} className="bluebtn">Ok</button>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show5} onHide={handleClose5} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src={'https://dweb.link/ipfs' + dataset?.nft} alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to Accept a Offer for <span className="whitetext">{dataset?.launchpad[0]?.name}</span> from <span className="whitetext">{dataset?.launchpad[0]?.name}.</span></p>
                    <div className="buyitemmain">
                        <h6 className="buyitemhead">Price offered</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">{offerprice || 0}</h6>
                            <p className="buyitemrightpara">WCore</p>
                        </div>
                    </div>
                    {/* <div className="buydatamain">
                        <div className="buydata">
                            <p className="buydataleft">Service fee</p>
                            <h6 className="buydataright">0.025 Core</h6>
                        </div>
                        <div className="buydata">
                            <p className="buydataleft">Total Bid amount</p>
                            <h6 className="buydataright">3.225 Core</h6>
                        </div>
                    </div> */}
                    <div className="buymodalbtns">
                        <button className="borderbtn" onClick={handleClose5}>Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            // acceptAuc()
                            acceptoffernew()
                            // handleClose();
                            // handleShow3();
                        }}>Accept Offer</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show6} onHide={handleClose6} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">Waiting for blockchain confirmation...</h6>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show7} onHide={handleClose7} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your transaction succeded!</p>
                    <button onClick={handleClose7} className="bluebtn">Ookay’s</button>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Putonsale