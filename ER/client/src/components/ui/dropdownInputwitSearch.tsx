import React, { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
  defaultLabel?: string;
  width?: string;
  clearable?: boolean;
  onValueChange: (value: string) => void;
  border?:string
};

const Dropdown: FC<Props> = ({
  options,
  placeholder,
  defaultLabel,
  defaultValue,
  width,
  clearable,
  onValueChange,
  border,
}) => {
  const [value, setValue] = React.useState(defaultValue || "");
  const [label, setLabel] = React.useState(defaultLabel || "");
  const [show, setShow] = React.useState(false);
  const [clearableValue, setClearableValue] = React.useState(
    clearable || false
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShow = () => {
    setShow(!show);
  };
  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (show && !event.target.closest(".dropdown")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  const handleOptionClick = (option: Option) => {
    setValue(option.value);
    setLabel(option.label);
    setSearchTerm("");
    handleShow();
    onValueChange(option.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShow(true);
  };

  return (
    <div
      className={`dropdown relative bg-white ${border} rounded-xl p-3`}
      style={{width:`${width}`}}
    >
      <div className="flex w-full items-center">
        <input
          type="text"
          value={searchTerm === "" ? label : searchTerm}
          className={`outline-none w-[90%]`}
          placeholder={placeholder}
          onClick={handleShow}
          onChange={(e) => {
            if (value) {
              setValue("");
              setLabel("");
            }
            handleInputChange(e);
          }}
        />
        <IoIosArrowDown
          className="border-l flex-1 min-w-11"
          onClick={handleShow}
        />
        {value !== "" && clearable && (
          <RxCross2
            className="absolute right-16"
            onClick={() => {
              setValue("");
              setSearchTerm("");
              setLabel("");
            }}
          />
        )}
      </div>

      {show && (
        <div
          id="dropdown-menu"
          className="z-[5] origin-top-right max-h-40 overflow-auto absolute right-0 mt-4 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-black hover:text-white"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
