import { FormState } from "@/types/types";
import React, { FC } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineEditLocation } from "react-icons/md";
import { PiUserGear } from "react-icons/pi";
import { GrPowerShutdown } from "react-icons/gr";
import { IoChevronBack } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
type Props = {
  setRoute: (route: string) => void;
  setActiveLink: (route: string) => void;
  activeLink: string;
  logoutHandler: () => void;
  setForm: (form: any) => void;
  initialFormState: FormState;
  isMobile: boolean;
};

const DashboardSideBar: FC<Props> = ({
  setRoute,
  setActiveLink,
  activeLink,
  logoutHandler,
  setForm,
  initialFormState,
  isMobile,
}) => {
  const handleClick = (route: string) => {
    setActiveLink(route);
    setRoute(route);
  };
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".dropdown")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <nav
          className={` bg-white border rounded-2xl text-2xl ${
            isMobile
              ? "h-[80px] w-full flex items-center justify-between px-8"
              : "px-2 py-10 flex flex-col  h-[96%]   gap-5"
          }`}
        >
          {isMobile && (
            <a href="/">
              <IoChevronBack />
            </a>
          )}
          <a
            onClick={() => handleClick("dashboard")}
            className={`p-2 hover:cursor-pointer ${
              activeLink === "dashboard" && "bg-black rounded-xl text-white "
            }`}
          >
            <LuLayoutDashboard />
          </a>
          <a
            onClick={() => {
              handleClick("property");
              setForm(initialFormState);
            }}
            className={`p-2 hover:cursor-pointer ${
              activeLink === "property" && " bg-black rounded-xl  text-white"
            }`}
          >
            <MdOutlineAddLocationAlt />
          </a>
          <a
            onClick={() => handleClick("manage")}
            className={`p-2 hover:cursor-pointer ${
              activeLink === "manage" && " bg-black rounded-xl text-white"
            }`}
          >
            <MdOutlineEditLocation />
          </a>
          {!isMobile && (
            <>
              <a
                onClick={() => handleClick("profile")}
                className={`p-2 hover:cursor-pointer ${
                  activeLink === "profile" && "bg-black rounded-xl  text-white"
                }`}
              >
                <PiUserGear />
              </a>
              <a
                onClick={() => logoutHandler()}
                className={`p-2 mt-96 hover:cursor-pointer ${
                  activeLink === "logout" && "bg-black rounded-xl  text-white"
                }`}
              >
                <GrPowerShutdown />
              </a>
            </>
          )}
          {isMobile && (
            <a onClick={() => setShow(!show)} className="relative p-2">
              {show && (
                <ul className="dropdown bg-white absolute z-10 py-2 rounded-md text-base leading-7 shadow-xl top-[-120px] left-[-80px] border">
                  <li
                    className="px-6 py-1 flex gap-2 items-center"
                    onClick={() => handleClick("profile")}
                  >
                    <PiUserGear />
                    Profile
                  </li>
                  <li
                    className="px-6 py-1 flex gap-2 items-center"
                    onClick={() => logoutHandler()}
                  >
                    <GrPowerShutdown />
                    Logout
                  </li>
                </ul>
              )}
              <CiMenuKebab />
            </a>
          )}
        </nav>
      </div>
    </>
  );
};

export default DashboardSideBar;
