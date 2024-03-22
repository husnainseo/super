import React, { useState, useEffect, ReactNode } from "react";
import Pricing from "./pricing";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const EmarkSlider = styled(Slider)({
  color: "#1f1f29",
  height: 3,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
});

type Props = {
  area?: boolean;
  title: string;
  component?: ReactNode;
  unit?: string;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>
  rangeIdx?:number[];
  setRangeIdx ?: React.Dispatch<React.SetStateAction<number[]>>
  max?:number;
  setMax?:(e:number)=>void;
};

const PricevalueSlider: React.FC<Props> = ({
  area,
  rangeIdx,
  setRangeIdx,
  title,
  component,
  unit,
  value,
  setValue,
  max,
  setMax
}) => {
  


  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && max) {
      if (newValue[1] > max) {
        setValue([value[0], 0]);
      } else {
        setValue(newValue as number[]);
      }
    }
  };

  const handleInputChangefirst = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue =
      event.target.value === "" ? 0 : Number(event.target.value);
    setValue([inputValue, value[1]]);
  };

  const handleInputChangeSecond = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue =
      event.target.value === "" ? 0 : Number(event.target.value);
    setValue([value[0], inputValue]);
  };

  const handleBlurone = () => {
    if (value[0] < 0) {
      setValue([0, value[1]]);
    } else if (value[0] > 100) {
      setValue([100, value[1]]);
    }
  };

  const handleBlurtwo = () => {
    if (value[1] < 0) {
      setValue([value[0], 0]);
    } else if (value[1] > 100) {
      setValue([value[0], 100]);
    }
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && !area) {
      let updatedValue;
      let updatedValueReverse;

      if (newValue[0] <= 20) {
        updatedValue = newValue[0] * 500000;
      } else if (newValue[0] >= 21 && newValue[0] < 25) {
        updatedValue = (newValue[0] - 16) * 2500000;
      } else if (newValue[0] >= 25 && newValue[0] < 27) {
        updatedValue = (newValue[0] - 20) * 5000000;
      } else if (newValue[0] >= 27 && newValue[0] < 29) {
        updatedValue = (newValue[0] - 23) * 10000000;
      } else if (newValue[0] >= 29 && newValue[0] < 65) {
        updatedValue = (newValue[0] - 26) * 25000000;
      } else {
        updatedValue = 975000000;
      }

      if (newValue[1] <= 20) {
        updatedValueReverse = newValue[1] * 500000;
      } else if (newValue[1] >= 21 && newValue[1] < 25) {
        updatedValueReverse = (newValue[1] - 16) * 2500000;
      } else if (newValue[1] >= 25 && newValue[1] < 27) {
        updatedValueReverse = (newValue[1] - 20) * 5000000;
      } else if (newValue[1] >= 27 && newValue[1] < 29) {
        updatedValueReverse = (newValue[1] - 23) * 10000000;
      } else if (newValue[1] >= 29 && newValue[1] < 67) {
        updatedValueReverse = (newValue[1] - 26) * 25000000;
      } else {
        updatedValueReverse = 0;
      }
      setValue([updatedValue, updatedValueReverse]);
      setRangeIdx && setRangeIdx([newValue[0],newValue[1]])
    }
    if (Array.isArray(newValue) && area) {
      setValue([newValue[0], newValue[1]]);
    }
  };

    

  return (
    <div className="px-3 py-2 w-auto sm:w-80 flex flex-col gap-2">
      <div className="flex justify-between font-medium">
        <p>{title}</p>
        {area && <div>{component}</div>}
        {!area && <p>PKR</p>}
      </div>
      {area && (
        <div className="flex justify-between items-center mt-2">
          <input
            type="text"
            className={`w-28 px-2 border rounded  h-8 outline-none ${value[0] === 0 && "text-zinc-400"
              }`}
            value={value[0]}
            onChange={handleInputChangefirst}
            onBlur={handleBlurone}
          />
          <p>To</p>
          <input
            type="text"
            className={`w-28 px-2 border rounded  h-8 outline-none ${value[1] === 0 && "text-zinc-400"
              }`}
            value={value[1] === 0 ? "Any" : value[1]}
            onChange={handleInputChangeSecond}
            onBlur={handleBlurtwo}
          />
        </div>
      )}
      {!area && (
        <div className="flex justify-between items-center mt-2">
          <input
            disabled
            type="text"
            className={`w-28 px-2 border rounded  h-8 outline-none ${value[0] === 0 && "text-zinc-400"
              }`}
            value={value[0]}
            onChange={handleInputChangefirst}
            onBlur={handleBlurone}
          />
          <p>To</p>
          <input
            disabled
            type="text"
            className={`w-28 px-2 border rounded  h-8 outline-none ${value[1] === 0 && "text-zinc-400"
              }`}
            value={value[1] === 0 ? "Any" : value[1]}
            onChange={handleInputChangeSecond}
            onBlur={handleBlurtwo}
          />
        </div>
      )}
      {!area && (
        <div className="flex justify-between items-center">
          {value[0] !== 0 && (
            <p className="text-xs">PKR {<Pricing price={value[0]} />}</p>
          )}
          <div className="flex-1"></div>
          {value[1] !== 0 && (
            <p className="text-xs">PKR {<Pricing price={value[1]} />}</p>
          )}
        </div>
      )}

      <div className="my-4 ">
        {area && (
          <EmarkSlider
            value={value}
            min={0}
            max={max}
            onChange={handleSliderChange}
          />
        )}
        {!area && rangeIdx && (
          <EmarkSlider
            defaultValue={[rangeIdx[0], rangeIdx[1]]}
            min={0}
            max={67}
            onChange={handleChange}
          />
        )}

      </div>
    </div>
  );
};

export default PricevalueSlider;

