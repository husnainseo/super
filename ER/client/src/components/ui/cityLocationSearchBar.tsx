import React, { useEffect, useState, useRef, FC } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { cityOptions, lahoreSocieties, karachiSocieties, multanSocieties, bwpSocieties, faisalabadSocieties, quettaSocieties, peshawarSocieties, islamabadSocieties, rawalpindiSocieties } from '@/data/propertyFormData';
import { IFilter } from '@/types/types';
import { RxCross2 } from "react-icons/rx";

type Props = {
  filters: IFilter;
  setCity: (e: string) => void;
  setLocation: (e: string) => void;
  handleFilter: (e: string) => void;
  handleClear : ()=>void;
}

const SearchBarLocation: FC<Props> = ({ filters, setCity, setLocation, handleFilter ,handleClear}) => {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  let location;
  if (filters.city === "bahawalpur") {
    location = bwpSocieties;
  } else if (filters.city === "lahore") {
    location = lahoreSocieties;
  } else if (filters.city === "multan") {
    location = multanSocieties;
  } else if (filters.city === "rawalpindi") {
    location = rawalpindiSocieties;
  } else if (filters.city === "islamabad") {
    location = islamabadSocieties;
  } else if (filters.city === "karachi") {
    location = karachiSocieties;
  } else if (filters.city === "peshawar") {
    location = peshawarSocieties;
  } else if (filters.city === "quetta") {
    location = quettaSocieties;
  } else if (filters.city === "faisalabad") {
    location = faisalabadSocieties;
  }

  let filtered;
  if (menu === "city") {
    filtered = cityOptions;
  } else {
    filtered = location && location.filter(locationItem =>
      !filters.location.includes(locationItem.label)
    );
  }


  const filteredOptions = filtered && filtered.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleButtonClick = () => {
    setMenu("city");
    setShow(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className='relative'>
      <div className='flex items-center text-sm border rounded-lg p-2 gap-2 sm:w-96'>
        <IoSearch className='text-2xl' />
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={handleChange}
          onClick={() => { setMenu("location"); setShow(!show) }}
          type="text"
          className='w-full outline-none'
        />
        <button
          onClick={handleButtonClick}
          className='flex gap-2 items-center capitalize font-medium'
        >
          {filters.city}<RiArrowDownSLine />
        </button>
      </div>
      {show && (
        <div className="menu absolute bg-white z-10 top-11 left-0 shadow-xl rounded py-2 px-4 border w-96 max-h-48 overflow-auto">
          {filteredOptions && filteredOptions.map((e, i) => (
            <p
              onClick={() => {
                menu === "city" ? setCity(e.label) : setLocation(e.label);
                setShow(false);
              }}
              className='p-2 text-sm hover:bg-[#f9f4f4] rounded'
              key={i}
            >
              {e.label}
            </p>
          ))}
        </div>
      )}
      {filters.location.length > 0 && (
        <div className='flex gap-2 text-xs flex-wrap mt-3 items-center'>
          {filters.location.map((e, i) => (
            <p className='p-1 bg-[#F9f4f4] rounded inline-flex gap-2 items-center' key={i}>{e}<RxCross2
              className='cursor-pointer'
              onClick={() => handleFilter(e)} /></p>
          ))}
          <p className='cursor-pointer text-purple-800' onClick={handleClear}>Clear all</p>
        </div>
      )}
    </div>
  );
}

export default SearchBarLocation;
