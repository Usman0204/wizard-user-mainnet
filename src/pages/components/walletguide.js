import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Walletguide = () => {
    return (
        <>
            <Navbar />
            <section className="walletguide">
                <div className="custom-container">
                    <div className="parent">
                        <div className="main-heading">
                            <h6>Adding Core Dao Mainnet Network & Testnet Network.</h6>
                            <p>If you&apos;re looking to interact with decentralized applications (dapps) on the Core Blockchain (CORE) mainnet, MetaMask is the perfect browser extension for you. MetaMask, which is widely used for Ethereum blockchain interactions, also supports other networks like BSC. In this article, we&apos;ll guide you through the process of adding the CORE mainnet to MetaMask for the best user experience.</p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 1: Open MetaMask Wallet</h6>
                            <p>To start the process, open the MetaMask extension in your browser by clicking on the MetaMask icon located in the top-right corner. This will open the MetaMask interface, which provides an intuitive and user-friendly interface for managing your assets.</p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 2: Select "Custom RPC"</h6>
                            <p>In the MetaMask interface, click on the network dropdown in the top-right corner. From the list of options, select "Custom RPC". This will open a new window where you can enter the details of the Core Dao chain mainnet.</p>
                        </div>
                        <div className="main-heading" style={{marginTop: "50px"}}>
                            <h6>Core Dao chain mainnet</h6>
                            <p>
                                Chain Name: Core Blockchain <br />
                                Chain ID: 1116 <br />
                                Symbol: CORE <br />
                                New RPC URL: https://rpc.coredao.org/ <br />
                                Block Explorer URL: https://scan.coredao.org/ <br />
                            </p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 3: Enter the Core Mainnet Network URL</h6>
                            <p>In the "New RPC URL" field, enter the URL of the Core Mainnet Network, which is "https://rpc.coredao.org/". It is important to double-check the URL to ensure you are connecting to the correct network.</p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 4: Give the Network a Name</h6>
                            <p>In the "Network Name" field, give the network a name. For example, you can call it " Core Blockchain ". This will help you identify the network easily in MetaMask.</p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 5: Save the Network</h6>
                            <p>Click on the "Save" button to add the Core Mainnet Network to your MetaMask interface.</p>
                        </div>
                        <div className="sub-heading">
                            <h6>Step 6: Select the Core Mainnet</h6>
                            <p>Now you need to select the Core Mainnet from the network dropdown. Once you select it, your MetaMask will be connected to the Core Mainnet, and you&apos;ll be able to interact with Core Mainnet dapps & Tokens.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Walletguide
