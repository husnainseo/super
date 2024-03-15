"use client"
import Home from "@/components/Home/Home";
import { MetaData } from "../utils/MetaData";
import Test from "../components/test";
import Sticky from "../components/StickyNavBar";

function page() {
  return (
    <>
    <div>
      <MetaData
        title="Emark Realty"
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
      <Home />
      {/* <Test /> */}
      {/* <Navbar handleLogout={()=>{}}/>
      <Sticky handleLogout={()=>{}}/> */}
    
    </div>
    </>
  );
}

export default page;
