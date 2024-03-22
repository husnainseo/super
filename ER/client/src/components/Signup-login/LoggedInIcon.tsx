import React, { useState } from "react";
import Image from "next/image";

type Props = {
  user: {
    profile: {
      image: {
        url: string;
      }
    };
  };
  logout : () => void;
};

const LoggedInIcon = ({ user ,logout}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (showMenu && !event.target.closest(".dropdown")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <div>
      <div className="relative inline-block text-left bg-white p-1 rounded-full">
        <Image
          src={user.profile.image.url}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full cursor-pointer object-cover w-8 h-8"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div
            id="dropdown-menu"
            className="dropdown origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <a
                href="/dashboard"
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
              >
                My account
              </a>
              <div
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100"
                role="menuitem"
                onClick={()=>logout()}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInIcon;
