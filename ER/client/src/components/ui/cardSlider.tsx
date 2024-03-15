import React, { FC, useRef, useState, useEffect } from "react";
import PropertyCard from "../../components/ui/propertyCard";
import { IListing } from "@/types/types";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { styles } from "../../Styles/style";

type Props = {
  listings: IListing[];
  title: string;
  query?: string;
}

const CardSlider: FC<Props> = ({ listings, title, query }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [listing, setListing] = useState(listings);
  const [activeBtn, setActiveBtn] = useState(query);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setListing(listings.filter((prop: IListing) => prop.propertyType.includes(query || "")));
  }, [listings, query]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth === scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 600;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 600;
    }
  };

  const handleClick = (e: string) => {
    setListing(listings.filter((prop: IListing) => prop.propertyType.includes(e)));
    setActiveBtn(e);
  }

  return (
    <>
      {listing.length > 0 && (
        <div className={`xl:mr-5 ml-5 ${listing.length > 3 && "xl:flex-col xl:flex"} items-center`}>
          <div className="relative max-w-[1188px] flex flex-col gap-5">
            <h2 className="text-xl font-medium text-start">{title}</h2>
            {query && (
              <div className="flex gap-5">
                {listings.some((e) => e.propertyType.includes("residential")) && (
                  <button onClick={() => handleClick("residential")} className={activeBtn === "residential" ? styles.activeButton : styles.inactiveButton}>
                    Residential
                  </button>
                )}
                {listings.some((e) => e.propertyType.includes("commercial")) && (
                  <button onClick={() => handleClick("commercial")} className={activeBtn === "commercial" ? styles.activeButton : styles.inactiveButton}>
                    Commercial
                  </button>
                )}
                {listings.some((e) => e.propertyType.includes("plot")) && (
                  <button onClick={() => handleClick("plot")} className={activeBtn === "plot" ? styles.activeButton : styles.inactiveButton}>
                    Plot
                  </button>
                )}
              </div>
            )}
            <div className="flex max-w-[1188px] overflow-auto xl:gap-3 scroll-smooth scrollbar-hidden" ref={containerRef}>
              {listing.length > 4 && (
                <IoIosArrowBack
                  className={`absolute left-[-40px] top-1/2 z-10 hidden xl:block cursor-pointer text-3xl ${isAtStart ? "text-purple-300" : "text-purple-800"}`}
                  onClick={handleScrollRight}
                />
              )}
              {listing.length > 4 && (
                <IoIosArrowForward
                  className={`absolute right-[-40px] hidden z-10 top-1/2 xl:block cursor-pointer text-3xl ${isAtEnd ? "text-purple-300" : "text-purple-800"}`}
                  onClick={handleScrollLeft}
                />
              )}
              {listing.slice(0, 10).map((property, index) => (
                <Link href={`/property/${property._id}`} key={index}>
                  <div key={index} className="mr-3 xl:mr-0">
                    <PropertyCard
                    width
                      price={property.price}
                      location={property.location}
                      areaSize={property.area.size}
                      areaType={property.area.type}
                      beds={property.bedrooms}
                      baths={property.bathrooms}
                      image={property.images}
                      time={property.createdAt}
                      subPropertyType={property.subPropertyType}
                      city={property.city}
                      purpose={property.purpose}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSlider;
