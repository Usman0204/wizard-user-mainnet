import React, { useEffect, useState } from 'react'
import Environment from '@/utils/Enviroment';
import axios from 'axios';
import Link from 'next/link';

const Authorcollection = ({ tab }) => {
    const api_url = Environment.api_url;
    const [offset, setOffset] = useState(1)
    const [dataset, setdataset] = useState([]);
    const [loader, setLoader] = useState(false)
    const Getlaunchpaddetail = () => {
        setdataset('')
        let tok = localStorage.getItem("accessToken");
        var config = ''

        // Assuming offset and limit are variables that hold the respective values
        // You can also set default values for them
        // let offset = offset; // default value
        const limit = 50; // default value
        setLoader(true)
        // let api = {
        //     owned: 'nfts-owned',
        //     onsale: 'nfts-on-sale'
        // }
        // console.log("api tabs",api?.[tab])
        config = {
            method: "get",
            // Add the offset and limit as query parameters in the URL
            url: `${api_url}/users/collections?offset=${offset}&limit=${limit}`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset(response.data.data)
                // Other code...
                setLoader(false)
            })
            .catch(function (error) {
                setLoader(false)
                // Error handling...
            });
    }
    useEffect(() => {
        Getlaunchpaddetail()
    }, [offset])

// console.log("datasset", dataset)

    const mainCardData = [
        {
            imageUrl: "/assets/dummy-imgs/allcards/5.png",
            title: "Scream Society OG",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/6.png",
            title: "Bullish Monkeys",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/7.png",
            title: "Kinzoku",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/8.png",
            title: "Pixel Mob",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/5.png",
            title: "Scream Society OG",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/6.png",
            title: "Bullish Monkeys",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/7.png",
            title: "Kinzoku",
        },
        {
            imageUrl: "/assets/dummy-imgs/allcards/8.png",
            title: "Pixel Mob",
        },
    ]
    return (
        <>
            <section className="author-collection-tab">
                <div className="bottom-cards">
                    {dataset?.userCollections?.map((card, index) => (
                        <Link key={index} href={`collectiondetailpage?id=${card?._id}`}>
                        <div className="main-card">
                            <div className="main-img">
                                <img src={card.imageUrl} alt="img" className='img-fluid' />
                            </div>
                            <div className="bottom-text">
                                <h5>{card.name}</h5>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Authorcollection
