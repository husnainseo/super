import React, { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IListingImage } from "@/types/types";

type Props = {
  images:IListingImage[];
};

const ImageSlides: FC<Props> = ({ images }) => {
  const [slide, setSlide] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setSlide((prevSlide) => (prevSlide + 1) % images.length);
    scrollThumbnailContainer();
  };

  const handlePrev = () => {
  
    setSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    scrollThumbnailContainer();
  };

  const scrollThumbnailContainer = () => {
    if (thumbnailContainerRef.current) {
      if (slide === 0) {
        thumbnailContainerRef.current.scrollLeft = 0;
      } else {
        const thumbnailWidth =
          thumbnailContainerRef.current.children[0].clientWidth;
        thumbnailContainerRef.current.scrollLeft = Math.max(
          0,
          slide * thumbnailWidth
        );
      }
    }
  };

  useEffect(() => {
    scrollThumbnailContainer();
  }, [slide,scrollThumbnailContainer]);

  return (
    <>
      <div className="noSelect flex flex-col items-center gap-10 transition-all pb-5 px-5">
        <div className="relative flex max-w-[970px] max-h-[450px] object-cover overflow-hidden px-5 items-center justify-center">
          <IoIosArrowBack
            onClick={handlePrev}
            className="absolute top-1/2 left-2 text-3xl text-white cursor-pointer bg-black/50 rounded-full p-2"
          />
          <IoIosArrowForward
            onClick={handleNext}
            className="absolute top-1/2 right-2 text-3xl text-white cursor-pointer bg-black/50 rounded-full p-2"
          />
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt="property"
              height={450}
              width={815}
              className={`${
                slide === index ? "block" : "hidden"
              } rounded-xl h-[450px] w-[815px] object-cover mx-8 transition-all`}
            />
          ))}
        </div>
        <div
          ref={thumbnailContainerRef}
          className="flex gap-3 max-w-[815px] overflow-x-scroll scroll-smooth items-center justify-center rounded-xl"
        >
          {images.map((image, index) => (
            <Image
              onClick={() => setSlide(index)}
              key={index}
              height={132}
              width={217}
              src={image.url}
              alt="property"
              className={`${
                slide === index && " border-2 border-purple-800"
              } hover:cursor-pointer rounded-xl h-[132px] w-[217px] object-cover`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageSlides;
