import React from "react";
// import useWindowDimensions from "../hooks/getDimensions"
// import mainloader from "../assets/logo.svg";
import Image from 'next/image';
const Loader = ({ text }) => {
  // const { width } = useWindowDimensions();

  return (
    <>
      <div className="">
        <div
          className="position-fixed w-100"
          style={{
            zIndex: 1100,
            // marginTop: -200,
            top: 0,
            height: "135%",
            marginLeft: 0,
            background: "rgba(0, 0, 0, 0.6)",
            webkitBackdropFilter: "blur(4px)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <Image
                width={150}
                height={150} // Add the height property for Next.js Image component
                src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                alt="loader"
                style={{
                  filter: 'invert(100%) sepia(8%) saturate(7447%) hue-rotate(233deg) brightness(283%) contrast(117%)',
                }}
              />
              {/* <div className="image-container">
                <img src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg" alt="Your Image" className="fade" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;
