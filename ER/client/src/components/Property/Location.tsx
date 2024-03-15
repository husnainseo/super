import React ,{FC}from "react";
import Map from "../Dashboard/mapbox";
import { IListing } from "@/types/types";
type Props={
  listing:IListing
}

const Location:FC<Props> = ({listing}) => {
  return (
<div className="p-8 rounded-xl flex flex-col gap-5 w-full max-w-[809px]  bg-white">
      <div className="text-2xl font-medium">Location</div>
      <Map location={listing.city} accessToken="pk.eyJ1IjoiaHVzbmFpbml6aGFyIiwiYSI6ImNscjVjemQyaDAzdngyamtxaW4zamF3ZHgifQ.Mv3uR0vH7mfZdcDKWQOkJQ" />
      </div>
  );
};  

export default Location;
