import React, { FC } from "react";
import { IListing } from "@/types/types";
import { BsBuildingDown } from "react-icons/bs";
import { GiGreenhouse } from "react-icons/gi";
import { MdOutlineRoundedCorner } from "react-icons/md";
import { GrVmMaintenance } from "react-icons/gr";
import { TbBuildingBridge } from "react-icons/tb";
import { GiCooler } from "react-icons/gi";
import { MdOutlineHeatPump } from "react-icons/md";
import { GiTheater } from "react-icons/gi";
import { GiEntryDoor } from "react-icons/gi";
import { LiaBuildingSolid } from "react-icons/lia";
import { PiElevator } from "react-icons/pi";
import { FaSun } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdPool } from "react-icons/md";
import { GiKitchenTap } from "react-icons/gi";
import { TbBuildingHospital } from "react-icons/tb";
import { TbBuildingMosque } from "react-icons/tb";
import { GrRestaurant } from "react-icons/gr";
import { MdOutlineKitchen } from "react-icons/md";
import { GrLounge } from "react-icons/gr";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdOutlineHouseSiding } from "react-icons/md";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { LiaSchoolSolid } from "react-icons/lia";
import { LuSofa } from "react-icons/lu";
import { PiToiletPaperLight } from "react-icons/pi";
import { IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlineBalcony } from "react-icons/md";
import { GiPipes } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GrSatellite } from "react-icons/gr";
import { MdOutlineWifiPassword } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { BiBuilding } from "react-icons/bi";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { TbCarGarage } from "react-icons/tb";
import { RiBuilding2Line } from "react-icons/ri";
import { TbDoorEnter } from "react-icons/tb";

type Props = {
  listing: IListing;
};

const Amenities: FC<Props> = ({ listing }) => {
  const [limit, setLimit] = React.useState(5);
  const renderButtons = (
    icon: React.ReactNode,
    title: string,
    value?: string
  ) => {
    return (
      <div className="flex gap-5 items-center w-48">
        <div className="border p-3 rounded-lg text-xl">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          {value && <p className="">{value}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 rounded-xl flex flex-col gap-5 w-full max-w-[809px] bg-white">
      <div className="text-2xl font-medium">Amenities</div>
      <div className="w-full text-lg font-light flex flex-wrap items-center justify-left text-left gap-5">
        {listing.features.slice(0, limit).map((feature) => (
          <React.Fragment key={feature.type}>
            {feature.type === "builtYear" &&
              renderButtons(
                <MdOutlinePrecisionManufacturing />,
                "Built Year",
                feature.value
              )}
            {feature.type === "garage" &&
              renderButtons(<TbCarGarage />, "Garage:", feature.value)}
            {feature.type === "propertyType" &&
              renderButtons(
                <RiBuilding2Line />,
                "Property Type:",
                feature.value
              )}
            {feature.type === "purpose" &&
              renderButtons(<TbDoorEnter />, "Purpose:", feature.value)}
            {feature.type === "bedrooms" &&
              renderButtons(<LuBedDouble />, "Bedrooms:", feature.value)}
            {feature.type === "bathrooms" &&
              renderButtons(<LuBath />, "Bathrooms:", feature.value)}
            {feature.type === "kitchen" &&
              renderButtons(<MdOutlineKitchen />, "Kitchen:", feature.value)}
            {feature.type === "tvLounge" &&
              renderButtons(<GrLounge />, "Tv Lounge:", feature.value)}
            {feature.type === "facing" &&
              renderButtons(<BiSolidDownArrow />, "Facing", feature.value)}
            {feature.type === "floors" &&
              renderButtons(<BiBuilding />, "Floors", feature.value)}
            {feature.type === "totalFloors" &&
              renderButtons(
                <LiaBuildingSolid />,
                "Total Floors",
                feature.value
              )}
            {feature.type === "storeRoom" &&
              renderButtons(
                <MdOutlinePrecisionManufacturing />,
                "Store Room:",
                feature.value
              )}
            {feature.type === "storeRoom" &&
              renderButtons(
                <MdOutlineHouseSiding />,
                "Store Room:",
                feature.value
              )}
            {feature.type === "laundryRoom" &&
              renderButtons(
                <MdOutlineLocalLaundryService />,
                "Laundry Room:",
                feature.value
              )}
            {feature.type === "studyRoom" &&
              renderButtons(<LiaSchoolSolid />, "Study Room:", feature.value)}
            {feature.type === "drawingRoom" &&
              renderButtons(<LuSofa />, "Drawing Room:", feature.value)}
            {feature.type === "diningRoom" &&
              renderButtons(
                <MdOutlineKitchen />,
                "Dining Room:",
                feature.value
              )}
            {feature.type === "powderRoom" &&
              renderButtons(
                <PiToiletPaperLight />,
                "Powder Room:",
                feature.value
              )}
            {feature.type === "servantQuarter" &&
              renderButtons(
                <IoAccessibilityOutline />,
                "Servant Quarter:",
                feature.value
              )}
            {feature.type === "balcony" &&
              renderButtons(<MdOutlineBalcony />, "Balcony:", feature.value)}
            {feature.type === "furnished" &&
              renderButtons(<GiGreenhouse />, "Furnished")}
            {feature.type === "cornerPlot" &&
              renderButtons(<MdOutlineRoundedCorner />, "Corner Plot")}
            {feature.type === "maintenance" &&
              renderButtons(<GrVmMaintenance />, "Maintenance")}
            {feature.type === "accessibility" &&
              renderButtons(<TbBuildingBridge />, "Accessibility")}
            {feature.type === "centralCooling" &&
              renderButtons(<GiCooler />, "Central Cooling")}
            {feature.type === "centralHeating" &&
              renderButtons(<MdOutlineHeatPump />, "Central Heating")}
            {feature.type === "homeTheater" &&
              renderButtons(<GiTheater />, "Home Theater")}
            {feature.type === "separateEntry" &&
              renderButtons(<GiEntryDoor />, "Separate Entry")}
            {feature.type === "reuseableTop" &&
              renderButtons(<LiaBuildingSolid />, "Reuseable Top")}
            {feature.type === "lift" && renderButtons(<PiElevator />, "Lift")}
            {feature.type === "lawn" && renderButtons(<FaSun />, "Lawn")}
            {feature.type === "gym" && renderButtons(<AiOutlinePlus />, "Gym")}
            {feature.type === "swimmingPool" &&
              renderButtons(<MdPool />, "Swimming Pool")}
            {feature.type === "dirtyKitchen" &&
              renderButtons(<GiKitchenTap />, "Dirty Kitchen")}
            {feature.type === "school" &&
              renderButtons(<LiaSchoolSolid />, "School")}
            {feature.type === "hospital" &&
              renderButtons(<TbBuildingHospital />, "Hospital")}
            {feature.type === "masjid" &&
              renderButtons(<TbBuildingMosque />, "Masjid")}
            {feature.type === "restaurants" &&
              renderButtons(<GrRestaurant />, "Restaurants")}
            {feature.type === "basement" &&
              renderButtons(<BsBuildingDown />, "Basement")}
          </React.Fragment>
        ))}
      </div>
      {listing.features.length > 5 && (
        <button
          className="underline text-medium"
          onClick={() => {
            limit === 5 ? setLimit(listing.features.length) : setLimit(5);
          }}
        >
          {limit === 5 ? "6+ More Features" : "close"}
        </button>
      )}
    </div>
  );
};

export default Amenities;
