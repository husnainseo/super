import React, { FC, useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import { styles } from "../Styles/style";
import { useSelector } from "react-redux";
import LoggedInIcon from "./Signup-login/LoggedInIcon";
import Popup from "../components/Signup-login/Main";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../redux/features/auth/authAPI";

type Props = {
  bgChange?: boolean;
};

const StickyNavbar: FC<Props> = ({ bgChange }) => {
  const [active, setActive] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const { data } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200 && !bgChange) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
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

  return (
    <div className="sticky  top-0 z-40">
      {isOpen ? <Popup closeAlert={toggleAlert}></Popup> : null}
      <div
        className={`${
          active || bgChange
            ? "bg-[#f9f4f4] transition-all shadow-lg"
            : " text-white "
        } w-full  flex items-center px-[9vw] h-16 justify-center `}
      >
        <Link href={"/"}>
          <h1 className="text-2xl font-medium flex items-center gap-2">
            <Image
              src={`${active || bgChange ? "/er.svg" : "/er-white.svg"}`}
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
              active={active}
              bgChange={bgChange}
            />
          </div>
        ) : (
          <>
            {active ? (
              <div className="flex-1">
                <SearchBar active={active} bgChange={bgChange} />
              </div>
            ) : (
              bgChange && (
                <div className="flex-1">
                  <SearchBar active={active} bgChange={bgChange} />
                </div>
              )
            )}
            {!active && !bgChange && (
              <ul className="flex gap-5  items-center text-white/80 font-Poppins justify-center flex-1 px-8 text-[16px] font-medium">
                <li className="hover:text-white drop-shadow cursor-pointer py-2 hover:border-b-2 border-purple-800">
                  For Buyers
                </li>
                <li className="hover:text-white drop-shadow cursor-pointer py-2 hover:border-b-2 border-purple-800">
                  For Tenants
                </li>
                <li className="hover:text-white drop-shadow cursor-pointer py-2 hover:border-b-2 border-purple-800">
                  For Owners
                </li>
                <li className="hover:text-white drop-shadow cursor-pointer py-2 hover:border-b-2 border-purple-800">
                  For Agents
                </li>
              </ul>
            )}

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
