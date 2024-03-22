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
    <div className="relative min-w-fit cursor-pointer noSelect" onClick={()=>setShow(!show)}>
      <div className="flex items-center text-sm border rounded-lg p-2 gap-1 bg-[#f9f4f4]">
        <p className=" capitalize">{value}</p>
        <RiArrowDownSLine />
      </div>
      {show && (
        <div className="text-xs dropdownmenu w-auto  flex flex-col gap-2 absolute bg-white z-[3] top-10 left-0 shadow-lg rounded p-3 border">
          {menu.map((e, i) => (
            <p className="hover:bg-[#f9f4f4] p-1 rounded cursor-pointer" onClick={()=>{setValue(e)}} key={i}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;