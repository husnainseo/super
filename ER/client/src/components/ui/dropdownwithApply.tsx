import React, { useState, useEffect ,FC,ReactNode} from "react";
import { RiArrowDownSLine } from "react-icons/ri";

type Props = {
  value:string;
  component:ReactNode;
};

const DropDownwithApply:FC<Props> = ({value,component}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".menu") && !event.target.closest(".dropdown-toggle")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);
  
  return (
    <div className="relative">
      <div
        className="flex gap-1 items-center text-sm border rounded-lg py-2 px-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <p className="">{value}</p>
        <RiArrowDownSLine />
      </div>
      {show && (
          <div className="menu absolute bg-white z-10 top-10 left-0 shadow-lg rounded py-2 px-4 border">
            <div>{component}</div>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShow(false)} className="text-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm bg-[#f9f4f4]">
                Cancel
              </button>
              <button className="bg-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm text-white">
                Apply
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default DropDownwithApply;

