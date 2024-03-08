import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
// import useAuth from '@/hooks/useAuth';
import useAuth from '@/hooks/useAuth';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
// import Signature from '@/hooks/userSign';
import Signature from '@/hooks/userSign';
import { toast } from "react-toastify";
import { useWeb3React } from '@web3-react/core';
import useWeb3 from '@/hooks/useWeb3';
const Navbar = () => {
  let { account } = useWeb3React();
  const [balance, seBalance] = useState(0)
  // console.log("account+++++++++++++++++++++++++++", account)
  // let account = 'dshdsv89798sddsv9dvsdsv'
  // console.log(account, 'eeeeeerr44');
  const web3 = useWeb3();
  // console.log("sfdsdfdsf", web3)
  const [clickedbtn, setclickedbtn] = useState(true);
  const [profile, setProfile] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const [startwith, setstartwith] = useState(false);
  const api_url = Environment.api_url;
  // console.log('web3 +++++++++++++', web3)
  const { userSign } = Signature();
  const [searchText, setSearchText] = useState('');
  const [datasearch, setdatasearch] = useState();
  // console.log("data search here is ", datasearch)
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const [show, setShow] = useState(false);
  // console.log("account get",account)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const { login, logout } = useAuth();



  const loginUser = async () => {
    const tok = localStorage.getItem("accessToken");
    const wall = localStorage.getItem("wallet");

    if (!account) {
      console.error("User account not available.");
    }
    else if (tok !== "null" && tok !== "undefined" && wall === account) {
      console.log("User is already logged in.");
    }

    else {
      console.log("hererrerererrere")
      try {
        const res = await userSign(account);
        // console.log("response get", res)
        if (!account) {
          console.error("User account not available.");
          return;
        }

        const response = await axios.post(`${api_url}/auth/users/login`, {
          walletAddress: account,
          sign: res,
        });

        // console.log("Login response:", response.data);

        if (response.status === 201) {
          // console.log("response get here",response)
          const token = response?.data?.data?.accessToken;
          localStorage.setItem("accessToken", token);
          localStorage.setItem("wallet", account);
          // GetUser();
          // setChangeAccount(token);
          toast.success("User Logged in Successfully");
        } else {
          console.error("Login failed:", response.data.msg);
          toast.error(response.data.msg, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        logoutApi();
        // Handle error
      }
    }
  };

  // useEffect(() => {
  //   loginUser();
  // },[])

  // const loginUserss = async () => {
  //   const res = await userSign(account);
  //   console.log("res we have here is ", res)

  // }
  // const checkBalance = async () => {
  //   try {
  //     if (account) {
  //       // console.log();
  //       let balance = await web3?.eth?.getBalance(account);
  //       if (balance) {
  //         console.log("Balance:", balance);
  //         seBalance((balance?.toString() / 1e18).toFixed(3));
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error checking balance:", err);
  //   }
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

  useEffect(() => {
    if (account) {
      // checkBalance();
      getCoreBalance();
    }
  }, [account, balance, web3]);
  useEffect(() => {
    if (account) {
      // console.log("register api")
      // loginUserss()
      const res = axios
        .post(`${api_url}/auth/users/register`, {
          walletAddress: account,
        })
        .then((response) => {
          toast.success("User Registered Successfully");
          loginUser()
          // loginUser()/
        })
        .catch((err) => {
          loginUser()
        });
    }
    //  async function balance() { 
    //    let res = await web3.eth.getBalance(account)
    //    console.log(res / 1e18);
    //    seBalance(res / 1e18)


    //   }
    //   if(account && web3){
    //     balance()
    //   }

  }, [account]);


  const connectWallet = async (e) => {
    if (account) {
      const connectorId = window.localStorage.getItem("connectorId")
      await logout(connectorId);
      localStorage.removeItem("connectorId");
      localStorage.removeItem("flag");
    } else {
      await login("injected", e);
      localStorage.setItem("connectorId", "injected");
      localStorage.setItem("flag", "true");
      localStorage.setItem("chain", e);
      setclickedbtn(false)
      // setLoader(false);
    }
    // setLoader(false);
  };

  const trustWallet = async (e) => {
    try {
      if (account) {
        await logout("walletconnect");
      } else {
        login("walletconnect", e);
        localStorage.setItem('connectorId', 'walletconnect');
        localStorage.setItem("flag", "true");
      }
    } catch (error) {
      console.error('Error during WalletConnect operation:', error);
      toast.error('An error occurred during WalletConnect operation');
    }
  };




  const disconnectWallet = async () => {
    const connectorId = window.localStorage.getItem("connectorId")
    logout(connectorId)
    localStorage.removeItem('connectorId')
    localStorage.removeItem('flag')
    localStorage.removeItem('chain')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('wallet')
  };



  const handleCopyClick = () => {
    const textToCopy = account;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchText) {
      SearchValue();
    }
    if (web3.utils.isAddress(searchText)) {
      setstartwith(true)
    }
    else {
      setstartwith(false)
    }

  }, [searchText]);

  const SearchValue = () => {
    let tok = localStorage.getItem("accessToken");
    var config = ''

    config = {
      method: "get",
      url: `${api_url}/launchpads/search?search=${searchText}`,
      // headers: {
      //     authorization: `Bearer ` + tok
      // },
    }

    axios(config)
      .then(function (response) {
        // setLoader(false);
        setdatasearch(response.data.data)
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
  const getProfile = async (accessToken) => {
    let tok = localStorage.getItem("accessToken");
    console.log("start in swdwww in navbarr");

    try {
      const config = {
        method: "get",
        url: `${api_url}/users/get-user-profile`,
        headers: {
          Authorization: "Bearer " + tok,
        },
      };
      let response = await axios(config);
      console.log(response?.data, "swdwww in navbarr");

      // Uncomment the lines below if you want to set the profile and save it to localStorage
      setProfile(response?.data?.data);
      // localStorage.setItem("profileData", JSON.stringify(response?.data?.data));
    } catch (error) {
      console.error("API Request Error: in navbarrrrr", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  let logoutApi = async () => {
    toast.success('Logout Successfull');
    const connectorId = window?.localStorage.getItem("connectorId")
    logout(connectorId);
    localStorage.setItem("flag", false)
    localStorage.clear()
  }
  // console.log("adsdsdsds++++++++", startwith)
  return (
    <>
      <section className="mainnavbar">
        <div className="custom-container">
          <div className="customnavbar">
            <Link href={'/'}>
              <img src="\assets\navbarassets\logo.svg" alt="logoimg" className="logoimg" />
            </Link>
            <Dropdown className='input-dropdown' show={searchText.trim() !== ''}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="custominput">
                  <input
                    type="search"
                    placeholder="Search items, collections, and accounts"
                    className="innercustominput"
                    value={searchText}
                    onChange={handleInputChange}
                  />
                  <img
                    src="\assets\navbarassets\search-normal.svg"
                    alt="customsearchimg"
                    className="customsearchimg"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="searchresultsmain">
                  {startwith === false ?
                    (
                      <>
                        {datasearch?.length > 0 ?
                          <div className='collectionsearch '>
                            <div className="collectionhead">
                              <h6 className="collectiontext">Collection</h6>
                            </div>
                            {datasearch?.map((card, index) => (
                              <Link key={index} href={`/collections?id=${card?._id}`}>
                                <div className="collectionresult">
                                  <div className="collectionresultleft">
                                    <div className="collectionimg">
                                      <img src={card?.imageUrl} alt="innercollectionimg" className="innercollectionimg" />
                                    </div>
                                    <div className="collectiontexts">
                                      <h6 className="innercollectionhead">{card?.name}</h6>
                                      <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> {card?.itemsCreated} items</p>
                                    </div>
                                  </div>
                                  <p className="collectionrightpara">{card?.price} Core</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          :
                          (
                            <p style={{color: "#fff"}}>No Data Found</p>
                          )
                        }
                      </>

                    )
                    :
                    (
                      <div className="accountmain">
                        <h6 className="accounthead">Accounts</h6>
                        {datasearch?.map((card, index) => (
                          <Link key={index} href="/authorprofile">
                            <div className="accountinner">
                              <div className="accoutnimg">
                                <img src={card?.profileImageUrl} alt="accountinnerimg" className="accountinnerimg" />
                              </div>
                              <p className="accounttext">{card?.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )
                  }


                </div>
              </Dropdown.Menu>
            </Dropdown>
            <div className="navlinks">
              <Link href="/discovercollection" className="innernavlink">Discover</Link>
              <Dropdown align='end'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                Launchpad <img src="\assets\navbarassets\arrow-down.svg" alt="arrowimg" className="arrowimg" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Link href="/launchpad" className="dropitem">Launchpad</Link> */}
                  {/* <Link href="/launchpad?tab=edition" className="dropitem">Open Editions</Link> */}
                  {/* <Link href="https://wizardnft-creator.vercel.app" className="dropitem">Creator Dashboard</Link> */}
                  <Link href="/launchpad" className="dropitem">Launchpad</Link>
                  <Link href="https://wizardnft-creator.vercel.app" className="dropitem">Apply For launchpad</Link>
                  {/* <p className="dropitem marginleft">Presale</p> */}
                </Dropdown.Menu>
              </Dropdown>
              {/* <Link href="/launchpad" className="innernavlink">Launchpad</Link> */}
            </div>
            {
              account ?
                <Dropdown className='profiledropdown' align='end'>
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="profilemainbtn">
                      <div className="profilemainimg">
                        <img src={profile?.picture || '/assets/profile.png'} alt="profileinnerimg" className="profileinnerimg" />
                      </div>
                      <p className="profilemainwallet">{account?.slice(0, 8)}...
                        {account?.slice(
                          account?.length - 3,
                          account?.length
                        )}</p>
                      <img src="\assets\navbarassets\arrow-down-profile.svg" alt="arrow" className="arrow" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <h5 className="profilename">{profile?.name}</h5>
                    <div className="walletinner">
                      <p className="walletpara">{account?.slice(0, 11)}...
                        {account?.slice(
                          account?.length - 3,
                          account?.length
                        )}</p>
                      <img onClick={handleCopyClick} src="\assets\navbarassets\copy.svg" alt="copyimg" className="copyimg" />
                      {isCopied && <div className="copied">Copied!</div>}
                    </div>
                    <div className="balancemain">
                      <div className="balanceimg">
                        <img src="\assets\launchpaddetailassets\clogo.svg" alt="balanceinnerimg" className="balanceinnerimg" />
                      </div>

                      <div className="balancetexts">
                        <p className="balancepara">Balance</p>
                        <h6 className="balancehead">{parseFloat(balance)?.toFixed(4)} Core</h6>
                      </div>
                    </div>
                    <div className="profiledata">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                        <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="#862FC0" />
                        <path d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z" fill="#862FC0" />
                      </svg>
                      <Link href="/myprofile" className="profiledatapara">My Profile</Link>
                    </div>
                    <div className="profiledata">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                        <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#745F8C" />
                        <path d="M19.0206 3.47967C17.0806 1.53967 15.1806 1.48967 13.1906 3.47967L11.9806 4.68967C11.8806 4.78967 11.8406 4.94967 11.8806 5.08967C12.6406 7.73967 14.7606 9.85967 17.4106 10.6197C17.4506 10.6297 17.4906 10.6397 17.5306 10.6397C17.6406 10.6397 17.7406 10.5997 17.8206 10.5197L19.0206 9.30967C20.0106 8.32967 20.4906 7.37967 20.4906 6.41967C20.5006 5.42967 20.0206 4.46967 19.0206 3.47967Z" fill="#745F8C" />
                        <path d="M15.6103 11.5298C15.3203 11.3898 15.0403 11.2498 14.7703 11.0898C14.5503 10.9598 14.3403 10.8198 14.1303 10.6698C13.9603 10.5598 13.7603 10.3998 13.5703 10.2398C13.5503 10.2298 13.4803 10.1698 13.4003 10.0898C13.0703 9.8098 12.7003 9.4498 12.3703 9.0498C12.3403 9.0298 12.2903 8.9598 12.2203 8.8698C12.1203 8.7498 11.9503 8.5498 11.8003 8.3198C11.6803 8.1698 11.5403 7.9498 11.4103 7.7298C11.2503 7.4598 11.1103 7.1898 10.9703 6.9098C10.9491 6.86441 10.9286 6.81924 10.9088 6.77434C10.7612 6.44102 10.3265 6.34358 10.0688 6.60133L4.34032 12.3298C4.21032 12.4598 4.09032 12.7098 4.06032 12.8798L3.52032 16.7098C3.42032 17.3898 3.61032 18.0298 4.03032 18.4598C4.39032 18.8098 4.89032 18.9998 5.43032 18.9998C5.55032 18.9998 5.67032 18.9898 5.79032 18.9698L9.63032 18.4298C9.81032 18.3998 10.0603 18.2798 10.1803 18.1498L15.9016 12.4285C16.1612 12.1689 16.0633 11.7235 15.7257 11.5794C15.6877 11.5632 15.6492 11.5467 15.6103 11.5298Z" fill="#745F8C" />
                      </svg>
                      <Link href="/editprofile" className="profiledatapara">Edit Profile</Link>
                    </div>
                    <div className="profiledata" onClick={() => {
                      setclickedbtn(true);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                        <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#745F8C" />
                        <path d="M4.55945 11.2498L6.62945 9.17984C6.77945 9.02984 6.84945 8.83984 6.84945 8.64984C6.84945 8.45984 6.77945 8.25984 6.62945 8.11984C6.33945 7.82984 5.85945 7.82984 5.56945 8.11984L2.21945 11.4698C1.92945 11.7598 1.92945 12.2398 2.21945 12.5298L5.56945 15.8798C5.85945 16.1698 6.33945 16.1698 6.62945 15.8798C6.91945 15.5898 6.91945 15.1098 6.62945 14.8198L4.55945 12.7498H8.99945V11.2498H4.55945Z" fill="#745F8C" />
                      </svg>
                      <p onClick={disconnectWallet} className="profiledatapara">Disconnect</p>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                :
                <button onClick={handleShow} className="bluebtn">Connect Wallet</button>

            }

          </div>
          <div className="customnavbarmbl d-none">
            <Link href={'/'}>
              <img src="\assets\navbarassets\mbllogo.svg" alt="mobilelogo" className="mobilelogo" />
            </Link>
            <div className="mobileicons">
              {/* <img onClick={handleShow2} src="\assets\navbarassets\search-normalmbl.svg" alt="searchimg" className="searchimgmbl" /> */}
              {
                account ?
                  <Dropdown className='profiledropdownmbl' align='center'>
                    <Dropdown.Toggle id="dropdown-basic">
                      <img src="\assets\navbarassets\user.svg" alt="profileimgmbl" className="profileimgmbl" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <h5 className="profilename">Michael Scott</h5> */}
                      <div className="walletinner">
                        <p className="walletpara">{account?.slice(0, 8)}...
                          {account?.slice(
                            account?.length - 3,
                            account?.length
                          )}</p>
                        <img onClick={handleCopyClick} src="\assets\navbarassets\copy.svg" alt="copyimg" className="copyimg" />
                      </div>
                      <div className="balancemain">
                        <div className="balanceimg">
                          <img src={profile?.picture || '/assets/profile.png'} alt="balanceinnerimg" className="balanceinnerimg" />
                        </div>
                        <div className="balancetexts">
                          <p className="balancepara">Balance</p>
                          <h6 className="balancehead">{parseFloat(balance)?.toFixed(4)} Core</h6>
                        </div>
                      </div>
                      <div className="profiledata">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="#862FC0" />
                          <path d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z" fill="#862FC0" />
                        </svg>
                        <Link href="/myprofile" className="profiledatapara">My Profile</Link>
                      </div>
                      <div className="profiledata">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#745F8C" />
                          <path d="M19.0206 3.47967C17.0806 1.53967 15.1806 1.48967 13.1906 3.47967L11.9806 4.68967C11.8806 4.78967 11.8406 4.94967 11.8806 5.08967C12.6406 7.73967 14.7606 9.85967 17.4106 10.6197C17.4506 10.6297 17.4906 10.6397 17.5306 10.6397C17.6406 10.6397 17.7406 10.5997 17.8206 10.5197L19.0206 9.30967C20.0106 8.32967 20.4906 7.37967 20.4906 6.41967C20.5006 5.42967 20.0206 4.46967 19.0206 3.47967Z" fill="#745F8C" />
                          <path d="M15.6103 11.5298C15.3203 11.3898 15.0403 11.2498 14.7703 11.0898C14.5503 10.9598 14.3403 10.8198 14.1303 10.6698C13.9603 10.5598 13.7603 10.3998 13.5703 10.2398C13.5503 10.2298 13.4803 10.1698 13.4003 10.0898C13.0703 9.8098 12.7003 9.4498 12.3703 9.0498C12.3403 9.0298 12.2903 8.9598 12.2203 8.8698C12.1203 8.7498 11.9503 8.5498 11.8003 8.3198C11.6803 8.1698 11.5403 7.9498 11.4103 7.7298C11.2503 7.4598 11.1103 7.1898 10.9703 6.9098C10.9491 6.86441 10.9286 6.81924 10.9088 6.77434C10.7612 6.44102 10.3265 6.34358 10.0688 6.60133L4.34032 12.3298C4.21032 12.4598 4.09032 12.7098 4.06032 12.8798L3.52032 16.7098C3.42032 17.3898 3.61032 18.0298 4.03032 18.4598C4.39032 18.8098 4.89032 18.9998 5.43032 18.9998C5.55032 18.9998 5.67032 18.9898 5.79032 18.9698L9.63032 18.4298C9.81032 18.3998 10.0603 18.2798 10.1803 18.1498L15.9016 12.4285C16.1612 12.1689 16.0633 11.7235 15.7257 11.5794C15.6877 11.5632 15.6492 11.5467 15.6103 11.5298Z" fill="#745F8C" />
                        </svg>
                        <Link href="/editprofile" className="profiledatapara">Edit Profile</Link>
                      </div>
                      <div className="profiledata">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='profiledataimg'>
                          <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#745F8C" />
                          <path d="M4.55945 11.2498L6.62945 9.17984C6.77945 9.02984 6.84945 8.83984 6.84945 8.64984C6.84945 8.45984 6.77945 8.25984 6.62945 8.11984C6.33945 7.82984 5.85945 7.82984 5.56945 8.11984L2.21945 11.4698C1.92945 11.7598 1.92945 12.2398 2.21945 12.5298L5.56945 15.8798C5.85945 16.1698 6.33945 16.1698 6.62945 15.8798C6.91945 15.5898 6.91945 15.1098 6.62945 14.8198L4.55945 12.7498H8.99945V11.2498H4.55945Z" fill="#745F8C" />
                        </svg>
                        <p onClick={() => {
                          logoutApi();
                        }} className="profiledatapara">Disconnect</p>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  :
                  null
              }
              <img onClick={handleShow1} src="\assets\navbarassets\toggler.svg" alt="togglermbl" className="togglermbl" />
            </div>
          </div>
        </div>
      </section>

      <Offcanvas show={show} onHide={handleClose} placement='end' className="connectwalletsidebar">
        <Offcanvas.Body>
          <img src="\assets\navbarassets\closeimg.svg" alt="closeimg" className="closeimg" onClick={handleClose} />
          <h6 className="connectsidehead">Connect Wallet</h6>
          <p className="connectsidepara">By connecting your wallet, you agree to our <span className="bold">Terms of Service</span> and Our  <span className="bold">Privacy Policy.</span></p>
        
          <div className="connectmain d-sm-flex d-none" onClick={() => {
            // setclickedbtn(() => { (false), localStorage.setItem("wallet", false) });
            // loginUserss()
            // loginUser()
            connectWallet('1116')
            handleClose();
          }}>
            <img src="\assets\navbarassets\metamask.svg" alt="connectimg" className="connectimg" />
            <p className="connectpara">Metamask</p>
          </div>
          <div className="connectmain" onClick={() => {
            // setclickedbtn(false);
            handleClose();
            handleClose1();
            trustWallet("1116")

          }}>
            <img src="\assets\navbarassets\walletconnect.svg" alt="connectimg" className="connectimg" />
            <p className="connectpara">WalletConnect</p>
          </div>







        </Offcanvas.Body>
      </Offcanvas>


      <Offcanvas show={show1} onHide={handleClose1} placement='end' className="mblnavside">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src="\assets\navbarassets\mbllogo.svg" alt="mobilelogo" className="mobilelogo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mblnavlinks">


            <Link href="/discovercollection" className="dropitemmbl marginleft">Discover</Link>
            <Link href="/launchpad" className="dropitemmbl marginleft">Launchpad</Link>
            {/* <Link href="/launchpad?tab=edition" className="dropitemmbl marginleft">Open Editions</Link> */}
            {/* <Link href="/collectiondashbord" className="dropitemmbl">Creator Dashboard</Link> */}
            <Link href="https://wizardnft-creator.vercel.app/" className="dropitemmbl marginleft">Apply for launchpad</Link>
            {/* <p className="dropitemmbl marginleft">Presale</p> */}

          </div>
          <div className="mblbtns">
            {account ? <button onClick={() => logoutApi()} className="disconnectbtn">Disconnect Wallet</button> :<button onClick={handleShow} className="connectbtn">Connect Wallet</button> }
            {/* {
              clickedbtn ?
                <button className="connectbtn" onClick={() => {
                  handleClose1();
                  handleShow();
                }}>Connect Wallet</button>
                :
                <button className="disconnectbtn" onClick={() => {
                  setclickedbtn(true);
                  handleClose1();
                }}>Disconnect Wallet</button>
            } */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={show2} onHide={handleClose2} placement='end' className="searchnavside">
        <Offcanvas.Body>
          <div className="searchlowermbl">
            <Dropdown show={searchText.trim() !== ''} className='dropdownsearchmbl'>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="custominput">
                  <input
                    type="search"
                    placeholder="Search"
                    className="innercustominput"
                    value={searchText}
                    onChange={handleInputChange}
                  />
                  <img
                    src="\assets\navbarassets\backimg.png"
                    alt="customsearchimg"
                    className="customsearchimg"
                    onClick={handleClose2}
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="searchresultsmain">
                  <div className="collectionhead">
                    <h6 className="collectiontext">Collection</h6>
                  </div>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardone.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">Kups by Raposa</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 Core</p>
                    </div>
                  </Link>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardtwo.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">The Anon Club</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 Core</p>
                    </div>
                  </Link>
                  <Link href="/collections" onClick={handleClose2}>
                    <div className="collectionresult">
                      <div className="collectionresultleft">
                        <div className="collectionimg">
                          <img src="\assets\navbarassets\collectioncardthree.png" alt="innercollectionimg" className="innercollectionimg" />
                        </div>
                        <div className="collectiontexts">
                          <h6 className="innercollectionhead">Taiyo Infants</h6>
                          <p className="innercollectionpara"><img src="\assets\navbarassets\itemimg.svg" alt="inneritemimg" className="inneritemimg" /> 10,000 items</p>
                        </div>
                      </div>
                      <p className="collectionrightpara">7.9 Core</p>
                    </div>
                  </Link>
                  <div className="accountmain">
                    <h6 className="accounthead">Accounts</h6>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardone.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardtwo.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardthree.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardone.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardtwo.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                    <Link href="/authorprofile" onClick={handleClose2}>
                      <div className="accountinner">
                        <div className="accoutnimg">
                          <img src="\assets\navbarassets\accountcardthree.png" alt="accountinnerimg" className="accountinnerimg" />
                        </div>
                        <p className="accounttext">Forganas</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Navbar
