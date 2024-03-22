import React, { FC, useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { cityOptions } from "@/data/propertyFormData";
import { RxCross2 } from "react-icons/rx";
import { IListing } from "@/types/types";
import { useRouter } from "next/navigation";


type Props = {
  listings: IListing[]
};


const SearchBar: FC<Props> = ({ listings }) => {
  const router = useRouter();
  const [activeBtn, setActiveBtn] = React.useState("sale");
  const [selectedCity, setSelectedCity] = useState("");
  const [menu, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState([] as string[]);
  const [commercial, setCommercial] = useState(false);

  const filteredOptions = cityOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCity = Array.isArray(listings) && listings
    .filter(e => e.city === selectedCity)
    .filter(e => e.location.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleClick = (value: string) => {
    setActiveBtn(value);
  }


  const handleinputClick = () => {
    if (!menu) {
      setMenu(true)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (menu && !event.target.closest(".menu") && !event.target.closest(".dropdown-toggle")) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menu]);

  const handleSearch = () => {
    if (selectedCity && location.length === 0) {
      router.push(`/${activeBtn}/${selectedCity.toLowerCase()}-${commercial ? "commercial" : "residential"}`);
    } else if (selectedCity && location.length > 0) {
      const encodedLocation = encodeURIComponent(JSON.stringify(location))
      router.push(`/${activeBtn}/${selectedCity.toLowerCase()}-${commercial ? "commercial" : "residential"}?location=${encodedLocation}`);
    }
    return
  }

  return (
    <>
      <div className=" flex gap-2 flex-col items-center">
        <div className="top inline-flex bg-white p-1 rounded-md font-medium gap-1">
          <button className={`px-4 py-2 rounded-md ${activeBtn === "sale" ? "bg-purple-800 text-white" : "text-black/70"}`} onClick={() => handleClick("sale")}>Buy</button>
          <button className={`px-4 py-2 rounded-md ${activeBtn === "rent" ? "bg-purple-800 text-white" : "text-black/70"}`} onClick={() => handleClick("rent")}>Rent</button>
          <button className={`px-4 py-2 rounded-md ${commercial === true ? "bg-purple-800 text-white" : "text-black/70"}`} onClick={() => setCommercial(!commercial)}>Commercial</button>
        </div>
        <div className={`relative flex bg-white  ${menu ? "rounded-t-md" : "rounded-md"}`}>
          <input value={searchTerm} onChange={handleChange} onClick={handleinputClick} type="text" placeholder="Search by city or area" className=" outline-none rounded-l-md p-3 w-full xs:w-[500px]" />
          <button className={`bg-purple-800 text-white text-2xl px-4  ${menu ? "rounded-se-md" : "rounded-e-md"} hover:bg-purple-900 transition-all `}><IoSearchOutline onClick={handleSearch} /></button>
          {menu && (<div className="menu absolute top-12 shadow-md w-full bg-white max-h-72 rounded-b-md overflow-auto">
            {selectedCity === "" && (
              filteredOptions.map((e, i) => (
                <p onClick={() => { setSelectedCity(e.value); setSearchTerm(""); }} className="text-sm p-3 cursor-pointer hover:bg-[#f9f4f4]" key={i}>{e.label}</p>
              ))
            )}
            {selectedCity !== "" && (<div className="flex">{location && (location.map((e, i) => (
              <div key={i} className="bg-[#f9f4f4] inline-block text-sm p-1 m-3 rounded">
                <div className="flex gap-2 items-center capitalize ">
                  {e}
                  <RxCross2 className="cursor-pointer p-1 hover:bg-black/10 rounded-full text-xl" onClick={() => setLocation(location.filter(locationItem => locationItem.toLowerCase() !== e.toLowerCase()))} />
                </div>
              </div>
            )))}
              <div className="bg-[#f9f4f4] inline-block text-sm p-1 m-3 rounded"><div className="flex gap-2 items-center capitalize">{selectedCity}<RxCross2 className="cursor-pointer p-1 hover:bg-black/10 rounded-full text-xl" onClick={() => { setSelectedCity(""); setLocation([]) }} /></div></div></div>)}
            {selectedCity !== "" && searchTerm !== "" && Array.isArray(filteredCity) && (
              filteredCity.map((e, i) => (
                <p onClick={() => { setLocation([...location, e.location]); setSearchTerm(""); }} className="text-sm p-3 cursor-pointer hover:bg-[#f9f4f4]" key={i}>{e.location}</p>
              ))
            )}

          </div>)}
        </div>
      </div>
    </>
  );
};

export default SearchBar;