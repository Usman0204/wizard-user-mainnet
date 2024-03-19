import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Environment from '@/utils/Enviroment';

const TopCollection = () => {
  const [time, setTime] = useState({ name: 'Last 30 days', value: 'month'})
  const [loader, setLoader]= useState(false)
  const [coreUsdValue,setCoreUsdValue]=useState(0)
  const [curruncy, setCurruncy] = useState('Core')
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
  // Utility function to calculate percentage change
  function calculatePercentageChange(todayPrice, yesterdayPrice) {
    if (todayPrice === 0 && yesterdayPrice === 0) {
      return 0;
    }
    if (yesterdayPrice === 0) {
      return Infinity; // Or another logic for handling division by zero
    }
    return ((todayPrice - yesterdayPrice) / yesterdayPrice) * 100;
  }
  function getCoreUsdPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=coredaoorg&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
        console.log(`The current price of Bitcoin is $${data.coredaoorg.usd}`);
        setCoreUsdValue(data.coredaoorg.usd)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }
  useEffect(() => {
    getCoreUsdPrice()
  }, [])
  return (
    <section className="top-collections">
      <div className="custom-container">
        <div className="upper-content">
          <h5>TOP Collections</h5>
          <div className="right-btns">
            <div className="dropdown">
              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {curruncy} <img src="\assets\landing\static\dropdown-arrow.svg" alt="img" className="img-fluid" />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => { setCurruncy('Core') }} >Core</a></li>
                <li><a className="dropdown-item" onClick={() => { setCurruncy('USD')}} >USD</a></li>
              </ul>
            </div>
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
          {mainCardData?.map((collection, index) => {
            const percentageChange = calculatePercentageChange(
              collection?.cheapestNFTToday?.price || 0,
              collection?.cheapestNFTYesterday?.price || 0
            );

            // Determine the arrow and its color
            const arrowImageSrc = percentageChange > 0
              ? "/assets/landing/static/green-arrow.svg"
              : percentageChange < 0
                ? "/assets/landing/static/red-arrow.svg"
                : "/assets/landing/static/green-arrow.svg"; // Assuming you have a neutral icon for no change

            return (
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
                          {curruncy === 'USD' ?
                            <p><span>Floor:</span> {parseFloat(collection?.cheapestNFTToday?.price || 0) * parseFloat(coreUsdValue)} <span style={{ textTransform: "uppercase" }}>USD</span></p>

                          :
                          <p><span>Floor:</span> {collection?.cheapestNFTToday?.price || 0} <span style={{ textTransform: "uppercase" }}>Core</span></p>
                         }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-side">
                    <h6>{collection?.core} <span>Core</span></h6>
                    <p className={percentageChange >= 0 ? " text-light" : ""}><img src={arrowImageSrc} alt="percentage change" className={percentageChange > 0 ? "img-fluid" : 'd-none'} />{Math.abs(percentageChange.toFixed(2))}%</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCollection;
