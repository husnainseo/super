import React, { useState, useEffect, lazy, Suspense } from "react";
import { TFeatureType,FormState } from "@/types/types";
import TagList from "./tags";
import {styles} from "../../Styles/style";
import { LuLoader2 } from "react-icons/lu";

const Feature = lazy(() => import("./features")); // Lazy load the Feature component

interface Tag {
  type: string;
  value: string;
}

interface Props {
  toggleAlert: () => void;
  allTags: Tag[] | string[];
  removeTags?: (type: string, value: string) => void;
  handleAllTags: (btnType: string, btnValue: string) => void;
  filter?:boolean;
  handleReset:()=>void;
}

const Amenities: React.FC<Props> = ({
  toggleAlert,
  allTags,
  removeTags,
  handleAllTags,
  filter,
  handleReset
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TFeatureType[]>([]);

  useEffect(() => {
    const loadSearchResults = async () => {
      const resultFeatures = await import("../../data/propertyFormData");
      const results = resultFeatures.features
        .map((feature) => ({
          ...feature,
          subFeature: feature.subFeature.filter((subFeatureItem) =>
            subFeatureItem.type.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter(({ subFeature }) => subFeature.length > 0);

      setSearchResults(results);
    };

    loadSearchResults();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-5 text-center w-auto h-auto">
      <form className="relative border rounded-xl  mx-auto m-5 ">
        <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <i className="ri-search-line h-5 w-5"></i>
        </span>
        <input
          className="w-full py-3 px-8 rounded-xl outline-none"
          type="text"
          placeholder="Search Features"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="h-full max-h-[140px] xs:max-h-[70px] overflow-auto max-w-[400px]">
        {!filter && removeTags && ( <TagList tag={allTags as Tag[]} handleRemoveTag={removeTags} />)}
       
      </div>
      <section className="overflow-auto h-auto max-h-[480px] xs:max-h-[350px] relative">
        <Suspense fallback={ <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div className="text-2xl animate-spin"><LuLoader2/></div></div>}>
          {searchResults.map((item) => (
            <Feature
              key={item.id}
              feature={item.feature}
              subFeature={item.subFeature}
              startOpen={searchTerm.length > 1}
              handleButton={handleAllTags}
              activeFeature={filter ? allTags as string[]: allTags as Tag[]}
            filter={filter}
            />
          ))}
        </Suspense>
      </section>
      <div className="flex gap-2 justify-start mt-2">
        <button onClick={toggleAlert} className={styles.BlackButton}>
          Confirm
        </button>
        <button onClick={handleReset} className="border px-4 py-2 rounded-md font-medium">Reset All</button>
      </div>
    </div>
  );
};

export default Amenities;