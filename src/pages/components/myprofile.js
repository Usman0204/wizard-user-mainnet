import React, { use, useEffect, useRef, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Onsale from './onsale';
import Authorcollection from './authorcollection';
import AuthorActivity from './authoractivity';
import Followers from './Followers';
import Navbar from './navbar';
import Link from 'next/link';
import Footer from './footer';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import Loader from '@/hooks/loader';
import AuthorBidsActivity from './authorBidsactivity';
import AuthorOffersActivity from './authorOffersactivity';

const Myprofile = () => {
    const textRef = useRef(null);
    const api_url = Environment.api_url;
    const [svgColor, setSvgColor] = useState('#745F8C');
    const [profile, setProfile] = useState();
    const [tab, setTab] = useState('onsale')
    const [loader, setLoader] = useState(false)
    const handleCopyClick = () => {
        const range = document.createRange();
        range.selectNode(textRef.current);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');


        setSvgColor('#862FC0');


        setTimeout(() => {
            setSvgColor('#745F8C');
        }, 2000);


        selection.removeAllRanges();
    };

    const seelecttab = (role) => {
        // console.log("adsdasdsad",role);
        setTab(role)

    }
    const getProfile = async (accessToken) => {
        setLoader(true);
        let tok = localStorage.getItem("accessToken");
        // console.log("start in swdwww in navbarr");

        try {
            const config = {
                method: "get",
                url: `${api_url}/users/get-user-profile`,
                headers: {
                    Authorization: "Bearer " + tok,
                },
            };
            let response = await axios(config);
            // console.log(response?.data, "swdwww in navbarr");
            setLoader(false);
            // Uncomment the lines below if you want to set the profile and save it to localStorage
            setProfile(response?.data?.data);
            // localStorage.setItem("profileData", JSON.stringify(response?.data?.data));
        } catch (error) {
            setLoader(false);
            console.error("API Request Error: in navbarrrrr", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);


    return (
        <>
            {loader && <Loader />}
            <Navbar />
            <section className="author-profile">
                <div className="custom-container">
                    <div className="collection-bg-parent">
                        <div className="collection-bg">
                            <img src={profile?.coverPicture || '/assets/cover.png'} alt="img" className='img-fluid' />
                        </div>
                    </div>
                    <div className="profile-img">
                        <img src={profile?.picture || '/assets/profile.png'} alt="img" className='img-fluid' />
                    </div>
                    <div className="bottom-detail">
                        <h5>{profile?.name}</h5>
                        <Link href="/editprofile" className='btn-follow'>Edit profile</Link>
                        {/* <div className="followers-text">
                            <h6>3.4K <span>Followers</span></h6>
                            <h6>1.2K <span>Following</span></h6>
                        </div> */}
                        <p className="para">{profile?.bio}</p>
                        <div className="copy-text">
                            <p ref={textRef}>{profile?.walletAddress}</p>
                            <a onClick={handleCopyClick}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill={svgColor}>
                                <path d="M2.60938 1.875H1.67188V16H12.4531V15.0625H2.60938V1.875Z" fill={svgColor} />
                                <path d="M12.5669 3.51609L10.8125 1.76172V3.51609H12.5669Z" fill={svgColor} />
                                <path d="M12.9219 4.45312H9.875V1.40625C9.875 0.630844 9.24416 0 8.46875 0H3.54688V14.125H14.3281V5.85938C14.3281 5.08397 13.6973 4.45312 12.9219 4.45312Z" fill={svgColor} />
                            </svg></a>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey="onsale"
                        id="uncontrolled-tab-example"
                        onSelect={seelecttab}
                    >
                        <Tab eventKey="onsale" title='Onsale'>
                            <Onsale tab={tab} setLoader={setLoader} loader={loader}/>
                        </Tab>
                        <Tab eventKey="owned" title="Owned">
                            <Onsale tab={tab} setLoader={setLoader} loader={loader} />
                        </Tab>
                        {/* <Tab eventKey="created" title="Created">
                            <Onsale tab={tab}/>
                        </Tab> */}
                        <Tab eventKey="collection" title="Collection">
                            <Authorcollection tab={tab} />
                        </Tab>
                        <Tab eventKey="activity" title="Activity">
                            <AuthorActivity />
                        </Tab>
                        <Tab eventKey="bids" title="Bids">
                            <AuthorBidsActivity />
                        </Tab>
                        <Tab eventKey="offers" title="Offers">
                            <AuthorOffersActivity />
                        </Tab>
                    </Tabs>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Myprofile
