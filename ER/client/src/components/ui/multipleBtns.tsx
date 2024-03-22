import React, { useState, FC } from "react";

type Props = {
  property?: boolean;
  bed?: boolean;
  bath?: boolean;
  propTab?: string;
  setPropTab?: (tab: string) => void;
  propBtns?: string[];
  bedB?: string[];
  bathB?:string[];
  setBedB?: React.Dispatch<React.SetStateAction<string[]>>;
  setBathB?: React.Dispatch<React.SetStateAction<string[]>>;
  setPropBtns?: React.Dispatch<React.SetStateAction<string[]>>;
};


const MultipleBtns: FC<Props> = ({ property, bed, bath, propTab, setPropTab, propBtns, setPropBtns,bathB, bedB,setBathB,setBedB }) => {

  const residentialBtns = [
    "All",
    "House",
    "Flat",
    "Lower Portion",
    "Upper Portion",
    "Hostel",
    "Room",
  ];
  const plotBtns = [
    "All",
    "Residential Plot",
    "Plot File",
    "Commercial Plot",
    "Agriculture Land",
  ];
  const commercialBtns = ["All", "Shop", "Building", "Warehouse", "Other"];
  const bathBtns = ["Any", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
  const bedBtns = [
    "Any",
    "Studio",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10+",
  ];

  const handlePropType = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    setPropTab && setPropTab(value);
    setPropBtns && setPropBtns(["All"])
  };

  const handleSubBtns = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "All") {
      setPropBtns && setPropBtns([value])
    } else {
      setPropBtns && setPropBtns((prevButtons: string[]) => {
        let updatedButtons;
        if (prevButtons.includes("All") && value !== "All") {
          updatedButtons = prevButtons.filter((btn: string) => btn !== "All");
        } else {
          updatedButtons = [...prevButtons];
        }

        if (updatedButtons.includes(value)) {
          updatedButtons = updatedButtons.filter((btn: string) => btn !== value);
        } else {
          updatedButtons.push(value);
        }

        return updatedButtons;
      });
    }
  };

  const handleBedBtns = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "Any") {
      setBedB && setBedB([value]);
    } else {
      setBedB && setBedB((prevButtons: string[]) => {
        let updatedButtons;
        if (prevButtons.includes("Any") && value !== "Any") {
          updatedButtons = prevButtons.filter((btn: string) => btn !== "Any");
        } else {
          updatedButtons = [...prevButtons];
        }

        if (updatedButtons.includes(value)) {
          updatedButtons = updatedButtons.filter((btn: string) => btn !== value);
        } else {
          updatedButtons.push(value);
        }

        return updatedButtons;
      });
    }
  };

  const handleBathBtns = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "Any") {
      setBathB && setBathB([value]);
    } else {
      setBathB && setBathB((prevButtons: string[]) => {
        let updatedButtons;
        if (prevButtons.includes("Any") && value !== "Any") {
          updatedButtons = prevButtons.filter((btn: string) => btn !== "Any");
        } else {
          updatedButtons = [...prevButtons];
        }

        if (updatedButtons.includes(value)) {
          updatedButtons = updatedButtons.filter((btn: string) => btn !== value);
        } else {
          updatedButtons.push(value);
        }

        return updatedButtons;
      });
    }
  };




  return (
    <>
      {property && (
        <div>
          <div className="flex">
            <button
              className={`w-28 py-2 ${propTab === "residential" && "border-b-2 border-[#1f1f29]"
                }`}
              onClick={(e) => handlePropType(e, "residential")}
            >
              Residential
            </button>
            <button
              className={`w-28 py-2 ${propTab === "plot" && "border-b-2 border-[#1f1f29]"
                }`}
              onClick={(e) => handlePropType(e, "plot")}
            >
              Plot
            </button>
            <button
              className={`w-28 py-2 ${propTab === "commercial" && "border-b-2 border-[#1f1f29]"
                }`}
              onClick={(e) => handlePropType(e, "commercial")}
            >
              Commercial
            </button>
          </div>
          <div className="flex flex-wrap gap-2 py-2">
            {propTab === "residential" &&
              residentialBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  className={`capitilize px-4 py-2 border rounded-md ${propBtns?.includes(e) && "bg-[#1f1f29] text-white border-none"
                    }`}
                  key={i}
                >
                  {e}
                </button>
              ))}
            {propTab === "plot" &&
              plotBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  key={i}
                  className={`capitilize px-4 py-2 border rounded-md ${propBtns?.includes(e) && "bg-[#1f1f29] text-white border-none"
                    }`}
                >
                  {e}
                </button>
              ))}
            {propTab === "commercial" &&
              commercialBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  className={`capitilize px-4 py-2 border rounded-md ${propBtns?.includes(e)  && "bg-[#1f1f29] text-white border-none"
                    }`}
                  key={i}
                >
                  {e}
                </button>
              ))}
          </div>
        </div>
      )}
      {bed && (
        <>
          <div className="w-auto sm:w-96">
            <p>Bedroom</p>
            <div className="flex flex-wrap gap-2 py-2">
              {bedBtns.map((e, i) => (
                <button
                  className={`capitilize px-4 py-2 border rounded-md ${bedB?.includes(e) && "bg-[#1f1f29] text-white border-none"
                    }`}
                  key={i}
                  onClick={(event) => handleBedBtns(event, e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {bath && (
        <>
          <div className="w-auto sm:w-96">
            <p>Bedroom</p>
            <div className="flex flex-wrap gap-2 py-2">
              {bathBtns.map((e, i) => (
                <button
                  className={`capitilize px-4 py-2 border rounded-md ${bathB?.includes(e) && "bg-[#1f1f29] text-white border-none"
                    }`}
                  key={i}
                  onClick={(event) => handleBathBtns(event, e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MultipleBtns;