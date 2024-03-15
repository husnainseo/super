import React, { FC } from "react";
import { IListing } from "@/types/types";
import Pricing from "../ui/pricing";
import TimeAgo from "../ui/timeAgo";
import { IoTimeOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { RiBuilding3Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";

type Props = {
  listing: IListing;
};

const PropertyOverview: FC<Props> = ({ listing }) => {
  return (
    <div className="px-8  flex flex-col gap-5 w-full max-w-[809px] bg-white">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-medium mb-2 capitalize">{listing.title + " for " + listing.purpose}</div>
          <div className="flex gap-5 items-center text-md font-medium capitalize w-full">
            <span className="flex gap-2 items-center ">
              <BiArea />
              <p className="capitalize">
                {listing.area.size}&nbsp;{listing.area.type}
              </p>
            </span>
            <span className="flex gap-2 items-center">
              <RiBuilding3Line />
              <p>{listing.subPropertyType}</p>
            </span>
            <span className="flex gap-2 items-center">
              <HiOutlineLocationMarker />
              <p>{listing.city}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-3xl font-medium mb-2">
          <span className="text-xs font-medium mr-1">PKR</span>
          <Pricing price={listing.price} />
        </h2>
        <p className="flex items-center gap-1 text-zinc-500"> Added
          <IoTimeOutline /><TimeAgo time={new Date(listing.createdAt)} />
        </p>
      </div>

    </div>
  );
};

export default PropertyOverview;
