import React,{FC} from "react";
import { IoSearchOutline } from "react-icons/io5";
import { styles } from "../Styles/style";

type Props = {
  active?:boolean;
  bgChange?: boolean;
};

const searchTypeOptions = [
  {
    value: "buy",
    label: "Buy",
  },
  {
    value: "rent",
    label: "Rent",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
];

const SearchBar:FC<Props> = ({active ,bgChange}) => {
  const [activeBtn, setActiveBtn] = React.useState("buy");
  console.log("active is",active)

  const handleClick = (value: string) => {
    setActiveBtn(value);
  }
  return (
    <>
      <div className=" flex gap-2 flex-col items-center">
       {!active && !bgChange &&  (<div className="top inline-flex bg-white p-1 rounded-md font-medium ">
          <button className={`px-4 py-2 rounded-md ${activeBtn === "buy" ? "bg-purple-800 text-white":"text-black/70"}`} onClick={()=>handleClick("buy")}>Buy</button>
          <button className={`px-4 py-2 rounded-md ${activeBtn === "rent" ? "bg-purple-800 text-white":"text-black/70"}`} onClick={()=>handleClick("rent")}>Rent</button>
          <button className={`px-4 py-2 rounded-md ${activeBtn === "commercial" ? "bg-purple-800 text-white":"text-black/70"}`} onClick={()=>handleClick("commercial")}>Commercial</button>
        </div>)} 
        <div className={`flex bg-white rounded-md ${active || bgChange && "border"}`}>
          <input type="text" placeholder="Search by city or area" className=" outline-none rounded-l-md p-3 w-full xs:w-[500px]"/>
          <button className="bg-purple-800 text-white text-2xl px-4 rounded-r-md hover:bg-purple-900 transition-all "><IoSearchOutline /></button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;