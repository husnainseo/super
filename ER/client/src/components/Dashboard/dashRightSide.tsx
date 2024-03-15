import React, { FC } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { FormState } from "@/types/types";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import {styles} from "../../Styles/style"

type Props = {
  setRoute: (value: string) => void;
  setActiveLink: (value: string) => void;
  setForm: (value: FormState) => void;
  initialFormState: FormState;
};

const DashRightSide: FC<Props> = ({
  setRoute,
  setActiveLink,
  setForm,
  initialFormState,
}) => {
  const handleClick = () => {
    setForm(initialFormState);
    setRoute("property");
    setActiveLink("property");
  };
  return (
    <>
      <div className="h-full flex flex-col justify-between items-center">
        <div className="py-12 text-black/80 flex flex-col items-center gap-5">
          <p className="text-xl text-center font-medium">
            Looking to Sell or Rent Your Property?
          </p>
          <div className="flex flex-col">
            <span className="flex items-center">
              <TiTickOutline />
              <p>Get the Best Price</p>
            </span>
            <span className="flex items-center">
              <TiTickOutline />
              <p>24/7 Property Insights</p>
            </span>

            <span className="flex items-center">
              <TiTickOutline />
              <p>Direct Access to Buyers & Tenants</p>
            </span>
          </div>
          <button
            onClick={handleClick}
            className={`${styles.PurpleButton}`}
          >
            <MdOutlineAddLocationAlt />
            Post Property
          </button>
        </div>
        <div>
          <Link href="/">
            <button className="mb-16 flex gap-3 items-center">
              <IoArrowBackOutline /> Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashRightSide;
