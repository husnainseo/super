import React, { FC } from "react";
import Gallery from "./Gallery";
import PropertyOverview from "./propertyOverview";
import ContactCard from "./SideCard";
import Description from "./Overview";
import { useSingleListingQuery } from "@/redux/features/listing/listingApi";
import Amenities from "./Amenities";
import Location from "./Location";
import { IListing } from "@/types/types";
import StickyNavBar from "../StickyNavBar";
import CardSlider from "../ui/cardSlider";
import { useGetAllListingsQuery } from "../../redux/features/listing/listingApi";
import Title from "./TitleAndContact";
import Footer from "../Footer";

type Props = {
  id: string;
};

const Main: FC<Props> = ({ id }) => {
  const [show, setShow] = React.useState(false);
  const { data: listings, isLoading } = useGetAllListingsQuery({});
  const { data: listing } = useSingleListingQuery(id) as {
    data: { listing: IListing };
  };
  if (!listing) return <div>Loading...</div>;
  const limit = listing.listing.images.length > 1 ? 720 : 650;
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > limit) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }

  const similarProperties = listings.listings
    .filter((e: IListing) => e.city.includes(listing.listing.city) && e.purpose === listing.listing.purpose && e._id !== listing.listing._id);

  return (
    <div>
      <StickyNavBar bgChange={true} />
      {show && (
        <div className="first hidden xs:block fixed h-20 top-16 bg-white shadow-md w-full mx-auto z-10 py-4">
          <Title listing={listing.listing} />
        </div>
      )}
      <div className="max-w-[1224px] mx-auto flex-col flex gap-5 relative">
        <Gallery listing={listing.listing} />
        <div className="flex gap-5">
          <div className="flex-1 flex-col gap-5 flex max-w-[809px]">
            <PropertyOverview listing={listing.listing} />
            <hr />
            <Description listing={listing.listing} />
            <hr />
            {listing.listing.features.length > 0 && (
              <>
                <Amenities listing={listing.listing} />
                <hr />
              </>
            )}
            <Location listing={listing.listing} />
            <div className="xs:hidden flex justify-center">
              <ContactCard listing={listing.listing} />
            </div>
          </div>
          <div className="xs:block hidden">
            <ContactCard listing={listing.listing} />
          </div>
        </div>
      </div>
      <div className="mt-5 mb-24">
        {similarProperties.length > 0 && <CardSlider title="Similar properties" listings={similarProperties} />}
      </div>
      <div className="fixed xs:hidden h-20 bottom-0 bg-white shadow-md w-full mx-auto z-10 py-4">
        <Title listing={listing.listing} />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
