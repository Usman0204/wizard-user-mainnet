import Auctionbid from "./components/auctionbid";
import Banner from "./components/banner";
import Footer from "./components/footer";
import Launchpaddrops from "./components/launchpaddrops";
import Liveauction from "./components/liveauction";
import Navbar from "./components/navbar";
import Newcollections from "./components/newcollections";
import Topcollections from "./components/topcollections";
import Topseller from "./components/topseller";



export default function Home() {
  return (
    <>
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
