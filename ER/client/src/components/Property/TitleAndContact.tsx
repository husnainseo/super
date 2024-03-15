import { IListing } from "@/types/types";
import React, { FC } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineAddIcCall } from "react-icons/md";

type Props = {
  listing: IListing;
};

const Title: FC<Props> = ({ listing }) => {
  return (
   <div className="flex justify-center xs:justify-between px-36 items-center">
    <p className="hidden xs:block font-medium text-2xl">{listing.title}</p>
    <div className="flex gap-2 h-12 justify-center">
        <button className="flex items-center text-lg text-white justify-center gap-2 bg-[#24292e] border rounded-lg flex-1 w-56">
          <MdOutlineAddIcCall />
          Call
        </button>
        <button className="flex items-center justify-center bg-[#27ae60] text-white text-2xl rounded-lg w-12">
          <FaWhatsapp />
        </button>
      </div>
   </div>
  );
};

export default Title;
