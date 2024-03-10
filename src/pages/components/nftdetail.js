import React, { useEffect, useState } from 'react'
import { Dropdown, Modal, Nav } from 'react-bootstrap'
import Navbar from './navbar';
import Footer from './footer';
import MoreCollection from './morecollection';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import { dataSlice } from 'ethers';
import BuyTokens from '@/hooks/buy';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import moment from "moment";
import CountdownTimer from './auctiontimer';
import useWeb3 from '@/hooks/useWeb3';
import Router, { useRouter } from 'next/router';
import BidTokens from '@/hooks/bid';
import MakeOffer from '@/hooks/makeoffer';
import Loader from '@/hooks/loader';
import GetBalance from '@/hooks/getBalance';
import CoreAllowance from '@/hooks/allowence';
import ApproveAllow from '@/hooks/approvedAllowence';
import { getWcoreTokenContract } from '@/utils/contractHelpers';
// import Loader from '@/hooks/loader';
// import { parse } from 'next/dist/build/swc';
import Link from 'next/link';

const Nftdetail = () => {
    let { account } = useWeb3React();
    var router = useRouter();
    // var accounts = account?.toLowerCase()
    const web3 = useWeb3();
    const [balance, seBalance] = useState(0)
    const [corevalue, setcorevalue] = useState(0)
    const [activeTab, setActiveTab] = useState('link-1');
    const [idnft, setidnft] = useState();
    const [dataset, setdataset] = useState();
    const [likestatus, setLikesStatus] = useState();
    const [dataset2, setdataset2] = useState();
    const [dataset3, setdataset3] = useState();
    const [dataset4, setdataset4] = useState();
    const [dataset5, setdataset5] = useState();
    const [allowance, setAllowance] = useState(0);
    const [balanceOf, setBalanceOf] = useState(0);
    const [highestbid, sethighestbid] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isliked, setisLiked] = useState();
    const [loader, setLoader] = useState(false)
    const api_url = Environment.api_url;
    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };
    const { ApproveTokenAllow } = ApproveAllow();
    // const { GetBal } = GetBalance();
    const { AllowanceCore } = CoreAllowance();
    const { Buy } = BuyTokens();
    const { Bid } = BidTokens();
    const { Offers } = MakeOffer();
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

    const walletAddress1 = '0x228c1ed4521c55684584714255415584125541524152552145215451';
    const walletAddress2 = '0x3a4b1ed8569c9e1fda3e7a1425518a63482a41524152552145215789';

    const [show, setShow] = useState(false);

    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);

    const handleClose5 = () => {
        setShow5(false);
        setcorevalue(0)
    }
    const handleClose6 = () => setShow6(false);
    const handleClose7 = () => setShow7(false);

    const handleShow5 = () => setShow5(true);
    const handleShow6 = () => setShow6(true);
    const handleShow7 = () => setShow7(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => {
        setcorevalue(0);
        setShow2(false);
    }
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);

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

    const [timeshow, setTimeshow] = useState(false);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);

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
    const getNftDetails = async (id) => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idnft}/details`,
            ...(tok && {
                headers: {
                    authorization: `Bearer ` + tok
                },
            })

        }

        axios(config)
            .then(function (response) {
                setdataset(response?.data?.data?.nft?.[0])
                setLikesStatus(response.data.data.likes)
                setisLiked(response?.data?.data?.nft?.[0]?.reaction?.[0]?.isLiked)
                // console.log(response?.data?.data?.nft?.[0]?.reaction?.[0]?.isLiked, 'swd3ed3e');
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
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        // console.log(id);
        setidnft(id)

    }, [])

    useEffect(() => {
        // console.log(id);
        getNftDetails()

    }, [idnft])
    const buynow = () => {
        setLoader(true)
        let tok = localStorage.getItem("accessToken");
        const config = {
            method: 'patch',
            url: `${api_url}/nfts/${idnft}/buy`,
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                handleClose();
                handleShow1();
                toast.success("Nft Purchased successfully")
                getNftDetails(idnft)
                getNftActivityDetails()
                setLoader(false)
                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                setLoader(false)
                // if (error.response && error.response.data && error.response.data.message) {
                //     const errorMessage = error.response.data.message;
                //     toast.error(errorMessage);
                // } else {
                //     console.log(error.message, "ssssss");
                //     toast.error("An error occurred.");
                // }
            });
    };
    async function completebuy() {
        // console.log(dataset?.launchpad[0]?.platformFee);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        let fee = (dataset?.price + ((dataset?.launchpad[0]?.platformFee || 0) / 100 * dataset?.price)).toFixed(6)
        // console.log("buy", fee)
        try {
            setLoader(true)
            let res = await Buy(dataset?.collectionAddress, dataset?.tokenID, fee)
            // console.log(res);
            if (res) {
                buynow()
            }
            // let res = 
        } catch (error) {
            console.log("error metamask here", error)
            setLoader(false)
            // console.log("value",error)
        }
    }
    const getCollectionItemsDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/launchpads/${dataset?.launchpadId}/items?offset=1&limit=6`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset2(response?.data?.data?.collectionsItems)
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
    useEffect(() => {
        getCollectionItemsDetails()
    }, [dataset?.launchpadId])


    const getNftActivityDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idnft}/activities?limit=10&orderField=createdAt&orderDirection=-1`,
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
    useEffect(() => {
        getNftActivityDetails()
        var val = window.location.href;
        setlinkuser(val)
        setlinktext('NFT Detail Here TokenID = #' + dataset?.tokenID)
    }, [idnft, account])

    // console.log("dataset", account)
    // 
    const [linkUser, setlinkuser] = useState();
    const [linkText, setlinktext] = useState();

    const twiterPost = async () => {
        console.log("asdasdas")
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(linkUser)}&text=${encodeURIComponent(linkText)}`;
        window.open(tweetUrl, '_blank');
        // clickApi('copyTwitter')
    }

    const LikeNft = (id) => {
        if (account) {
            let val = localStorage.getItem("accessToken");
            var config = {
                method: 'patch',
                url: `${api_url}/nfts/${id}/like`,
                headers: {
                    Authorization: "Bearer " + val,
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
                .then(function (response) {
                    setLiked(true);
                    setLikes(1);
                })
                .catch(function (error) {
                    setLiked(false);
                    console.error("Error liking NFT:", error);
                    if (error && error.response) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("An error occurred");
                    }
                });
        } else {
            toast.error("Please connect your wallet")
        }
    };


    const UnLikeNft = (id) => {
        if (account) {
            let val = localStorage.getItem("accessToken");
            setLiked(false);
            if (likes === 1) {
                setLikes(0);
            } else {
                setLikes(-1);
            }
            setLiked(false);
            var config = {
                method: 'delete',
                url: `${api_url}/nfts/${id}/dislike`,
                headers: {
                    Authorization: "Bearer " + val,
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
                .then(function (response) {
                })
                .catch(function (error) {
                    setLiked(true);
                    setLikes(1);
                    console.log(error);
                });
        } else {
            toast.error("Please connect your wallet")
        }
    }
    const handleClick = (id) => {

        if (idnft) {
            if (!heart) {
                UnLikeNft(idnft);
            } else {
                LikeNft(idnft);
            }
            setHeart(!heart);
        }
    };

    // const checkBalance = async () => {
    //     try {
    //         if (account) {
    //             console.log();
    //             let response = await web3.eth.getBalance(account);
    //             if (response) {
    //                 // console.log("Balance:", response);
    //                 seBalance((response?.toString() / 1e18).toFixed(3));
    //             }
    //         }
    //     } catch (err) {
    //         console.error("Error checking balance:", err);
    //     }
    // };

    async function getCoreBalance() {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Connect to the Ethereum network through MetaMask
          // const web3 = new Web3(window.ethereum);
          try {
            // Request account access from the user
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the user's Ethereum address
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
            
            // Query the balance of the user's address
            const balance = await web3.eth.getBalance(userAddress);
            
            // Convert the balance from Wei to Ether
            // const coreBalance = web3.utils.fromWei(balance, 'ether');
            seBalance((balance?.toString() / 1e18).toFixed(3));
            // Display the core balance on your website
            // console.log(`Core Balance: ${balance} ETH`);
            // return coreBalance;
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        } else {
          // MetaMask is not installed
          console.error('MetaMask is not installed');
        }
      }

    const getBalance = async () => {
        // let result = await GetBal(account);
        const tokenAddress = Environment?.wcoretoken;
        const contract = getWcoreTokenContract(tokenAddress, web3);
        const approved = await contract.methods.balanceOf(account).call();
        let balance = parseFloat(approved) / 1000000000000000000

        // let result2 = await GetHolder()
        // console.log("resulttvl", result)
        setBalanceOf(balance);
    };

    // console.log("+++++++++++++++++++",balanceOf)


    const AllowenceCheck = async () => {
        try {
            // setMainLoader(true);
            const contractAddress = Environment?.wcoretoken;
            const contract = getWcoreTokenContract(contractAddress, web3);
            const balance = await contract.methods.allowance(account, Environment?.marketPlaceContract).call()
            let bal = web3.utils.fromWei(balance, "ether")
            // let result = await AllowanceCore(account);
            // console.log("resulttvl", result)

            setAllowance(bal);
            // setMainLoader(false);
        } catch {
            // setMainLoader(false);
        }
    };

    useEffect(() => {
        if (account && web3) {
            getBalance();
            AllowenceCheck();
        }
    }, [account, web3]);

    const BidsHighest = async () => {
        // let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idnft}/bids`,
            // headers: {
            //     authorization: `Bearer ` + tok
            // },
        }

        axios(config)
            .then(function (response) {
                // console.log("sdsdsd++++++++++", response.data?.data[0]?.bidPrice)
                setdataset4(response?.data?.data)
                sethighestbid(response?.data?.data[0]?.bidPrice)
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

    const OfferNft = async () => {
        // let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${idnft}/offers`,
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
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    };
    // console.log("dataset", dataset4[0]?.biderAddress)

    useEffect(() => {
        BidsHighest();
    }, [idnft, account]);

    useEffect(() => {
        OfferNft();
    }, [idnft, account]);

    useEffect(() => {
        if (account) {
            getCoreBalance();
        }
    }, [account, balance, web3]);
    // console.log("sdsdsdsds", balance)
    const putBid = () => {
        let bidprice = (parseFloat(corevalue) + ((dataset?.launchpad[0]?.platformFee || 0)/ 100 * parseFloat(corevalue))).toFixed(6)
        let tok = localStorage.getItem("accessToken");
        const config = {
            method: 'post',
            url: `${api_url}/nfts/bid`,
            data: {
                nft: dataset?.nft,
                launchpadId: dataset?.launchpadId,
                creatorId: dataset?.creatorId,
                nftId: dataset?._id,
                collectionAddress: dataset?.collectionAddress,
                tokenID: dataset?.tokenID,
                bidPrice: bidprice,
            },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                // setLoader(false)
                toast.success("Place Bid successfully")
                setShow3(false);
                setShow4(true);
                BidsHighest();
                // router.push(`/putonsale?id=${Id}`)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                // setLoader(false)
                setShow3(false);
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };

    // useEffect(() => {
    // var bidvalue = highestbid
    // console.log("bidvalue", bidvalue)
    // }, [dataset4]);


    // async function completeListing2() {
    //     // console.log("adasdasdasd", bidvalue)
    //     handleClose2();
    //     handleShow3();
    //     let fee = (parseFloat(corevalue) + (dataset?.launchpad[0]?.platformFee / 100 * parseFloat(corevalue))).toFixed(6)

    //     if (fee > 0) {
    //         if (fee < parseFloat(balance)) {
    //             // console.log("asdasd",typeof fee,  typeof highestbid)
    //             if (parseFloat(fee) > parseFloat(highestbid)) {
    //                 try {
    //                     let res = await Bid(dataset?.collectionAddress, dataset?.tokenID, fee)
    //                     // console.log(res);
    //                     if (res) {
    //                         // putOnAuction();
    //                         putBid();
    //                     }
    //                 } catch (error) {
    //                     console.error(error);
    //                     // setLoader(false);
    //                 }
    //             }
    //             else {
    //                 toast.error("Entered price must be greator then hightest bid price")
    //             }
    //         }
    //         else {
    //             toast.error("Entered price greator from your wallet balance")
    //         }
    //     }
    //     else {
    //         toast.error("Value must be greater then zero")
    //     }
    // }
    async function completeListing2() {


        const fee = parseFloat(corevalue) + ((dataset?.launchpad?.[0]?.platformFee || 0) / 100 * parseFloat(corevalue));
        const fee2 = parseFloat(dataset?.price) + ((dataset?.launchpad?.[0]?.platformFee || 0) / 100 * parseFloat(dataset?.price));
        // console.log(fee);
        // console.log(fee2);
        // console.log(corevalue);
        // console.log(parseFloat(corevalue) <= parseFloat(dataset?.price));

        if (isNaN(fee) || fee <= 0) {
            toast.error("Value must be greater than zero");
            return;
        }

        if (fee >= parseFloat(balance)) {
            toast.error("Entered price or total paying balance greater than your wallet balance");
            return;
        }

        if (parseFloat(fee) <= parseFloat(highestbid)) {
            toast.error(`Entered price must be greater than the highest bid price ${parseFloat(highestbid || 0)?.toFixed(6)}`);
            return;
        }
        if (parseFloat(fee) <= parseFloat(fee2)) {
            toast.error(`Entered price must be greater than the nft price + platform Fee`);
            return;
        }
        try {
            handleClose2();
            handleShow3();
            const res = await Bid(dataset?.collectionAddress, dataset?.tokenID, fee.toFixed(6));
            if (res) {
                putBid();
            }
        } catch (error) {
            console.error(error);
            // Handle error
            setShow3(false);


        }
    }

    const Makeofferuser = () => {
        let offerprice = (parseFloat(corevalue) + ((dataset?.launchpad[0]?.platformFee || 0) / 100 * parseFloat(corevalue))).toFixed(6)
        let tok = localStorage.getItem("accessToken");
        const config = {
            method: 'post',
            url: `${api_url}/nfts/${dataset?._id}/offers`,
            data: {
                offerPrice: offerprice,
            },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                // setLoader(false)
                toast.success("offer send successfully")
                setShow6(false);
                setcorevalue(0)
                setShow7(true);
                OfferNft();
                // router.push(`/putonsale?id=${Id}`)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                // setLoader(false)
                setShow3(false);
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };

    // async function MakeOffers() {

    //     // const fee = parseFloat(corevalue) + (dataset?.launchpad?.[0]?.platformFee / 100 * parseFloat(corevalue));

    //     // try {
    //     //     // handleClose2();
    //     //     // handleShow3();
    //     //     const res = await Offers(dataset?.collectionAddress, dataset?.tokenID, fee.toFixed(6));
    //     //     if (res) {
    //     //         Makeofferuser();
    //     //     }
    //     // } catch (error) {
    //     //     console.error(error);
    //     //     // Handle error
    //     //     setShow3(false);


    //     // }
    // }

    const MakeOffers = async () => {
        if (account) {
            try {

                const fee = parseFloat(corevalue) + ((dataset?.launchpad?.[0]?.platformFee || 0) / 100 * parseFloat(corevalue));
                console.log(fee);
                if (corevalue <= '' || corevalue === undefined || parseFloat(corevalue) <= 0) {
                    toast.error('Please enter wrap core value ', {
                        position: 'top-center',
                        autoClose: 5000,
                    });
                }
                else if (parseFloat(fee) > parseFloat(balanceOf)) {
                    toast.error('Entered price or total paying balance must be smaller then your Wrap Core balance', {
                        position: 'top-center',
                        autoClose: 5000,
                    });
                }
                else if (parseFloat(allowance) >= parseFloat(corevalue) === true) {
                    setShow5(false);
                    setShow6(true);
                    try {
                        // handleClose2();
                        // handleShow3();
                        const res = await Offers(dataset?.collectionAddress, dataset?.tokenID, fee.toFixed(6));
                        if (res) {
                            Makeofferuser();
                        }
                    } catch (error) {
                        console.error(error);
                        // Handle error
                        setShow6(false);
                    }
                }
                else {
                    if (account) {
                        toast.warning('Please Approve Your Coins First', {
                            position: 'top-center',
                            autoClose: 4000,
                        });
                        if (parseFloat(balanceOf) > 0) {
                            setShow5(false);
                            setShow6(true);
                            // setMainLoader(true);
                            let result = await ApproveTokenAllow(account);
                            // setApprov(result);
                            if (result) {
                                toast.success('Coins Approved Successfully', {
                                    position: 'top-center',
                                    autoClose: 4000,
                                });
                                let responce = AllowenceCheck()
                                // setMainLoader(true);
                                if (responce) {

                                    const fee = parseFloat(corevalue) + ((dataset?.launchpad?.[0]?.platformFee || 0) / 100 * parseFloat(corevalue));
                                    try {
                                        // handleClose2();
                                        // handleShow3();
                                        const res = await Offers(dataset?.collectionAddress, dataset?.tokenID, fee.toFixed(6));
                                        if (res) {
                                            Makeofferuser();
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        // Handle error
                                        setShow6(false);
                                    }
                                }
                            }
                        } else {
                            toast.error('Wrap core balance must be greater then 0', {
                                position: 'top-center',
                                autoClose: 5000,
                            });
                        }
                    }
                    else {
                        toast.error('Please connect your wallet first to approve', {
                            position: 'top-center',
                            autoClose: 5000,
                        });
                    }
                }
            } catch {
                // setMainLoader(false);
            }
        } else {
            toast.error('Please Connect Your Wallet First', {
                position: 'top-center',
                autoClose: 5000,
            })

        };
    }

    // console.log("balcmce", balanceOf)
    // console.log("allowence", allowance)


    useEffect(() => {
        if (dataset && dataset.currentOwner?.[0]?.walletAddress === account?.toLowerCase()) {
            router.push(`/putonsale?id=${dataset._id}`);
        }
    }, [account, dataset, router]);



    // console.log("highest bid", dataset4[0]?.bidPrice)

    return (
        <>
            {loader && <Loader />}
            <Navbar />
            <section className="nftdetailmain">
                <div className="custom-container">
                    <div className="nftdetailupper">
                        <div className="nftimagemain">
                            <img src={dataset?.nft || '/assets/profile.png'} alt="nftimginner" className="nftimginner" />
                        </div>
                        <div className="nftdetails">
                            <div className="nftownerdetail">
                                <div className="nftownerimage">
                                    <img src={dataset?.launchpad[0]?.imageUrl || '/assets/profile.png'} alt="nftownerinnerimage" className="nftownerinnerimage" />
                                </div>
                                <h6 className="nftownername">{dataset?.launchpad[0]?.name}</h6>
                                <img src="\assets\nftdetailassets\verify.svg" alt="verifiedimage" className="verifiedimage" />
                            </div>
                            <h5 className="nftname">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</h5>
                            <div className="royalitymain">
                                <h6 className="royalitypara">Royalties</h6>
                                <span className="royalitypercentage">5%</span>
                            </div>
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
                                    <div onClick={account ? handleClick : null} className="likemain">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={heart ? 'lineimg' : 'fillimg'} cursor="pointer">
                                            <path d="M12 21.6496C11.69 21.6496 11.39 21.6096 11.14 21.5196C7.32 20.2096 1.25 15.5596 1.25 8.68961C1.25 5.18961 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00961 12 4.18961C13.17 3.00961 14.75 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.19961 22.75 8.68961C22.75 15.5696 16.68 20.2096 12.86 21.5196C12.61 21.6096 12.31 21.6496 12 21.6496ZM7.56 3.84961C4.91 3.84961 2.75 6.01961 2.75 8.68961C2.75 15.5196 9.32 19.3196 11.63 20.1096C11.81 20.1696 12.2 20.1696 12.38 20.1096C14.68 19.3196 21.26 15.5296 21.26 8.68961C21.26 6.01961 19.1 3.84961 16.45 3.84961C14.93 3.84961 13.52 4.55961 12.61 5.78961C12.33 6.16961 11.69 6.16961 11.41 5.78961C10.48 4.54961 9.08 3.84961 7.56 3.84961Z" fill="#745F8C" />

                                        </svg>
                                        <p className="likepara"> {likestatus + likes}</p>
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

                            {
                                account &&
                                (
                                    <div className="priceandbid">
                                        {dataset?.isFixedPrice &&
                                            (
                                                <div className="pricebidinner">
                                                    <p className="pricebidpara">Price</p>
                                                    <h6 className="pricebidhead">{dataset?.price} Core</h6>
                                                    <p className="pricebidlowerpara">${(dataset?.price * 1.5).toFixed(6)}</p>
                                                </div>
                                            )
                                        }
                                        {dataset?.openForBid && highestbid &&
                                            (
                                                <div className="pricebidinner">
                                                    <p className="pricebidpara">Highest <span className="bluetext">Floor bid</span></p>
                                                    <h6 className="pricebidhead">{highestbid} Core</h6>
                                                    <p className="pricebidlowerpara">by <span className="whitetext">
                                                        {dataset4[0]?.biderAddress?.slice(0, 8)}...
                                                        {dataset4[0]?.biderAddress?.slice(
                                                            dataset4[0]?.biderAddress?.length - 6,
                                                            dataset4[0]?.biderAddress?.length
                                                        )}
                                                    </span></p>
                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            }

                            {
                                account &&
                                (
                                    <div className="priceandbid">
                                        {dataset?.openForBid === false && dataset?.isFixedPrice === false &&
                                            (
                                                <div className="pricebidinner">
                                                    <p className="pricebidpara">Price</p>
                                                    <h6 className="pricebidhead">{dataset?.price} Core</h6>
                                                    <p className="pricebidlowerpara">${(dataset?.price * 1.5).toFixed(6)}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }


                            {
                                dataset?.isFixedPrice && account &&
                                (
                                    <>
                                        <div className='divdivss'>
                                            <div className="pricebidbtns">

                                                <button onClick={handleShow} className="bluebtn uyyuyuy">Buy for {dataset?.price} Core</button>

                                                {/* <button className="borderbtn" onClick={handleShow2}>Place a bid</button> */}
                                            </div>
                                            <div className="pricebidbtns">

                                                <button onClick={handleShow5} className="bluebtn ioioiio">Make An Offer</button>

                                                {/* <button className="borderbtn" onClick={handleShow2}>Place a bid</button> */}
                                            </div>
                                        </div>

                                    </>

                                )
                            }


                            {
                                account && dataset?.openForBid === true &&
                                (
                                    <>
                                        <div className='divdivss'>
                                            <div className="pricebidbtns">
                                                {/* <button onClick={handleShow} className="bluebtn">Put on Sale</button> */}
                                                <button className="borderbtn uyyuyuy" onClick={handleShow2}>Place a bid</button>
                                            </div>
                                            <div className="pricebidbtns">
                                                {/* <button onClick={handleShow} className="bluebtn">Put on Sale</button> */}
                                                <button className="borderbtn ioioiio" onClick={handleShow5}>Make An Offer</button>
                                            </div>
                                        </div>
                                    </>
                                )}

                            {
                                account && dataset?.openForBid === false && dataset?.isFixedPrice === false &&
                                (
                                    <>
                                        <div className="pricebidbtns">
                                            {/* <button onClick={handleShow} className="bluebtn">Put on Sale</button> */}
                                            <button className="bluebtn " onClick={handleShow5}>Make An Offer</button>
                                        </div>
                                    </>
                                )}


                            {dataset?.openForBid === true &&
                                (
                                    <p className="lastpara"><span>Sale ends in:</span><span className='timermain'>
                                        {/* <CountdownTimer endDate={dataset?.duration} /> */}
                                        {/* <span className="innertimertext"> */}
                                        <CountdownTimer endDate={dataset?.duration} />
                                        {/* </span> */}

                                    </span></p>
                                )
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
                                {dataset?.openForBid === true &&
                                    (
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3">Bids</Nav.Link>
                                        </Nav.Item>
                                    )

                                }
                                <Nav.Item>
                                    <Nav.Link eventKey="link-4">Activity</Nav.Link>
                                </Nav.Item>
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
                                            <p className="descriptionpara">{dataset?.launchpad?.[0]?.description}</p>
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
                                                <Link target='_blank' href={`https://scan.test.btcs.network/address/${dataset?.collectionAddress}`}> <p className="detailtabdatapara">View on Core Scan</p></Link>
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
                                        {dataset4?.map((item, id) => {
                                            return (
                                                <div  className="bidrow">
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
                                                                <div className="activityrow mb-3 mt-3">
                                                                    <div className="activityrowleft">
                                                                        <div className="activityimg">
                                                                            <img src="\assets\nftdetailassets\bidimg.png" alt="activityinnerimg" className="activityinnerimg" />
                                                                        </div>
                                                                        <div className="activitytexts">
                                                                            <h6 className="activitytexthead">
                                                                                {card?.from?.slice(0, 8)}...
                                                                                {card?.from?.slice(
                                                                                    card?.from?.length - 6,
                                                                                    card?.from?.length
                                                                                )}
                                                                                <span className="sdfdsfdsfdsfsd darktext">listed for</span></h6>
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
                                                                                <h6 className="activitytexthead">  {card?.from?.slice(0, 8)}...
                                                                                    {card?.from?.slice(
                                                                                        card?.from?.length - 6,
                                                                                        card?.from?.length
                                                                                    )} <span className="darktext">transferred to</span>   {card?.to?.slice(0, 8)}...
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
                                        {dataset5?.map((item, id) => {
                                            return (
                                                <div key={id} className="bidrow">
                                                    <div className="bidrowleft">
                                                        <div className="bidimg">
                                                            <img src="\assets\nftdetailassets\bidimg.png" alt="bidinnerimg" className="bidinnerimg" />
                                                        </div>
                                                        <div className="bidtexts">
                                                            <h6 className="bidtexthead">Offer By: <span className='bidtextpara text-light'>{truncateWalletAddress(item?.offerAddress)}</span> </h6>
                                                            <p className="bidtextpara">{moment(item?.createdAt).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="bidrowright">
                                                        <h6 className="bidrighthead">{item?.offerPrice} Core</h6>
                                                        <p className="bidrightpara">${item?.offerPrice}</p>
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
                    <section className="more-collection">
                        <h6 className="main-heading">
                            More from this collection
                        </h6>
                        <MoreCollection dataset2={dataset2} />
                    </section>
                </div>
            </section>
            <Footer />


            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src={dataset?.nft} alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to buy <span className="whitetext">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</span> from <span className="whitetext">{dataset?.launchpad[0]?.name}.</span></p>
                    <div className="buyitemmain">
                        <h6 className="buyitemhead">Item Price</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            <h6 className="buyitemright">{dataset?.price}</h6>
                            <p className="buyitemrightpara">Core</p>
                        </div>
                    </div>
                    <div className="buydatamain">
                        <div className="buydata">
                            <p className="buydataleft">Service fee</p>
                            <h6 className="buydataright">{!isNaN((dataset?.launchpad[0]?.platformFee || 0)) ?
                                (((dataset?.launchpad[0]?.platformFee || 0 )/ 100) * dataset?.price).toFixed(6) : '0'} Core</h6>
                        </div>
                        <div className="buydata">
                            <p className="buydataleft">Total Amount</p>
                            <h6 className="buydataright">{!isNaN((dataset?.launchpad[0]?.platformFee || 0)) ?
                                (dataset?.price + ((dataset?.launchpad[0]?.platformFee || 0 )/ 100 * dataset?.price)).toFixed(6) : dataset?.price} Core</h6>
                        </div>
                    </div>


                    <div className="buymodalbtns">
                        <button className="borderbtn" onClick={handleClose}>Cancel</button>

                        {/* jawad */}
                        {loader ?
                            <button className="bluebtn"> <img
                                width={19}
                                style={{
                                    filter:
                                        "invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)",
                                }}
                                src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                                alt="loader"
                            /></button>

                            :
                            <button className="bluebtn" onClick={() => {

                                completebuy();
                            }}>Buy Now</button>
                        }

                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Successfully Purchased</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">You have successfully purchased <span className="bluetext">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</span> for <span className="bluetext">{(dataset?.price + ((dataset?.launchpad[0]?.platformFee || 0) / 100 * dataset?.price)).toFixed(6)} Core</span></p>
                    <button onClick={handleClose1} className="bluebtn">Okay</button>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place a bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src={dataset?.nft} alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    {/* {console.log('highestbid', highestbid)} */}
                    <p className="buynowpara">You are about to place a bid for <span className="whitetext">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</span> from <span className="whitetext">{dataset?.launchpad[0]?.name}.</span></p>
                    {highestbid ? <p className='asaasdsadsdasdasdas'>Your Bid must be greater then {highestbid} </p> : null}
                    <div className="bidinputmain">
                        <h6 className="bidinputhead">Your bid</h6>
                        <input value={corevalue} onChange={(e) => setcorevalue(e.target.value)} type="text" placeholder='Enter your bid' className='bidinput' />
                    </div>
                    <div className="placebiddatamain">
                        <div className="placebiddata">
                            <p className="placebiddataleft">Your balance</p>
                            <h6 className="placebiddataright">{parseFloat(balance)?.toFixed(4)}  Core</h6>
                        </div>
                        <div className="placebiddata">
                            <p className="placebiddataleft">Service fee</p>
                            <h6 className="placebiddataright">{(((dataset?.launchpad[0]?.platformFee || 0) / 100) * (corevalue)).toFixed(4)} Core</h6>
                        </div>
                    </div>
                    <div className="buyitemmain p-0">
                        <h6 className="buyitemhead">You will pay</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            {corevalue ?
                                (
                                    <h6 className="buyitemright">{(parseFloat(corevalue) + ((dataset?.launchpad[0]?.platformFee || 0) / 100 * parseFloat(corevalue)))}</h6>
                                )
                                :
                                (
                                    <h6 className="buyitemright">0</h6>
                                )
                            }
                            <p className="buyitemrightpara">Core</p>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="borderbtn" onClick={handleClose2}>Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            completeListing2()
                        }}>Place a bid</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show3} onHide={handleClose3} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place a bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">loading...</h6>
                    {/* <p className="loaderpara">Lorem ipsum dolor sit amet, consectetur.</p> */}
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show4} onHide={handleClose4} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place a bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your Bid has been successfully submitted</p>
                    <button onClick={handleClose4} className="bluebtn">Okay</button>
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show5} onHide={handleClose5} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Make An Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src={dataset?.nft} alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <p className="buynowpara">You are about to send offer for <span className="whitetext">{dataset?.launchpad[0]?.name} #{dataset?.tokenID}</span> from <span className="whitetext">{dataset?.launchpad[0]?.name}.</span></p>
                    <div className="bidinputmain">
                        <h6 className="bidinputhead">Your bid</h6>
                        <input value={corevalue} onChange={(e) => setcorevalue(e.target.value)} type="text" placeholder='Enter your bid' className='bidinput' />
                    </div>
                    <div className="placebiddatamain">
                        <div className="placebiddata">
                            <p className="placebiddataleft">Your balance</p>
                            <h6 className="placebiddataright">{parseFloat(balanceOf)?.toFixed(4)}  WCore</h6>
                        </div>
                        <div className="placebiddata">
                            <p className="placebiddataleft">Service fee</p>
                            <h6 className="placebiddataright">{(((dataset?.launchpad[0]?.platformFee || 0) / 100) * (corevalue)).toFixed(4)} WCore</h6>
                        </div>
                    </div>
                    <div className="buyitemmain p-0">
                        <h6 className="buyitemhead">You will pay</h6>
                        <div className="buyitemright">
                            <img src="\assets\nftdetailassets\token.svg" alt="buyitemimg" className="buyitemimg" />
                            {corevalue ?
                                (
                                    <h6 className="buyitemright">{(parseFloat(corevalue) + ((dataset?.launchpad[0]?.platformFee || 0) / 100 * parseFloat(corevalue)))}</h6>
                                )
                                :
                                (
                                    <h6 className="buyitemright">0</h6>
                                )
                            }
                            <p className="buyitemrightpara">Core</p>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="borderbtn" onClick={handleClose5}>Cancel</button>
                        <button className="bluebtn" onClick={() => {
                            MakeOffers()
                        }}>Send Offer</button>
                    </div>

                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show6} onHide={handleClose6} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Make An Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\discovercollection\loadermain.png" alt="loader" className='loaderimg' />
                    <h6 className="loaderhead">loading...</h6>
                    {/* <p className="loaderpara">Lorem ipsum dolor sit amet, consectetur.</p> */}
                </Modal.Body>

            </Modal>

            <Modal className='buymodal' show={show7} onHide={handleClose7} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Make An Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="\assets\nftdetailassets\PURCHASED.svg" alt="purchasedimg" className="purchasedimg" />
                    <p className="purshasedpara">Your Offer has been successfully submitted</p>
                    <button onClick={handleClose7} className="bluebtn">Okay</button>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default Nftdetail