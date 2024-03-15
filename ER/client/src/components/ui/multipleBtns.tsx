import React, { useState, FC } from "react";

type Props = {
  property?: boolean;
  bed?: boolean;
  bath?: boolean;
};

const MultipleBtns: FC<Props> = ({ property, bed, bath }) => {
  const [tab, setTab] = useState("residential");
  const [button, setButton] = useState(["All"]);
  const [btns, setBtns] = useState(["Any"]);
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
    setTab(value);
    setButton(["All"]);
  };

  const handleSubBtns = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "All") {
      setButton([value]);
    } else {
      setButton((prevButtons) => {
        let updatedButtons;
        if (prevButtons.includes("All") && value !== "All") {
          updatedButtons = prevButtons.filter((btn) => btn !== "All");
        } else {
          updatedButtons = [...prevButtons];
        }

        if (updatedButtons.includes(value)) {
          updatedButtons = updatedButtons.filter((btn) => btn !== value);
        } else {
          updatedButtons.push(value);
        }

        return updatedButtons;
      });
    }
  };

  const handleOtherBtns = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "Any") {
      setBtns([value]);
    } else {
      setBtns((prevButtons) => {
        let updatedButtons;
        if (prevButtons.includes("Any") && value !== "Any") {
          updatedButtons = prevButtons.filter((btn) => btn !== "Any");
        } else {
          updatedButtons = [...prevButtons];
        }
  
        if (updatedButtons.includes(value)) {
          updatedButtons = updatedButtons.filter((btn) => btn !== value);
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
              className={`w-28 py-2 ${
                tab === "residential" && "border-b-2 border-[#1f1f29]"
              }`}
              onClick={(e) => handlePropType(e, "residential")}
            >
              Residential
            </button>
            <button
              className={`w-28 py-2 ${
                tab === "plot" && "border-b-2 border-[#1f1f29]"
              }`}
              onClick={(e) => handlePropType(e, "plot")}
            >
              Plot
            </button>
            <button
              className={`w-28 py-2 ${
                tab === "commercial" && "border-b-2 border-[#1f1f29]"
              }`}
              onClick={(e) => handlePropType(e, "commercial")}
            >
              Commercial
            </button>
          </div>
          <div className="flex flex-wrap gap-2 py-2">
            {tab === "residential" &&
              residentialBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  className={`capitilize px-4 py-2 border rounded-md ${
                    button.includes(e) && "bg-[#1f1f29] text-white border-none"
                  }`}
                  key={i}
                >
                  {e}
                </button>
              ))}
            {tab === "plot" &&
              plotBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  key={i}
                  className={`capitilize px-4 py-2 border rounded-md ${
                    button.includes(e) && "bg-[#1f1f29] text-white border-none"
                  }`}
                >
                  {e}
                </button>
              ))}
            {tab === "commercial" &&
              commercialBtns.map((e, i) => (
                <button
                  onClick={(event) => handleSubBtns(event, e)}
                  className={`capitilize px-4 py-2 border rounded-md ${
                    button.includes(e) && "bg-[#1f1f29] text-white border-none"
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
          <div className="w-96">
            <p>Bedroom</p>
            <div className="flex flex-wrap gap-2 py-2">
              {bedBtns.map((e, i) => (
                <button
                  className={`capitilize px-4 py-2 border rounded-md ${
                    btns.includes(e) && "bg-[#1f1f29] text-white border-none"
                  }`}
                  key={i}
                  onClick={(event) => handleOtherBtns(event, e)}
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
          <div className="w-96">
            <p>Bathroom</p>
            <div className="flex flex-wrap gap-2 py-2">
              {bathBtns.map((e, i) => (
                <button
                  className={`capitilize px-4 py-2 border rounded-md ${
                    btns.includes(e) && "bg-[#1f1f29] text-white border-none"
                  }`}
                  key={i}
                  onClick={(event) => handleOtherBtns(event, e)}
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