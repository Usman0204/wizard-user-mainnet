import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
// import useWeb3 from '../../hooks/useWeb3';
import { useWeb3React } from '@web3-react/core';
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import { toast } from "react-toastify";
const Editprofile = () => {
    const api_url = Environment.api_url;
    var { account } = useWeb3React();
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePicture1, setProfilePicture1] = useState(null);
    const [coverPhoto1, setCoverPhoto1] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [insta, setInsta] = useState("");
    const [site, setSite] = useState("");
    const [reddit, setReddit] = useState("");
    const [discord, setDiscord] = useState("");
    const [medium, setMedium] = useState("");
    const [telegram, setTelegram] = useState("");
    const [email, setEmail] = useState("");
    const [detailsingle, setdetailsingle] = useState()



    // const handleSubmit = async () => {
    //     if (account) {
    //         try {
    //             setMainLoader(true)
    //             await EditProfile(allFormData, fileUrl, walletAddress)
    //             setMainLoader(false)
    //             toast('Your Profile has been updated!', { theme: "light" }, {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         }
    //         catch (err) {
    //             toast.error('Profile Not Edit!', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //             });
    //         }
    //     }

    // }

    // const ClearAll = (e) => {
    //     setAllFormData({
    //         displayName: '',
    //         customUrl: '',
    //         bio: '',
    //         websiteLink: '',
    //         twitterLink: '',
    //         instagramLink: '',
    //         discordLink: '',
    //         telegramLink: '',
    //         mediumLink: '',
    //     })
    // }

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
    };

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        setCoverPhoto(file);
    };

    const handleProfilePictureUpload = () => {
    };

    const handleCoverPhotoUpload = () => {
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = (emails) => {
        return emailRegex.test(emails);
    };
    var isValid = isEmailValid(email);
    // var isValid = true;
    const UpdateProfile = async () => {
        let tok = localStorage.getItem("accessToken");
        var data1 = new FormData();

        if (isValid == true) {
            if (name) {
                data1.append("name", name)
            }
            if (bio) {
                data1.append("bio", bio)
            }
            if (twitter) {
                data1.append("twitterUserName", twitter)
            }
            if (insta) {
                const instagram = insta?.includes('https://') ? insta : `https://${insta}`;
                data1.append("instagramLink", instagram)
            }
            if (site) {
                const website = site?.includes('https://') ? site : `https://${site}`;
                data1.append("websiteLink", website)
            }
            if (reddit) {
                const redditt = reddit?.includes('https://') ? reddit : `https://${reddit}`;
                data1.append("redditLink", redditt)
            }
            if (discord) {
                const discordd = discord?.includes('https://') ? discord : `https://${discord}`;
                data1.append("discordLink", discordd)
            }
            if (medium) {
                const mediumm = medium?.includes('https://') ? medium : `https://${medium}`;
                data1.append("mediumLink", mediumm)
            }
            if (telegram) {
                const telegramm = telegram?.includes('https://') ? telegram : `https://${telegram}`;
                data1.append("telegramLink", telegramm)
            }
            if (email) {
                // const emaill = email?.includes('https://') ? email : `https://${email}`;
                data1.append("email", email)
            }
            if (profilePicture) {
                data1.append("picture", profilePicture)
            }
            if (coverPhoto) {
                data1.append("coverPicture", coverPhoto)
            }


            // setLoader(true)
            var config = {
                method: "patch",
                url: `${api_url}/users/profile`,
                headers: {
                    authorization: `Bearer ` + tok
                },
                data: data1,
            };
            axios(config)
                .then(function (response) {
                    // console.log("responsce", response)
                    toast.success('User Profile Updated', {
                        position: 'top-right',
                        autoClose: 5000,
                    });
                    setProfilePicture(null)
                    setCoverPhoto(null)
                    setName("")
                    setBio("")
                    setTwitter("")
                    setInsta("")
                    setSite("")
                    setReddit("")
                    setDiscord("")
                    setMedium("")
                    setTelegram("")
                    setEmail("")
                    GetUserDetail();
                    // setLoader(false);
                })
                .catch(function (error) {
                    // console.log("response",error.response.data.statusCode)
                    // setLoader(false);
                    if (error.response.data.statusCode == 401) {
                        toast.error('Jwt expired/invalid', {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                    } else if (error.response.data.statusCode == 500) {
                        toast.error('Something went wrong', {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                    }
                    else if (error.response.data.statusCode == 400) {
                        toast.error(error.response.data.message, {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                    }
                    else if (error.response.data.statusCode == 409) {
                        toast.error('Email Already Exist', {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                    }

                });
        }
        else {
            toast.error('Please verify your email', {
                position: 'top-right',
                autoClose: 5000,
            });
        }

    }

    useEffect(() => {
        GetUserDetail()
    }, [account])

    const GetUserDetail = () => {
        let tok = localStorage.getItem("accessToken");
        var config = {
            method: "get",
            url: `${api_url}/users/get-user-profile`,
            headers: {
                authorization: `Bearer ` + tok
            },
        };

        axios(config)
            .then(function (response) {
                // setdetailsingle(response.data.data)
                setName(response.data.data.name)
                setBio(response.data.data.bio)
                setTwitter(response.data.data.twitterUserName)
                setInsta(response.data.data.instagramLink)
                setSite(response.data.data.websiteLink)
                setReddit(response.data.data.redditLink)
                setDiscord(response.data.data.discordLink)
                setMedium(response.data.data.mediumLink)
                setTelegram(response.data.data.telegramLink)
                setProfilePicture1(response.data.data.picture)
                setCoverPhoto1(response.data.data.coverPicture)
                setEmail(response.data.data.email)
                // setCoverPhoto(response.data.data.coverPicture)
                // setName(response.data.data.bio)
                // setName(response.data.data.bio)
                // setLoader(false);

            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    }
    // console.log("userdetail",detailsingle)

    // console.log("name",name)
    // console.log("Profile Picture Uploaded:", profilePicture);
    // console.log("Cover Photo Uploaded:", coverPhoto);

    return (
        <>
            <Navbar />
            <section className="editprofile">
                <div className="custom-container-small">
                    <div className="main-heading">
                        <h6>Edit Your Profile</h6>
                        <p>You can set preferred display name and manage other personal settings</p>
                    </div>
                    <div className="bottom-twice-content">
                        <div className="left-content">
                            <div className="option-field">
                                <label>Display name</label>
                                <input value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your display name here...' />
                            </div>
                            <div className="option-field">
                                <label>Bio</label>
                                <input value={bio} name='bio' onChange={(e) => setBio(e.target.value)} type="text" placeholder='tell about yourself in a few words' />
                            </div>
                            <div className="option-field">
                                <label>Twitter Handle</label>
                                <input value={twitter} name='twitterUserName' onChange={(e) => setTwitter(e.target.value)} type="text" placeholder='@enter your name in twitter' />
                                {/* <a href="#" className='btn-connect'>connect</a> */}
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>Instagram Handle</label>
                                    <input value={insta} name='instagramLink' onChange={(e) => setInsta(e.target.value)} type="text" placeholder='enter your instagram' />
                                </div>
                                <div className="option-field">
                                    <label>Your site</label>
                                    <input value={site} name='websiteLink' onChange={(e) => setSite(e.target.value)} type="text" placeholder='yoursite.io' />
                                </div>
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>Reddit</label>
                                    <input value={reddit} name='redditLink' onChange={(e) => setReddit(e.target.value)} type="text" placeholder='enter your reddit' />
                                </div>
                                <div className="option-field">
                                    <label>Discord</label>
                                    <input value={discord} name='discordLink' onChange={(e) => setDiscord(e.target.value)} type="text" placeholder='Discord' />
                                </div>
                            </div>
                            <div className="twice-field">
                                <div className="option-field">
                                    <label>Medium</label>
                                    <input value={medium} name='mediumLink' onChange={(e) => setMedium(e.target.value)} type="text" placeholder='enter your Medium' />
                                </div>
                                <div className="option-field">
                                    <label>Telegram</label>
                                    <input value={telegram} name='telegramLink' onChange={(e) => setTelegram(e.target.value)} type="text" placeholder='yoursite.io' />
                                </div>
                            </div>
                            <div className="option-field">
                                <label>Wallet address</label>
                                <input type="text" value={account} />
                                <a href="#" className='btn-connect'>copy</a>
                            </div>
                            <div className="option-field">
                                <label>Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='enter your email address' />
                            </div>
                            <a onClick={UpdateProfile} href="#" className='btn-update'>Update Profile</a>
                        </div>
                        <div className="right-content">
                            <div className="profile-picture-parent">
                                <h6>Profile Picture</h6>
                                {profilePicture ?
                                    (
                                        <>
                                            {profilePicture ?
                                                (
                                                    <div className="twice-content">
                                                        <div className="profile">
                                                            <img src={profilePicture ? URL.createObjectURL(profilePicture) : '/assets/profile.png'} alt="img" className='img-fluid' />
                                                        </div>
                                                        <div className="right-text">
                                                            <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                                            <label onClick={handleProfilePictureUpload} htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                                            <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className="twice-content">
                                                        <div className="profile">
                                                            <img src='/assets/profile.png' alt="img" className='img-fluid' />
                                                        </div>
                                                        <div className="right-text">
                                                            <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                                            <label onClick={handleProfilePictureUpload} htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                                            <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </>

                                    )
                                    :
                                    (
                                        <>
                                            {profilePicture1 ?
                                                (
                                                    <div className="twice-content">
                                                        <div className="profile">
                                                            <img src={profilePicture1 ? profilePicture1 : ""} alt="img" className='img-fluid' />
                                                        </div>
                                                        <div className="right-text">
                                                            <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                                            <label onClick={handleProfilePictureUpload} htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                                            <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className="twice-content">
                                                        <div className="profile">
                                                            <img src='/assets/profile.png' alt="img" className='img-fluid' />
                                                        </div>
                                                        <div className="right-text">
                                                            <p>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</p>
                                                            <label onClick={handleProfilePictureUpload} htmlFor="upload" className='btn-upload' >Upload Photo</label>
                                                            <input type="file" className='d-none' id='upload' onChange={handleProfilePictureChange} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }

                            </div>
                            <div className="cover-photo">
                                <h6>Cover Photo</h6>
                                {coverPhoto ?
                                    (
                                        <>
                                            {coverPhoto ?
                                                (
                                                    <div>
                                                        <div className="cover-main">
                                                            <img src={coverPhoto ? URL.createObjectURL(coverPhoto) : '/assets/cover.png'} alt="img" className='img-fluid' />
                                                        </div>
                                                        <label onClick={handleCoverPhotoUpload} htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                                        <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div>
                                                        <div className="cover-main">
                                                            <img src='/assets/cover.png' alt="img" className='img-fluid' />
                                                        </div>
                                                        <label onClick={handleCoverPhotoUpload} htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                                        <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                                                    </div>
                                                )
                                            }

                                        </>

                                    )
                                    :
                                    (
                                        <>
                                            {coverPhoto1 ?
                                                (
                                                    <div>
                                                        <div className="cover-main">
                                                            <img src={coverPhoto1 ? coverPhoto1 : '/assets/cover.png'} alt="img" className='img-fluid' />
                                                        </div>
                                                        <label onClick={handleCoverPhotoUpload} htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                                        <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div>
                                                        <div className="cover-main">
                                                            <img src='/assets/cover.png' alt="img" className='img-fluid' />
                                                        </div>
                                                        <label onClick={handleCoverPhotoUpload} htmlFor="uploadcover" className='btn-cover'>Upload Cover</label>
                                                        <input onChange={handleCoverPhotoChange} type="file" className='d-none' id='uploadcover' />
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Editprofile;