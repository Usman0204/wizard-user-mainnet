import React, { useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import axios from 'axios';
import Environment from '@/utils/Enviroment';
// import { useState } from 'react'
import { toast } from 'react-toastify';


const Contactus = () => {

    const api_url = Environment?.api_url;
    const [first, setfirst] = useState('');
    const [last, setlast] = useState('');
    const [email, setemail] = useState('');
    const [message, setmessage] = useState('');

    // console.log("sdsdsds", first, last, email, message)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = (emails) => {
        return emailRegex.test(emails);
    };
    var isValid = isEmailValid(email);
    // var isValid = true;
    const onSubmit = () => {
        if (first !== '') {
            if (last !== '') {
                if (email !== '') {
                    if (isValid === true) {
                        if (message !== '') {
                            axios
                                .post(`${api_url}/users/aboutUs`, {
                                    firstName: first,
                                    lastName: last,
                                    email: email,
                                    message: message,
                                })
                                .then((response) => {
                                    setfirst('')
                                    setlast('')
                                    setemail('')
                                    setmessage('')
                                    toast.success("Message sent Successfully")
                                    // setOpens(false);
                                    // history.push("/thankyou?" + response.data.data._id);
                                    // window.$('#exampleModalwhite445').modal('show');
                                })
                                .catch((err) => {
                                    // setOpens(false);
                                    console.log("e", err);
                                    if (err.response.data.statusCode == 201) {
                                        toast.error("Pre-order creation success", {
                                            position: "top-center",
                                            autoClose: 5000,
                                        });
                                    } else if (err.response.data.statusCode == 400) {
                                        toast.error("Validation error", {
                                            position: "top-center",
                                            autoClose: 5000,
                                        });
                                    } else if (err.response.data.statusCode == 500) {
                                        toast.error("Something went wrong", {
                                            position: "top-center",
                                            autoClose: 5000,
                                        });
                                    }
                                });
                        }
                        else {
                            toast.error("Message Required")
                        }
                    }
                    else {
                        toast.error("Email must be valid email")
                    }
                }
                else {
                    toast.error("Email Required")
                }
            }
            else {
                toast.error("LastName Required")
            }

        }
        else {
            toast.error("FirstName Required")
        }
    };

    return (
        <>
            <Navbar />
            <section className="contactus">
                <span className="topshadow"></span>
                <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
                <div className="contactus-container">
                    <div className="row">
                        <div className="col-xl-7 col-12 m-auto padd-sm">
                            <div className="contactusleftmain">
                                <div className="contactusleft">
                                    <h4 className="contacthead">Let’s chat, Reach out to us</h4>
                                    <p className="contactpara">Have questions or feedback? we’re here to help. Send us a message, and we’ll respond within 24 hours.</p>
                                    <div className="contactmaininput">
                                        <div className="contactinnerinput">
                                            <p className="contactinputpara">First name</p>
                                            <input type="text" value={first} onChange={(e) => setfirst(e.target.value)} className="contactusinnerinput" placeholder='First Name' />
                                        </div>
                                        <div className="contactinnerinput">
                                            <p className="contactinputpara">Last name</p>
                                            <input type="text" value={last} onChange={(e) => setlast(e.target.value)} className="contactusinnerinput" placeholder='Last name' />
                                        </div>
                                    </div>
                                    <div className="contactinnerinput">
                                        <p className="contactinputpara">Email address</p>
                                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="contactusinnerinput" placeholder='Email address' />
                                    </div>
                                    <div className="contactinnerinput">
                                        <p className="contactinputpara">Message</p>
                                        <textarea value={message} onChange={(e) => setmessage(e.target.value)} className="contactusinnertextarea" placeholder='Leave us message' ></textarea>
                                    </div>
                                    <button onClick={onSubmit} className="contactusbtn">Submit</button>
                                </div>
                                <div className="contactusleftlower">
                                    <img src="\assets\contactusassets\message.svg" alt="contactusimg" className="contactusimg" />
                                    <div className="contactusleftlowertext">
                                        <p className="contactusleftlowerpara">Email Address</p>
                                        <h6 className="contactusleftlowerhead">help@wizardgallery.com</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-12 padd-sm displaynoneinmobile">
                            <div className="wrapper-img">
                                <img src="\assets\landing\static\banner-img1.png" alt="img" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contactus