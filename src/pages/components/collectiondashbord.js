import React, { useState } from 'react'
import Navbar from './navbar'
import { Nav } from 'react-bootstrap';
import Footer from './footer';
import Link from 'next/link';
import Launchpadlistedcard from './launchpadlistedcard';
const Collectiondashbord = () => {
    const [activeTab, setActiveTab] = useState('link-1');
    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    }
    return (
        <>
            <Navbar />
            <section className="maincollectiondash">
                <div className="custom-container">
                    <div className='row'>
                        <div className='col-xl-12 col-12 m-auto padd-sm'>
                            <h3>Collection</h3>
                            <div className='collectionparent'>
                                <div className='mainssss'>
                                    <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1">Drafts</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2">Submissions</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3">
                                                Approved <img src='\assets\one.svg' alt='img' className='img-fluid' />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-4">
                                                Listed
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-5">
                                                Rejected
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className='mainbtns'>
                                    {/* <Link href="/setupwhitelist"> <button>Create a whitelist</button></Link> */}
                                    <Link href="/createnewcollections">  <button>Apply for launchpad</button></Link>

                                </div>
                            </div>

                            {activeTab === 'link-1' && (
                                <>
                                    <div className='mainhead'>
                                        <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p>
                                    </div>
                                    <div className='parentcard'>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectionone.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Sharky</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectiontwo.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Sharky</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectionthree.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Shadow hunter</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {activeTab === 'link-2' && (
                                <>

                                </>
                            )}
                            {activeTab === 'link-3' && (
                                <>
                                    <div className='mainhead'>
                                        <p>These are your unsubmitted applications - only you can see these. You can return and update these at any time.
                                        </p>
                                    </div>
                                    <div className='parentcard'>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectionone.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Sharky</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectiontwo.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Sharky</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className='maincard'>
                                            <div className='mainimg'>
                                                <img src='\assets\collectionthree.svg' alt='img' className='img-fluid imgmain' />
                                            </div>
                                            <div className='cardtext'>
                                                <h6>Shadow hunter</h6>
                                                <p>Submitted: 5 minutes ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 'link-4' && (
                                <>
                                    <Launchpadlistedcard />
                                </>
                            )}
                            {activeTab === 'link-5' && (
                                <>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Collectiondashbord