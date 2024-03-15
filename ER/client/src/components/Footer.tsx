import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { LiaFacebookSquare } from "react-icons/lia";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full">
      <div className="w-full bg-[#f9f4f4]">
        <div className="flex px-[15vw] gap-12 py-8 xl:gap-72 flex-wrap">
          <div className="hidden flex-1 flex-col xs:flex gap-4 min-w-48">
            <Link href={"/"}>
              <Image src="/er.svg" alt="logo" width={30} height={30} />
            </Link>
            <p className="text-xs">
              &quot;Experience elevated Real Estate Services in DHA Bahawalpur with
              Emark Realty.If you’re interested in buying or investing in real
              estate in DHA Bahawalpur, look no further than Emark Realty.
              Contact us today to start your real estate journey with
              EmarkRealty.&quot;
            </p>
          </div>
          <div className="flex-1 flex justify-center xs:justify-between gap-4 flex-wrap xs:flex-nowrap">
            <div className="w-full flex-col items-center xs:items-start flex gap-4 xs:max-w-56">
              <p className="uppercase">Head Office</p>
              <p className="flex items-center gap-2 text-xs">
                <AiOutlineMail />
                info@emarkrealty.com
              </p>
              <p className="flex items-center gap-2 text-xs">
                <IoCallOutline />
                923006812612
              </p>
              <p className="hidden xs:flex items-start gap-2  text-xs">
                <HiOutlineLocationMarker className="text-xl" />
                office #9 Al madina commercial center bahawalpur
              </p>
            </div>
            <div className="flex-col flex gap-4">
              <p className="uppercase">Follow us</p>
              <p className="text-xs">yes we are social</p>
              <div className="flex gap-1">
                <IoLogoInstagram />
                <CiLinkedin />
                <FaXTwitter />
                <CiYoutube />
                <LiaFacebookSquare />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col flex items-center text-xs py-2 justify-center text-zinc-600 gap-1">
        <p className="flex gap-2 text-[0.7rem]">
          <a href="">About us</a>|<a href="">Terms &amp; Conditions</a>|
          <a href=""> Privacy Policy</a>
        </p>
        <p className="text-[0.7rem]">
          Copyright 2024 EmarkRealty.com All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
