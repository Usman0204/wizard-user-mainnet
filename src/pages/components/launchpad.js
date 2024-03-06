import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Launchpadcards from './launchpadcards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import Environment from '@/utils/Enviroment';
import { toast } from "react-toastify";
import Countdown from 'react-countdown';
// import { getMarketPlaceContract } from '@/utils/contractHelpers';
// import Environment from '@/utils/Enviroment';
// import Web3 from 'web3';
import useWeb3 from '@/hooks/useWeb3';

const Launchpad = () => {
    // const web3 = useWeb3();
    // const contractAddress = Environment.marketPlaceContract;
    // const contract = getMarketPlaceContract(contractAddress, web3);
    // console.log("contract address",contractAddress)
    // console.log("contract address contract",contract)
    var { account } = useWeb3React();
    const api_url = Environment.api_url;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');
    const [Upcomingdata, setUpcomingdata] = useState();
    const [Listeddata, setListeddata] = useState();
    const [dataset, setdataset] = useState('live');
    const [role, setRole] = useState('live')
    const handleupperselector = (rolee) => {
        setRole(rolee)
    }

    useEffect(() => {

        const { tab } = router.query;
        if (tab && (tab === 'all' || tab === 'edition')) {
            setActiveTab(tab);
        }
    }, [router.query]);

    const handleTabSelect = (selectedTab) => {

        setActiveTab(selectedTab);
    };

    // console.log("reponce", role)

    // console.log("reponce", activeTab)

    useEffect(() => {
        GetUserDetail()
    }, [role, activeTab, account])

    useEffect(() => {
        GetUpcomingDetail()
    }, [account])

    const GetUserDetail = () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        if (role === 'live' && activeTab === 'all') {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&duration[]=live`,
            }
        }
        else if (role === 'live' && activeTab === 'edition') {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&openEddition=true&duration[]=live`,
            }
        }
        else if (role === 'upcoming' && activeTab === 'all') {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&duration[]=upcoming`,
            }
        }
        else if (role === 'upcoming' && activeTab === 'edition') {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&openEddition=true&duration[]=upcoming`,
            }
        }
        else if (role === 'past' && activeTab === 'all') {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&duration[]=past`,
            }
        }
        else {
            config = {
                method: "get",
                url: `${api_url}/launchpads/listed?offset=1&limit=50&openEddition=true&duration[]=past`,
            }
        }

        axios(config)
            .then(function (response) {
                setListeddata(response.data.data.launchpads)
                // setLoader(false);
                // console.log("response data", response.data.data.launchpads)
            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    }

    const GetUpcomingDetail = () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/launchpads/upcoming?offset=1&limit=20&duration[]=upcoming`,
            // headers: {
            //     authorization: `Bearer ` + tok
            // },
        }

        axios(config)
            .then(function (response) {
                // setLoader(false);
                setUpcomingdata(response.data.data.upcomingLaunchpads[0])
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

    // var Live = 'live';
    // var Upcoming = 'upcoming';
    // var Past = 'past';

    useEffect(() => {
        if (role === 'live') {
            setdataset('live')
        }
        else if (role === 'upcoming') {
            setdataset('upcoming')
        }
        else {
            setdataset('past')
        }
    }, [role, activeTab, account])


    const GetTime = (time) => {
        let endtime = new Date(time)
        return endtime;
    }


    return (
        <>


            <Navbar />
            <section className="launchpad-section">
                <div className="cover-img">
                    {Upcomingdata?.imageUrl && <img src={Upcomingdata?.imageUrl} alt="img" className='img-fluid' />}
                    <span></span>
                </div>
                <div className="custom-container">
                    <div className="upper-content">
                        <div className="left-side">
                            {Upcomingdata?.name && <h4>{Upcomingdata?.name} <img src="\assets\landing\static\verify-icon-big.svg" alt="img" className='img-fluid' /></h4>}
                            {Upcomingdata?.mintStartTime && <p><img src="\assets\landing\static\crypto-icon-small.svg" alt="img" className='img-fluid' />Starts: <Countdown date={GetTime(Upcomingdata?.mintStartTime)} /></p>
                            }                            <h6>{Upcomingdata?.description}</h6>
                        </div>
                        <div className="right-side">
                            <Link href={`/launchpaddetailpage?id=${Upcomingdata?._id}`} className='btn-gotolaunchpad'>Go to launchpad</Link>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey="live"
                        id="uncontrolled-tab-example"
                        className="parent-tab"
                        onSelect={handleupperselector}
                    >
                        <Tab eventKey="live" title="Live">
                            <Tabs
                                defaultActiveKey="all"
                                activeKey={activeTab} onSelect={handleTabSelect}
                                id="uncontrolled-tab-example"
                                className="inner-tab"
                            >
                                <Tab eventKey="all" title="All">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                                <Tab eventKey="edition" title="Open Editions">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="upcoming" title="Upcoming">
                            <Tabs
                                defaultActiveKey="all"
                                activeKey={activeTab} onSelect={handleTabSelect}
                                id="uncontrolled-tab-example"
                                className="inner-tab"
                            >
                                <Tab eventKey="all" title="All">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                                <Tab eventKey="edition" title="Open Editions">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="past" title="Past">
                            <Tabs
                                defaultActiveKey="all"
                                activeKey={activeTab} onSelect={handleTabSelect}
                                id="uncontrolled-tab-example"
                                className="inner-tab"
                            >
                                <Tab eventKey="all" title="All">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                                <Tab eventKey="edition" title="Open Editions">
                                    <Launchpadcards Listeddata={Listeddata} data={dataset} />
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Launchpad
