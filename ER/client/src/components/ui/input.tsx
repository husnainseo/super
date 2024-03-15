import React,{FC} from "react";

type Props = {
    id: string;
    name: string;
    type: string;
    value?: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const input :FC <Props>= ({id,name,type,value,placeholder,onChange}) => {
  return (
    <div className="relative font-OpenSans mt-[16px]">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        className="peer placeholder-transparent h-[56px] w-full border border-gray-200 text-gray-900 focus:outline-none focus:border-[#2e5da8] rounded px-2"
        placeholder={placeholder}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 text-gray-600 text-[11px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-400  peer-placeholder-shown:top-3.5 transition-all peer-focus:top-0 peer-focus:text-[#2e5da8] peer-focus:text-[11px] font-semibold ${
          value
            ? "peer-focus:-top-0 peer-focus:text-[#2e5da8] peer-focus:text-[11px] font-semibold"
            : ""
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default input;
