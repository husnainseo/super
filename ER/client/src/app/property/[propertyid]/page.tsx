"use client"
import React from "react";
import { MetaData } from "../../../utils/MetaData";;
import Property from "../../../components/Property/Main";
import { useParams } from "next/navigation";

type Props = {};

const Page = () => {
  const { propertyid }: any = useParams();
  return (
    <div>
      <MetaData
        title={`Account`}
        description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
      ></MetaData>
        <Property id={propertyid}/>
    </div>
  );
};

export default Page;
