import React, { FC } from "react";
import Image from "next/image";
import { IListing } from "@/types/types";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineAddIcCall } from "react-icons/md";

type Props = {
  listing: IListing;
};

const ContactCard: FC<Props> = ({ listing }) => {
  return (
    <div className="max-w-[400px] border rounded-xl">
      <div className="p-2 bg-white rounded-xl flex flex-col gap-2 ">
        <div className="flex gap-5">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={listing.postedBy.profile.image.url}
              alt="profile"
              height={108}
              width={130}
              className="h-[108px] w-[130px] rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium capitalize">
              {listing.postedBy.name}
            </p>
            <p className="text-xs">Posted By</p>
            <p className="capitalize font-light text-md">{listing.postedBy.email}</p>
            <p className="text-md font-medium">View Profile</p>
          </div>
        </div>
        <div className="hidden xs:flex gap-2 h-10 justify-center">
        <button className="flex items-center text-white justify-center gap-2 bg-[#24292e] border rounded-lg flex-1">
          <MdOutlineAddIcCall />
          Call
        </button>
        <button className="flex items-center justify-center bg-[#27ae60] text-white rounded-lg w-12 text-xl">
          <FaWhatsapp />
        </button>
      </div>
        
      </div>
    </div>
  );
};

export default ContactCard;
