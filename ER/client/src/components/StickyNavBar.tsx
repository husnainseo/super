import React, { FC, useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import { styles } from "../Styles/style";
import { useSelector } from "react-redux";
import LoggedInIcon from "./Signup-login/LoggedInIcon";
import Popup from "../components/Signup-login/Main";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../redux/features/auth/authAPI";

type Props = {
};

const StickyNavbar: FC<Props> = () => {
  const [active, setActive] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const { data } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [logout, setLogout] = useState(false);
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  
  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    setLogout(true);
    await signOut();
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1060); // Adjust breakpoint as needed
  };
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    if (!user && !data) {
      setLogout(true);
    }
  }, [data, user, isSuccess, socialAuth]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  function generateDropdown(items: string[]) {
    return (
      <div className="dropdown origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
          {items.map((item, index) => (
            <a
            href=""
              key={index}
              className="block px-4 py-2 mb-1 text-xs text-gray-700 rounded-md bg-white hover:bg-gray-100"
              role="menuitem"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky  top-0 z-40">
      {isOpen ? <Popup closeAlert={toggleAlert}></Popup> : null}
      <div
        className="bg-[#f9f4f4] w-full  flex items-center px-[9vw] h-16 justify-center"
      >
        <Link href={"/"}>
          <h1 className="text-2xl font-medium flex items-center gap-2">
            <Image
              src={"/er.svg"}
              alt="logo"
              width={30}
              height={30}
            />
            EmarkRealty
          </h1>
        </Link>
        {isMobile ? (
          <div className="flex items-center">
            <Hamburger
              activeAlert={toggleAlert}
              user={user}
              handleLogout={handleLogout}
            />
          </div>
        ) : (
          <>
            <ul className={`flex gap-5  items-center text-[#1f2929] font-Poppins justify-center flex-1 px-8 text-[16px] font-medium`}>
              <li className={`relative  cursor-pointer py-2`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                For Buyers
                {isDropdownVisible && generateDropdown(["Buy a residential", "Buy a commercial", "Buy a plot"])}
              </li>
              <li className={`  cursor-pointer py-2`} onMouseEnter={() => setIsDropdownVisible2(true)} onMouseLeave={() => setIsDropdownVisible2(false)}>
                For Tenants
                {isDropdownVisible2 && generateDropdown(["Residential property on rent", "Commercial property on rent"])}
              </li>
              <li className={`  cursor-pointer py-2 `} onMouseEnter={() => setIsDropdownVisible3(true)} onMouseLeave={() => setIsDropdownVisible3(false)}>
                For Owners
                {isDropdownVisible3 && generateDropdown(["Sell a property", "Rentout a property"])}
              </li>
            </ul>
            <div className="flex gap-5 items-center mr-[2vw]">
              {user && !isMobile ? (
                <LoggedInIcon user={user} logout={handleLogout} />
              ) : (
                <button
                  className={`${styles.PurpleButton}`}
                  onClick={toggleAlert}
                >
                  Login
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StickyNavbar;
