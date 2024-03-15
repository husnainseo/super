import React, { FC, useState ,useEffect} from "react";
import { RiArrowDownSLine } from "react-icons/ri";
type Props = {
  value: string;
  menu: string[];
  setValue:(e:string)=>void
};

const DropDown: FC<Props> = ({ value, menu ,setValue}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".dropdownmenu") && !event.target.closest(".dropdown-toggle")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);
  console.log("value is",value);
  return (
    <div className="relative" onClick={()=>setShow(!show)}>
      <div className="flex items-center text-sm border rounded-lg p-2 gap-1">
        <p className="w-8">{value}</p>
        <RiArrowDownSLine />
      </div>
      {show && (
        <div className="dropdownmenu w-16  flex flex-col gap-2 absolute bg-white z-[3] top-10 left-0 shadow-lg rounded p-3 border text-sm">
          {menu.map((e, i) => (
            <p className="hover:bg-[#f2f9f9] cursor-pointer" onClick={()=>{console.log("inside e is ",e);setValue(e)}} key={i}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
