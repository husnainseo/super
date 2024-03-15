import React, { FC, useEffect } from "react";
import Image from "next/image";
import { IoBedOutline } from "react-icons/io5";
import { LuShowerHead } from "react-icons/lu";
import { BiArea } from "react-icons/bi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import TimeAgo from "./timeAgo";
import Pricing from "../ui/pricing";
type ImageType = {
  url: string;
  public_id: string;
  _id: string;
};

type Props = {
  price: number;
  location: string;
  areaSize: number;
  areaType: string;
  beds: string;
  baths: string;
  image: ImageType[];
  subPropertyType: string;
  city: string;
  time: Date;
  width?:boolean;
  purpose:string;
};

const PropertyCard: FC<Props> = ({
  price,
  location,
  areaSize,
  areaType,
  beds,
  baths,
  image,
  time,
  subPropertyType,
  city,
  width,
  purpose,
}) => {
  const [count, setCount] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const slideImages = () => {
      if (sliderRef.current) {
        const slides = sliderRef.current.querySelectorAll(".slide");
        slides.forEach((slide: Element, index: number) => {
          (slide as HTMLElement).style.transform = `translateX(-${
            count * 100
          }%)`;
        });
      }
    };

    const initializeSlides = () => {
      if (sliderRef.current) {
        const slides = sliderRef.current.querySelectorAll(".slide");
        slides.forEach((slide: Element, index: number) => {
          (slide as HTMLElement).style.left = `${index * 100}%`;
        });
      }
    };

    initializeSlides();

    slideImages();
  }, [count]);

  const handleNext = () => {
    if (count === image.length - 1) {
      return;
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (count === 0) {
      return;
    } else {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={`${width ? "w-72":"w-[260px]"} font-Poppins bg-white`}>
        <div
          className="pic h-40 rounded-t-md relative overflow-hidden group"
          ref={sliderRef}
        >
           <div className="z-[2] rounded font-medium text-[.6rem] p-1 text-white absolute right-2 top-2 bg-black/40 capitalize">{`for ${purpose}`}</div>
          {image.slice(0, 2).map((img: ImageType, index: number) => (
            <>
              <Image
                key={index}
                src={img.url}
                height={450}
                width={300}
                alt="cover"
                className={`slide w-full h-full transition duration-500 absolute left-[${
                  index * 100
                }%]`}
              />

              {image.length > 1 && (
                <>
               
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full hidden group-hover:block">
                    <div className="flex justify-between w-full px-2 text-2x font-thin">
                      <button onClick={handlePrev} className="">
                        <TfiArrowCircleLeft
                          className={`${
                            count === 0
                              ? "bg-black/20 text-white/10"
                              : "bg-black/30 text-white"
                          } text-xl rounded-full font-thin`}
                        />
                      </button>
                      <button onClick={handleNext} className="">
                        <TfiArrowCircleRight
                          className={`${
                            count === 2
                              ? "bg-black/20 text-white/10"
                              : "bg-black/30 text-white"
                          } rounded-full text-xl`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 mb-1 p-1 rounded-2xl left-1/2 transform -translate-x-1/2 flex justify-center items-center bg-black/30">
                    {image.map((img: ImageType, index: number) => (
                      <span
                        key={index}
                        className={`
                      bg-white
                      ${count === index ? "p-[.20rem]" : "p-[.15rem]"}
                     
                      rounded-full
                      mx-1
                      cursor-pointer
                    `}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </>
          ))}
        </div>
        <div className="p-2 border border-t-0 rounded-b flex-col flex gap-2">
          <div className="flex justify-between items-center">
            <h1 className="flex items-center gap-1">
              <p className="text-sm">PKR</p>
              <p className="text-xl font-medium">{<Pricing price={price}/>}</p>
            </h1>
            <span className="text-xs text-zinc-400 capitalize">
              {subPropertyType}
            </span>
          </div>

          <div className="flex gap-3">
            <span className="flex items-center gap-1 text-sm">
              <IoBedOutline />
              <p className="text-xs">{beds}</p>
            </span>
            <span className="flex items-center gap-1 text-sm">
              <LuShowerHead />
              <p className="text-xs">{baths}</p>
            </span>
            <span className="flex items-center gap-1 text-sm">
              <BiArea />
              <p className="text-xs">{areaSize}</p>
              <p className="text-xs capitalize">{areaType}</p>
            </span>
          </div>
          <div className="flex text-sm gap-1 capitalize">
            <p>{location},</p> <p>{city}</p>
          </div>
          <p className="text-zinc-400 text-[.7rem]">
          Added <TimeAgo time={new Date(time)}/>
          </p>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
