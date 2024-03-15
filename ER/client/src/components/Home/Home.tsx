"use client";
import React, { useState } from "react";
import SearchBar from "../SearchBar";
import StickyNavBar from "../StickyNavBar";
import SectionC from "./section-C";
import SectionE from "./section-E";
import Slider from "react-slick";
import Image from "next/image";
import { useGetAllListingsQuery } from "../../redux/features/listing/listingApi";
import Footer from "../Footer";
import CardSlider from "../ui/cardSlider";
import { IListing } from "@/types/types";

function Home() {
  const [active, setActive] = useState(false);
  const { data: listings, isLoading } = useGetAllListingsQuery({});
  const Images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const forRent = listings && listings.listings.filter((e:IListing)=>e.purpose.includes("rent"));
  const forSale = listings && listings.listings.filter((e:IListing)=>e.purpose.includes("sale"));

  return (
    <>
      <div className="relative h-full w-full font-Poppins">
        <StickyNavBar />
        <div className="overflow-hidden relative mb-12 bg-gradient-to-r mt-[-60px] from-[#4A0370] to-[#2e5da8] ... h-[352px] shadow-inner ... rounded-3xl w-[98%] mx-auto ">
          {!active && (
            <div className="absolute z-10 bottom-2 2xl:top-56 left-1/2 transform -translate-x-1/2">
              <SearchBar active={active}></SearchBar>
            </div>
          )}
          <Slider {...settings}>
            {Images.map((image, index) => {
              return (
                <Image
                  key={index}
                  src={image}
                  alt="hero"
                  width={5000}
                  height={3000}
                  className="w-[98%] h-[352px] object-cover rounded-3xl"
                />
              );
            })}
          </Slider>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>
        </div>
        <SectionC />
        {listings && <CardSlider title="Recent Properties for Rent" listings={forRent} />}
        {listings && <CardSlider title="Recent Properties for Sale" listings={forSale} />}
        <SectionE />
        <Footer />
      </div>
    </>
  );
}

export default Home;
