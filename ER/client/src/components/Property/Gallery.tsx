"use client";
import React, { useState, FC } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Alert from "../ui/Modal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImageSlides from "./ImageSlides";
import { IListing } from "@/types/types";

type Props = {
  listing: IListing;
};

const Gallery: FC<Props> = ({ listing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const handleNext = () => {
    setSlide((prevSlide) => (prevSlide + 1) % listing.images.length);
  };

  const handlePrev = () => {
    setSlide(
      (prevSlide) =>
        (prevSlide - 1 + listing.images.length) % listing.images.length
    );
  };
  const handleAlert = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-col">
        {isOpen && (
          <Alert
            closeAlert={handleAlert}
            component={<ImageSlides images={listing.images} />}
          />
        )}
        <div className="noSelect relative rounded-xl max-w-[1224px] flex items-center justify-center p-2 overflow-hidden">
          {listing.images.length >= 2 && (
            <>
              <IoIosArrowBack
                onClick={handlePrev}
                className="absolute top-12 left-8 text-4xl text-white cursor-pointer bg-black/50 rounded-full p-2 z-10"
              />
              <IoIosArrowForward
                onClick={handleNext}
                className="absolute top-12 left-20 text-4xl text-white cursor-pointer bg-black/50 rounded-full p-2 z-10"
              />
            </>
          )}

          {listing.images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt="property"
              height={500}
              width={1224}
              className={`${
                slide === index ? "block" : "hidden"
              } h-[300px] rounded-md xs:h-[500px] w-[1224px] object-cover transition-transform transform group-hover:scale-110`}
            />
          ))}
          {listing.images.length <= 2 && (
            <div className="absolute bg-black/50 px-2 py-1 bottom-4 right-4 text-white flex gap-2 items-center rounded-lg">
              <FaImage />
              <p>
                {listing.images.length > 1 && (slide+1)+"/"}
                {listing.images.length}
              </p>
            </div>
          )}
        </div>
        {listing.images.length >= 2 && (
          <>
          <div className="hidden xs:flex gap-2 p-2 ">
            {listing.images.slice(0, 8).map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt="property"
                height={80}
                width={88}
                onClick={() => setSlide(index)}
                className={` rounded-md h-[80px] w-[88px] object-cover `}
              />
            ))}
          </div>
          </>
        )}
        
      </div>
    </>
  );
};

export default Gallery;
