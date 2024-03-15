import React, { FC } from "react";
import NavBar from "../StickyNavBar";
import Footer from "../Footer";
import { useGetAllListingsQuery } from "../../redux/features/listing/listingApi";
import { IListing } from "@/types/types";
import CardSlider from "../ui/cardSlider";
import AdvanceSearch from "../ui/advanceSearch";
import { ReadonlyURLSearchParams } from "next/navigation";


type Props = {
  query: string | null | undefined;
  path:string | null;
  searchParams:ReadonlyURLSearchParams | null;
};

const Main: FC<Props> = ({ query ,path ,searchParams}) => {
  const { data: listings, isLoading, isError } = useGetAllListingsQuery({});

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }
  const forRent = listings.listings.filter((e:IListing)=>e.purpose.includes("rent"));

  const listingsByCity = Object.values(
    forRent.reduce((acc: Record<string, IListing[]>, listing: IListing) => {
      const city = listing.city;
      return {
        ...acc,
        [city]: [...(acc[city] ?? []), listing],
      };
    }, {})
  ) as IListing[][];


  return (
    <div>
      <NavBar bgChange />
      {listingsByCity.length > 0 && query && (
        <div className="flex flex-col gap-5 my-5">
          {listingsByCity.map((list, index) => (
            <CardSlider key={index} query={query} title={`Recent Properties from ${list[0].city}`} listings={list} />
          ))}
        </div>
      )}
       {!query && path && <AdvanceSearch path={path} listing={forRent} searchParams={searchParams}/>}
      <Footer />
    </div>
  );
};

export default Main;
