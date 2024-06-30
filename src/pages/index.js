import Auctionbid from "./components/auctionbid";
import Banner from "./components/banner";
import Footer from "./components/footer";
import Launchpaddrops from "./components/launchpaddrops";
import Liveauction from "./components/liveauction";
import Maintenance from "./components/maintenance";
import Navbar from "./components/navbar";
import Newcollections from "./components/newcollections";
import Topcollections from "./components/topcollections";
import Topseller from "./components/topseller";



export default function Home() {
  return (
    <>
    {/* <Maintenance /> */}
      <Navbar />
      <Banner />
      <Topcollections />
      <Launchpaddrops />
      <Newcollections />
      <Liveauction />
      <Auctionbid />
      <Topseller />
      <Footer />
    </>
  )
}
