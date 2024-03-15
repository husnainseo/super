"use client";
import React from "react";
import Main from "../../../components/Sale/Main";
import { useSearchParams ,usePathname} from "next/navigation";


type Props = {};

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("type");
  const path = usePathname()
  return (
    <div>
      <Main query={query}
      path={path} searchParams={searchParams}/>
    </div>
  );
};

export default Page;
