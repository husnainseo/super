import React, { ReactElement, ReactNode, MouseEvent } from "react";
import "remixicon/fonts/remixicon.css";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface UserHoverCardProps {
  onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function UserHoverCard({ onButtonClick }: UserHoverCardProps): ReactElement {
  const { isLoading, data } = useLoadUserQuery({});
  console.log(data, isLoading);
  return (
    <span className="hidden lg:flex items-center text-white">
      <i className="ri-user-fill bg-white px-[.2vw] rounded-full text-[.8vw] text-center text-black"></i>
      <i className="ri-arrow-drop-down-fill text-white text-[1vw]"></i>
    </span>
  );
}

export default UserHoverCard;
