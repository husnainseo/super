import React, { FC } from "react";
import "remixicon/fonts/remixicon.css";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { styles } from "../Styles/style";
import { TbHomeDollar } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import { GiHouseKeys } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  activeAlert: () => void;
  user: IUser;
  handleLogout: () => void;
};

const Hamburger: FC<Props> = ({ activeAlert, user, handleLogout}) => {
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    handleLogout;
  };
  return (
    <div className="absolute left-5">
      <div className="inline-block text-left ">
        <RiMenu2Fill
          className={`[1060px]:hidden ri-menu-2-fill text-purple-800
          text-[25px] cursor-pointer`}
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu ? (
          <>
            <div
              className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 overflow-hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="h-full max-w-[250px] px-4 py-6 bg-white flex-col flex gap-4">
                <h1 className="text-2xl font-medium flex items-center gap-2 text-[#3D3B40]">
                  <Image src={"/er.svg"} alt="logo" width={30} height={30} />
                  EmarkRealty
                </h1>
                {!user && (
                  <button className={styles.PurpleButton} onClick={activeAlert}>
                    LOGIN
                  </button>
                )}
                <ul className="border-t flex flex-col gap-6 py-4 text-black">
                  <li className="flex gap-2 items-center cursor-pointer">
                    <TbHome /> <p className="text-xs">For Buyers</p>{" "}
                  </li>
                  <li className="flex gap-2 items-center cursor-pointer">
                    <GiHouseKeys />
                    <p className="text-xs">For Tenants</p>
                  </li>
                  <li className="flex gap-2 items-center cursor-pointer">
                    <TbHomeDollar />
                    <p className="text-xs">For Owners</p>
                  </li>
                  {user ? (
                    <>
                      <Link href="/dashboard">
                        <li className="flex gap-2 items-center cursor-pointer">
                          <MdOutlineAccountCircle />
                          <p className="text-xs cursor-pointer">My Account</p>
                        </li>
                      </Link>
                      <li className="flex gap-2 items-center cursor-pointer">
                        <CiLogout />
                        <p
                          className="text-xs cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Hamburger;
