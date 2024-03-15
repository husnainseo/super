import React, { FC } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type Props = {
  heading: string;
  component: React.ReactNode[];
  
};

const Accordion: FC<Props> = ({ heading,component}) => {
  const [isActive, setActive] = React.useState(false);
  
  return (
    <div className="w-full mx-auto  my-2">
      <div
        className={` transition-all p-4 rounded-t-xl flex justify-between duration-1000 items-center text-gray-800 cursor-pointer`}
        onClick={() => setActive(!isActive)}
      >
        <h3 className="font-medium text-lg">{heading}</h3>
        <button>{isActive ? <AiOutlineMinus /> : <AiOutlinePlus />}</button>
      </div>
      {isActive && (
        <div className="flex text-left pt-2 text-sm leading-6 m-1">
          <div className="w-full text-lg font-light flex flex-wrap items-center justify-left text-left">{component}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
