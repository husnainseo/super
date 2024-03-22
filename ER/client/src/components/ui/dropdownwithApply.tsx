import React, { FC, useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import MultiBtns from "./multipleBtns";
import Range from "./range";
import DropDownwithValue from "./dropdownwithValue";
import { IFilter, IParams } from "@/types/types";
import { RxCross2 } from "react-icons/rx";

type Props = {
  value: string;
  propType?: boolean;
  price?: boolean;
  size?: boolean;
  bed?: boolean;
  bath?: boolean;
  filters: IFilter;
  setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
  cross?: boolean;
  handleCross?: () => void;
  isValue:boolean
};

const DropDownwithApply: FC<Props> = ({isValue, value, propType, price, size, bed, bath, filters, setFilters, cross, handleCross }) => {
  const [show, setShow] = useState(false);
  const [propTab, setPropTab] = useState(filters?.propertyType || "residential");
  const [propBtns, setPropBtns] = useState(filters?.subPropertyType || ["All"]);
  const [bathB, setBathB] = useState(filters?.bathroom || ["Any"]);
  const [bedB, setBedB] = useState(filters?.bed || ["Any"]);
  const [priceRange, setPriceRange] = useState([filters?.minPrice || 0, filters?.maxPrice || 0]);
  const [sizeRange, setSizeRange] = useState([
    filters?.minSize || 0,
    filters?.maxSize ||
    (filters.measureType === "Marla" ? 50 :
      (filters.measureType === "Sq.Ft" ? 11250 :
        (filters.measureType === "Sq.M" ? 51000 :
          (filters.measureType === "Sq.Yd" ? 4000 :
            (filters.measureType === "Kanal" ? 100 : 0)))))
  ]);
  const [rangeIdx, setRangeIdx] = useState([0, 67]);
  const [measureType, setMeasureType] = useState(filters?.measureType || "Marla");
  const [rangeMax, setRangeMax] = useState(50);


  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".menu") && !event.target.closest(".dropdown-toggle")) {
        setShow(false);
        handleClose()
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  const handleApply = () => {
    if (propType) {
      setFilters((prevForm) => ({ ...prevForm, propertyType: propTab, subPropertyType: propBtns }));
    } else if (price) {
      setFilters((prevForm) => ({ ...prevForm, minPrice: priceRange[0], maxPrice: priceRange[1] }));
    } else if (size) {
      setFilters((prevForm) => ({ ...prevForm, measureType: measureType, minSize: sizeRange[0], maxSize: sizeRange[1] }));
    } else if (bed) {
      setFilters((prevForm) => ({ ...prevForm, bed: bedB }));
    } else if (bath) {
      setFilters((prevForm) => ({ ...prevForm, bathroom: bathB }));
    }
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setPropTab(filters?.propertyType);
    setBathB(filters?.bathroom);
    setBedB(filters?.bed);
    setPropBtns(filters.subPropertyType);
    setRangeIdx([0, 67]);
    setMeasureType(filters?.measureType);
    setRangeMax(50);
    setSizeRange([filters?.minSize, filters?.maxSize]);
    setPriceRange([filters?.minPrice, filters?.maxPrice]);
  };

  useEffect(() => {
    let initialvalue: number = 0;
    switch (measureType) {
      case "Marla":
        initialvalue = 50;
        break;
      case "Sq.Ft":
        initialvalue = 11250;
        break;
      case "Sq.M":
        initialvalue = 51000;
        break;
      case "Sq.Yd":
        initialvalue = 4000;
        break;
      case "Kanal":
        initialvalue = 100;
        break;
      default:
        initialvalue = 50;
    }
    setSizeRange([0, initialvalue]);
    setRangeMax(initialvalue);
  }, [measureType]);

  const handleCrossBtn = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    if (price) {
      setPriceRange([0, 0]); setRangeIdx([0, 67])
    } else if (size) {
      setMeasureType("Marla"); setSizeRange([0, 50])
    } else if (bed) {
      setBedB(["Any"])
    } else if (bath) {
      setBathB(["Any"])
    }
    handleCross && handleCross();
  };

  return (
    <div className="relative">
     <div className={`flex gap-1 items-center text-sm border rounded-lg py-2 px-3 cursor-pointer ${isValue && "bg-[#f9f4f4]"}`} onClick={() => { setShow(!show) }}>

        <p className=" capitalize">{value}</p>
        {!cross && <RiArrowDownSLine />}
        {cross && <RxCross2 onClick={handleCrossBtn} />}
      </div>
      {show && (
        <div className="menu absolute bg-white z-10 top-10 left-0 shadow-lg rounded py-2 px-4 border">
          {propType && <MultiBtns property propTab={propTab} setPropTab={setPropTab} propBtns={propBtns} setPropBtns={setPropBtns} />}
          {price && <Range title="Price" value={priceRange} setValue={setPriceRange} rangeIdx={rangeIdx} setRangeIdx={setRangeIdx} />}
          {bed && <MultiBtns bed bedB={bedB} setBedB={setBedB} />}
          {bath && <MultiBtns bath bathB={bathB} setBathB={setBathB} />}
          {size && <Range
            value={sizeRange} setValue={setSizeRange}
            max={rangeMax} setMax={setRangeMax}
            area
            title="Size"
            unit={measureType}
            component={
              <DropDownwithValue
                menu={["Marla", "Sq.Ft", "Sq.Yd", "Sq.M", "Kanal"]}
                value={measureType}
                setValue={setMeasureType
                }
              />
            }
          />}
          <div className="flex justify-end gap-2">
            <button onClick={handleClose} className="text-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm bg-[#f9f4f4]">
              Cancel
            </button>
            <button onClick={() => { handleApply() }} className="bg-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm text-white">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownwithApply;
