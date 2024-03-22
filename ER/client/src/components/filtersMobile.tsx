import React, { useState, FC, useEffect ,useRef} from 'react';
import { IFilter } from '@/types/types';
import MultiBtns from "./ui/multipleBtns";
import Range from "./ui/range";
import DropDownwithValue from "./ui/dropdownwithValue";
type Props = {
    filters: IFilter;
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
    close: () => void
}

const FilterMobile: FC<Props> = ({ filters, setFilters, close }) => {
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

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

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
        setSizeRange([sizeRange[0], initialvalue]);
        setRangeMax(initialvalue);
    }, [measureType]);


    const handleApply = () => {
        setFilters((prevForm) => ({ ...prevForm, propertyType: propTab, subPropertyType: propBtns, minPrice: priceRange[0], maxPrice: priceRange[1], measureType: measureType, minSize: sizeRange[0], maxSize: sizeRange[1], bed: bedB, bathroom: bathB }));
        close()
    };
console.log("size is",sizeRange)
    const handleReset = () => {
        setPropTab("residential");
        setPropBtns(["All"]);
        setBathB(["Any"]);
        setBedB(["Any"]);
        setPriceRange([0, 0]);
        setSizeRange([0, 50]);
        setRangeIdx([0, 67]);
        setMeasureType("Marla");
        setRangeMax(50)
    }
    return (
        <div className='p-5'>
            <MultiBtns property propTab={propTab} setPropTab={setPropTab} propBtns={propBtns} setPropBtns={setPropBtns} />
            <Range title="Price" value={priceRange} setValue={setPriceRange} rangeIdx={rangeIdx} setRangeIdx={setRangeIdx} />
            <MultiBtns bed bedB={bedB} setBedB={setBedB} />
            <MultiBtns bath bathB={bathB} setBathB={setBathB} />
            <Range
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
            />
            <div className='flex justify-between mt-5'>
                <button onClick={handleReset} className="text-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm bg-[#f9f4f4]">Reset all</button>
                <button onClick={handleApply} className="bg-[#1f1f29] py-2 px-4 rounded-md font-medium text-sm text-white">Confirm</button>
            </div>
        </div>
    )
}

export default FilterMobile