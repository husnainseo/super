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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const { data: listings, isLoading } = useGetAllListingsQuery({});
  const Images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

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

  const forRent = listings && listings.listings.filter((e: IListing) => e.purpose.includes("rent"));
  const forSale = listings && listings.listings.filter((e: IListing) => e.purpose.includes("sale"));

  return (
    <>
      <div className="relative h-full w-full font-Poppins">
        <StickyNavBar />
        <div className=" overflow-hidden relative  mb-12 bg-gradient-to-r mt-2 from-[#4A0370] to-[#2e5da8] ... h-[352px] shadow-inner ... rounded-3xl w-[98%] mx-auto ">
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
        </div>
          <div className="absolute z-10 top-[200px] 2xl:top-56 left-1/2 transform -translate-x-1/2 ">
            <SearchBar listings={listings && listings.listings}></SearchBar>
          </div>
          <div className="flex  flex-col gap-5">        <SectionC />
        {listings && <CardSlider title="Recent Properties for Rent" listings={forRent} />}
        {listings && <CardSlider title="Recent Properties for Sale" listings={forSale} />}
        <Footer />
        </div>

      </div>
    </>
  );
}

export default Home;
