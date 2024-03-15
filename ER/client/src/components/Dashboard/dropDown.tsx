import React, { FC, useRef, useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  Buttons: ButtonConfig[];
  onSelect: (type: string, value: string) => void;
  activeTags: string;
  activeButton: Tag[];
};

type ButtonConfig = {
  type: string;
  label: string;
};

interface Tag {
  type: string;
  value: string;
}

const DropDown: FC<Props> = ({
  Buttons,
  onSelect,
  activeTags,
  activeButton = [{ type: "", value: "" }],
}) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [tag, setTag] = useState(activeTags);
  const [activeValue, setActiveValue] = useState<Tag[]>(activeButton);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    setTag(activeTags);
    setActiveValue(activeButton);
  }, [activeTags, activeButton]);

  const renderButtons = (buttonConfig: ButtonConfig[]) =>
    buttonConfig.map((config) => (
      <div key={config.type}>
        <button
          onClick={() => {
            onSelect(tag, config.type);
            setSelected(config.type);
          }}
          className="hover:bg-slate-400 w-full p-2 text-xs text-left"
        >
          {config.label}
        </button>
      </div>
    ));

  const matchingTag = activeValue.find((t) => t.value === selected);

  return (
    <div
      onClick={handleActive}
      ref={dropdownRef}
      className="relative w-full max-w-[100px]"
    >
      <div className="flex items-center gap-2 justify-end">
        {matchingTag ? matchingTag.value : ""}
        {active ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {active && (
        <div className=" text-black absolute z-50 bg-white py-4 drop-shadow-xl rounded-md w-full max-w-[100px] h-[120px] overflow-auto">
          <div className="flex flex-col">{renderButtons(Buttons)}</div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
