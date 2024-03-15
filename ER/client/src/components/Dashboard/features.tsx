import React, { FC, useState, useEffect } from "react";
import { styles } from "@/Styles/style";
import DropDown from "./dropDown";
import { BuiltYearButtons, Facing, NumOfFloors } from "@/data/propertyFormData";
import Counter from "./counter";
import { TFeatureType, TButtonConfig, ITag } from "@/types/types";

interface Tag {
  type: string;
  value: string;
}

const Feature: FC<TFeatureType> = ({
  feature,
  filter,
  subFeature,
  startOpen = false,
  handleButton,
  activeFeature = [],
}) => {
  const [isActive, setActive] = useState(false);
  const [activeBtn, setActiveBtn] = useState(activeFeature);
  const [activeAccordion, setAccordion] = useState(startOpen);
  const counterBtns: string[] = [
    "tvLounge",
    "storeRoom",
    "laundryRoom",
    "studyRoom",
    "dinningRoom",
    "drawingRoom",
    "powderRoom",
    "servantQuarter",
    "balcony",
    "kitchen",
  ];
  console.log(activeBtn);
  console.log("fileter is", filter);
  useEffect(() => {
    if (activeAccordion) {
      setActive(true);
    }
  }, [activeAccordion]);

  useEffect(() => {
    setAccordion(startOpen);
    setActiveBtn(activeFeature);
  }, [activeFeature, startOpen]);

  const renderSubFeatureBtn = (buttonConfig: TButtonConfig[]) =>
    buttonConfig
      .filter(
        (config) =>
          !filter ||
          (![
            "builtYear",
            "facing",
            "whichFloorIsYourUnitOn",
            "numberOfFloors",
          ].includes(config.type) &&
            !counterBtns.includes(config.type))
      )
      .map((config) => (
        <div key={config.type}>
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (
                ![
                  "builtYear",
                  "facing",
                  "whichFloorIsYourUnitOn",
                  "numberOfFloors",
                ].includes(config.type) &&
                !counterBtns.includes(config.type)
              ) {
                handleButton && handleButton(config.type, "");
              }
            }}
            className={`w-full ${
              activeBtn.some((tag) => {
                if (typeof tag === "string") {
                  return filter ? tag === config.type : false;
                } else {
                  return tag.type === config.type;
                }
              })
                ? styles.activeFeatureBtn
                : styles.inactiveFeatureBtn
            }`}
          >
            <span className="flex items-center gap-2">
              {config.icon}
              {config.label}
            </span>
            {config.type === "builtYear" && (
              <DropDown
                Buttons={BuiltYearButtons}
                onSelect={handleButton || (() => {})}
                activeTags="builtYear"
                activeButton={activeBtn as Tag[]}
              />
            )}
            {config.type === "facing" && (
              <DropDown
                Buttons={Facing}
                onSelect={handleButton || (() => {})}
                activeTags="facing"
                activeButton={activeBtn as Tag[]}
              />
            )}
            {config.type === "whichFloorIsYourUnitOn" && (
              <DropDown
                Buttons={NumOfFloors}
                onSelect={handleButton || (() => {})}
                activeTags="whichFloorIsYourUnitOn"
                activeButton={activeBtn as Tag[]}
              />
            )}
            {config.type === "numberOfFloors" && (
              <DropDown
                Buttons={NumOfFloors}
                onSelect={handleButton || (() => {})}
                activeTags="numberOfFloors"
                activeButton={activeBtn as Tag[]}
              />
            )}
            {counterBtns.includes(config.type) && (
              <Counter
                onSelect={handleButton || (() => {})}
                activeTags={config.type}
                activeButton={activeBtn as Tag[]}
              />
            )}
          </button>
        </div>
      ));

  return (
    <div className="w-auto mx-auto border  rounded-xl duration-1000 my-2">
      <div
        className={`p-4 rounded-t-xl flex justify-between items-center text-gray-800 cursor-pointer ${
          isActive ? "bg-[#1f1f29] text-white" : ""
        }`}
        onClick={() => setActive(!isActive)}
      >
        <h3>{feature}</h3>
        <button>
          {isActive ? (
            <i className="ri-subtract-line h-6 w-6 transform"></i>
          ) : (
            <i className="ri-add-line h-6 w-6 transform"></i>
          )}
        </button>
      </div>
      {isActive && (
        <div className="text-left pt-2 text-sm leading-6 m-1">
          {renderSubFeatureBtn(subFeature)}
        </div>
      )}
    </div>
  );
};

export default Feature;
