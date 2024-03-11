import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Navbar from './navbar';
import Footer from './footer';

const Faqs = () => {
    return (
        <>
            <Navbar />
            <section className="faqs-section">
                <div className="custom-container">
                    <div className="main-heading">
                        <h6>Frequently Asked Questions</h6>
                    </div>
                    <div className="parent">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>1. What is Wizard NFT?</Accordion.Header>
                                <Accordion.Body>
                                    Wizard Gallery is developing to become the flagship NFT marketplace on the Core Network,
                                    aiming to provide its users with a seamless NFT minting and trading platform. Our main goal is
                                    to ensure a flawless experience for our users and bring dynamic innovations and progressive
                                    features to the world of NFT trading. Here is more on the platform: <a style={{ color: "#862FC0" }} href="https://www.wizardgallery.xyz/aboutus" target='_blank'>https://www.wizardgallery.xyz/aboutus</a>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>2. What are the intellectual property rights on the Platform?</Accordion.Header>
                                <Accordion.Body>
                                    At Wizard Gallery, we deeply respect and uphold the intellectual property rights of artists and
                                    creators. When you mint or list an NFT on our platform, you retain ownership of your original
                                    work. Our platform acts as a marketplace to showcase and trade your digital assets, but the
                                    copyright and associated rights remain with you, the creator. <br /> <br />
                                    We encourage a culture of respect and legal compliance among our users, ensuring that all
                                    digital artworks and NFTs traded on our platform are done so under the rightful permissions and
                                    legal frameworks. Buyers acquire ownership of the NFT itself, which includes the digital file, but
                                    the underlying intellectual property rights are specified by the creator at the time of minting. This
                                    approach empowers creators to share their art while maintaining control over their intellectual
                                    property rights
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>3. What Fees does the platform charge?</Accordion.Header>
                                <Accordion.Body>
                                    At Wizard Gallery, we've kept our fee structure simple and transparent to ensure a seamless
                                    experience for both creators and collectors. Here's a quick overview: <br /> <br />
                                    Transaction Fees: We charge a modest fee of 2% on all transactions conducted on our platform.
                                    This fee is applied to sales, purchases, and trades of NFTs, ensuring that we can continue to
                                    provide a secure and innovative marketplace for our users. <br /><br />
                                    Launchpad Fees: For creators looking to launch their NFT collections via our Launchpad, a
                                    slightly higher fee of 5% is applied. This fee covers the additional services, support, and
                                    exposure provided through the Launchpad, helping creators to successfully debut their
                                    collections to a wide audience.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>4. What about my privacy?</Accordion.Header>
                                <Accordion.Body>
                                    At Wizard Gallery, we take your privacy seriously. We are committed to protecting your personal
                                    information and ensuring your experience is secure. Our platform uses advanced encryption
                                    and security measures to safeguard your data,adhering to strict privacy policies.We collect
                                    only what is necessary for enhancing your experience and maintain transparency about how
                                    your information is used.Rest assured,your privacy is a top priority for us.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>5. What blockchains does the platform Support?</Accordion.Header>
                                <Accordion.Body>
                                    Wizard Gallery proudly operates on the Core Blockchain, leveraging its innovative capabilities to
                                    offer a seamless NFT experience. The Core Blockchain stands out with its Bitcoin-powered,
                                    EVM-compatible features, ensuring high security, scalability, and interoperability. This choice
                                    allows us to provide a robust platform for NFT minting and trading, making your experience both
                                    secure and versatile
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>6. How to Set Up the CORE network on Wizard NFT?</Accordion.Header>
                                <Accordion.Body>
                                    Here is a complete guide on how to set up your wallet for the platform using CORE Network.
                                    <a style={{ color: "#862FC0" }} href="https://www.wizardgallery.xyz/walletguide" target='_blank'>https://www.wizardgallery.xyz/walletguide</a>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Faqs
