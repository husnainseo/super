import React, { FC } from "react";
import Image from "next/image";

type Props = {
  topText: string;
  bottomText: string;
  image: string;
  RightFirst: string;
  RightSecond: string;
  RightThird: string;
  ButtonTxt: string;
};

const bigCard: FC<Props> = ({
  topText,
  bottomText,
  image,
  RightFirst,
  RightSecond,
  RightThird,
  ButtonTxt,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl relative">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs uppercase text-zinc-400 font-semibold text-center">
              {topText}
            </p>
            <h2 className="text-4xl font-medium px-5 w-full max-w-3xl text-center">
              {bottomText}...
            </h2>
          </div>
          <div className="flex w-full">
            <Image
              src={image}
              alt="cover"
              height={300}
              width={500}
              className="rounded w-[600px]"
            />
            <div className="w-[600px] p-12 flex flex-col gap-3 justify-center">
              <p className="text-xs uppercase text-zinc-400 font-semibold text-left">
                {RightFirst}
              </p>
              <h3 className="text-2xl font-medium ">{RightSecond}</h3>
              <p>{RightThird}</p>
              <button className="px-4 py-2 rounded bg-indigo-800 text-white text-xl font-medium">
                {ButtonTxt}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default bigCard;
