import { FormState, IListingImage } from "@/types/types";
import React, { FC } from "react";
import Image from "next/image";
import { styles } from "@/Styles/style";

type Props = {
  handleCoverImage: (index: number) => void;
  form: FormState;
  close: () => void;
};

const CoverImage: FC<Props> = ({ handleCoverImage, form, close }) => {
  const [active, setActive] = React.useState(0);
  return (
    <div className="relative flex-col justify-between h-full min-h-[500px]">
    <div className="flex flex-wrap justify-center min-h-[400px] min-w-[400px] items-start h-auto max-h-[700px] xs:max-h-[450px] m-2 max-w-[500px] overflow-auto">
      {form.images.map((image, index) => (
        <>
          {image !== null && typeof image === "string" && (
            <Image
              key={index}
              src={image}
              width={142}
              height={100}
              alt="property"
              className={`h-[100px] m-1 w-[142px] rounded-2xl object-cover cursor-pointer ${
                form.coverImage === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleCoverImage(index)}
            />
          )}
          {image !== null && typeof image === "object" && "url" in image && (
            <Image
              key={index}
              src={(image as IListingImage).url}
              width={142}
              height={100}
              alt="property"
              className={`h-[100px] m-1 w-[142px] rounded-2xl object-cover cursor-pointer ${
                form.coverImage === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleCoverImage(index)}
            />
          )}
        </>
      ))}
     
    </div>
    <button
        onClick={() => {
          close();
        }}
        className={`${styles.BlackButton} absolute bottom-[-80px] xs:bottom-4`}
      >
        Set Cover
      </button>
    </div>
  );
};

export default CoverImage;
