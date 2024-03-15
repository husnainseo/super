import React, { FC } from "react";
import Image from "next/image";

type Props = {
  icon?: string;
  title?: string;
  description?: string;
  button?: string;
};

const Test: FC<Props> = ({ icon, title, description, button }) => {
  return (
    <>
      <div className="h-auto w-60 backdrop-blur-md bg-white/50 border rounded-3xl text-le border-white/70 flex-col gap-2 flex items-center p-4">
        <Image src="/svgexport-2.svg" alt="hero" width={150} height={150} />
        <p className="text-xl">Buy a property</p>
        <p className="text-sm">Find where “perfect” meets “happy”</p>
        <button className="bg-indigo-800 px-3 py-2 text-white rounded">Browse Properties</button>
      </div>
    </>
  );
};

export default Test;
