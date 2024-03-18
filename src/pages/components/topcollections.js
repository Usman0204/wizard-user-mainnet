import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Environment from '@/utils/Enviroment';

const TopCollection = () => {
  const [time, setTime] = useState({ name: 'Last 30 days', value: 'month'})
  const [loader, setLoader]= useState(false)
  // const collectionsData = [
  //   { count: 1, img_url: "/assets/dummy-imgs/top-collections/img1.png", name: 'Dinosaurium', floor: 310.21, core: 6523.8, percentage: 1.24 },
  //   { count: 2, img_url: "/assets/dummy-imgs/top-collections/img2.png", name: 'TechRaptors', floor: 456.78, core: 8231.2, percentage: 0.97 },
  //   { count: 3, img_url: "/assets/dummy-imgs/top-collections/img3.png", name: 'CryptoSaur', floor: 289.54, core: 7312.6, percentage: 2.53 },
  //   { count: 4, img_url: "/assets/dummy-imgs/top-collections/img4.png", name: 'Bitosaurus', floor: 378.92, core: 9876.4, percentage: 0.81 },
  //   { count: 5, img_url: "/assets/dummy-imgs/top-collections/img5.png", name: 'EtherRex', floor: 234.67, core: 5643.9, percentage: 1.79 },
  //   { count: 6, img_url: "/assets/dummy-imgs/top-collections/img6.png", name: 'NFTerra', floor: 421.35, core: 8965.7, percentage: 0.62 },
  //   { count: 7, img_url: "/assets/dummy-imgs/top-collections/img7.png", name: 'Blockosaurus', floor: 267.89, core: 7543.2, percentage: 3.15 },
  //   { count: 8, img_url: "/assets/dummy-imgs/top-collections/img8.png", name: 'PixelDinos', floor: 342.76, core: 6123.5, percentage: 1.43 },
  //   { count: 9, img_url: "/assets/dummy-imgs/top-collections/img9.png", name: 'ArtisticRex', floor: 398.45, core: 7542.1, percentage: 0.95 },
  //   { count: 10, img_url: "/assets/dummy-imgs/top-collections/img10.png", name: 'GalacticSaur', floor: 289.01, core: 8345.6, percentage: 1.08 },
  //   { count: 11, img_url: "/assets/dummy-imgs/top-collections/img11.png", name: 'VRaptor', floor: 376.54, core: 9456.3, percentage: 0.74 },
  //   { count: 12, img_url: "/assets/dummy-imgs/top-collections/img12.png", name: 'SpaceDinos', floor: 412.78, core: 7012.9, percentage: 1.92 },
  // ];


  const api_url = Environment.api_url
  const [mainCardData, setMainCardData] = useState([]);
  const [accessToken, setAccessToken] = useState("");




 
  const getLaunchPadDrops = async () => {
      try {
        setLoader(true)
        const response = await axios.get(`${api_url}/launchpads/top-collections?limit=10&offset=1&orderField=updatedAt&dateFilter=${time?.value}&orderDirection=-1`, {
              headers: {
                  Authorization: "Bearer " + accessToken,
                  'Content-Type': 'application/json',
              },
          });
       
          setMainCardData(response.data.data.launchpads);
        setLoader(false)
      } catch (error) {
        setLoader(false)
          console.error('Error fetching launch pad data:', error);
      }
  };
  useEffect(() => {
      const val = localStorage.getItem("accessToken");
      setAccessToken(val);
  }, []);


  useEffect(() => {
      // console.log("Access", accessToken);
      // if (accessToken) {
          getLaunchPadDrops();
      // }
  }, [time]);

  useEffect(() => {
    const storedData = localStorage.getItem('mainCardData');

    if (storedData) {
        setMainCardData(JSON.parse(storedData));
    } else {
        getLaunchPadDrops();
    }
}, []);

  return (
    <section className="top-collections">
      <div className="custom-container">
        <div className="upper-content">
          <h5>TOP Collections</h5>
          <div className="right-btns">
            <div className="dropdown">
              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {time?.name} <img src="\assets\landing\static\dropdown-arrow.svg" alt="img" className="img-fluid" />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 10 minutes', value: '10minutes'})}} >Last 10 minutes</a></li>
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 1 hour', value: '1hour'})}} >Last 1 hour</a></li>
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 6 hours', value: '6hours'})}} >Last 6 hours</a></li>
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 24 hours', value: 'day'})}} >Last 24 hours</a></li>
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 7 days', value: 'week'})}} >Last 7 days</a></li>
                <li><a className="dropdown-item" onClick={() => { setTime({ name: 'Last 30 days', value: 'month'})}} >Last 30 days</a></li>
              </ul>
            </div>
            <Link href="/discovercollection" className="btn-seeall">See All</Link>
          </div>
        </div>
        {
          mainCardData?.length < 1 && (loader ? <h4 className='text-center py-5 text-secondary'>Loading...</h4> :    <h4 className='text-center py-5 text-secondary'>No Collection for {time?.name}</h4>)
        }
        <div className="parent-collection">
          
          {mainCardData?.map((collection, index) => (
            <Link key={index} href={`/collections?id=${collection?._id}`}>
              <div className="single-collection">
                <div className="left-side">
                  <div className="inner-left">
                    <h6>{index + 1}</h6>
                    <div className="inner-right">
                      <div className="main-img">
                        <img src={collection.imageUrl} alt="img" className="img-fluid profile-img" />
                        <img src="\assets\landing\static\check.svg" alt="img" className="img-fluid check-img" />
                      </div>
                      <div className="text">
                        <h6>{collection.name}</h6>
                        <p><span>Floor:</span> {collection.price || 0} <span style={{textTransform: "uppercase"}}>Core</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="right-side">
                  {console.log(collection)}
                  <h6>{collection.core} <span>Core</span></h6>
                  <p><img src="\assets\landing\static\red-arrow.svg" alt="img" className="img-fluid" />{collection.percentage}%</p>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCollection;
