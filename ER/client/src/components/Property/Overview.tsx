import { IListing } from "@/types/types";
import React, { FC } from "react";

type Props = {
  listing: IListing;
};

const Description: FC<Props> = ({ listing }) => {
  return (
    <div className="p-8 rounded-xl flex flex-col gap-5 w-full max-w-[809px]  bg-white">
      <div className="text-2xl font-medium">Description</div>
      <div className="flex gap-10 items-center text-xl font-light  w-full">
        {`${listing.description} "Captivating property boasting spacious interiors, modern amenities, and abundant natural light. Versatile and meticulously cared for, this inviting space offers a perfect blend of comfort and functionality for various purposes."`}
      </div>
    </div>
  );
};

export default Description;
