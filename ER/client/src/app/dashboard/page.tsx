"use client";
import Protected from "@/hooks/useProtected";
import Dashboard from "../../components/Dashboard/Main";
import { MetaData } from "../../utils/MetaData";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <Protected>
        <MetaData
          title={`${user.name} Account`}
          description="If you're interested in buying or investing in real estate in DHA Bahawalpur, look no further than EmarkRealty. Contact us today to start your real"
        ></MetaData>
        <Dashboard />
      </Protected>
    </>
  );
};

export default Page;
