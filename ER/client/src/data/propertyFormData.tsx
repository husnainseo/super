import { TFeatureType } from "@/types/types";
import React from "react";
import {
  MdOutlinePrecisionManufacturing,
  MdOutlineBalcony,
  MdOutlineKitchen,
  MdOutlineHouseSiding,
  MdOutlineWifiPassword,
  MdElectricBolt,
  MdOutlineLocalFireDepartment,
  MdOutlineSecurity,
  MdOutlineHeatPump,
  MdPool,
} from "react-icons/md";
import { MdOutlineRoundedCorner } from "react-icons/md";

import {
  GrLounge,
  GrSatellite,
  GrVmMaintenance,
  GrRestaurant,
} from "react-icons/gr";

import {
  PiBasketThin,
  PiToiletPaperLight,
  PiElevator,
} from "react-icons/pi";

import {
  MdOutlineLocalLaundryService,
} from "react-icons/md";

import {
  TbHomeDollar,
  TbBuildingHospital,
  TbBuildingMosque,
  TbBuildingBridge,
} from "react-icons/tb";

import {
  GiKeyring,
  GiCooler,
  GiTheater,
  GiKitchenTap,
  GiEntryDoor,
  GiPoolDive,
  GiGreenhouse,
  GiPipes,
} from "react-icons/gi";

import {
  IoAccessibilityOutline,
  IoWaterOutline,
} from "react-icons/io5";

import {
  FaSun,
} from "react-icons/fa";

import {
  LuSofa,
} from "react-icons/lu";

import {
  BsBuildingDown,
} from "react-icons/bs";

import {
  LiaBuildingSolid,
  LiaSchoolSolid,
} from "react-icons/lia";

import {
  BiSolidDownArrow,
  BiBuilding,
} from "react-icons/bi";

export const BuiltYearButtons = [
  { type: "2021", label: "2021" },
  { type: "2020", label: "2020" },
  { type: "2019", label: "2019" },
  { type: "2018", label: "2018" },
  { type: "2017", label: "2017" },
  { type: "2016", label: "2016" },
  { type: "2015", label: "2015" },
  { type: "2014", label: "2014" },
  { type: "2013", label: "2013" },
  { type: "2012", label: "2012" },
  { type: "2011", label: "2011" },
  { type: "2010", label: "2010" },
  { type: "2009", label: "2009" },
  { type: "2008", label: "2008" },
  { type: "2007", label: "2007" },
  { type: "2006", label: "2006" },
  { type: "2005", label: "2005" },
  { type: "2004", label: "2004" },
  { type: "2003", label: "2003" },
  { type: "2002", label: "2002" },
  { type: "2001", label: "2001" },
  { type: "2000", label: "2000" },
  { type: "1999", label: "1999" },
];
export const NumOfFloors = [
  { type: "1", label: "1" },
  { type: "2", label: "2" },
  { type: "3", label: "3" },
  { type: "4", label: "4" },
  { type: "5", label: "5" },
  { type: "6", label: "6" },
  { type: "7", label: "7" },
  { type: "8", label: "8" },
  { type: "9", label: "9" },
  { type: "10", label: "10" },
  { type: "11", label: "11" },
  { type: "12", label: "12" },
];
export const Facing = [
  { type: "north", label: "North" },
  { type: "northEast", label: "North East" },
  { type: "east", label: "East" },
  { type: "west", label: "West" },
  { type: "northWest", label: "North West" },
  { type: "southEast", label: "South East" },
  { type: "south", label: "South" },
  { type: "southWest", label: "South West" },
];

export const features: TFeatureType[] = [
  {
    id: 1,
    feature: "Primary Features",
    subFeature: [
      {
        type: "builtYear",
        icon:  <MdOutlinePrecisionManufacturing />,
        label: "Built Year",
      },
      {
        type: "tvLounge",
        icon: <GrLounge />,
        label: "Tv Lounge",
      },
      {
        type: "storeRoom",
        icon:  <MdOutlineHouseSiding />,
        label: "Store Room",
      },
      {
        type: "laundryRoom",
        icon:  <MdOutlineLocalLaundryService />,
        label: "Laundry Room",
      },
      {
        type: "studyRoom",
        icon: <LiaSchoolSolid />,
        label: "Study Room",
      },
      {
        type: "dinningRoom",
        icon:<MdOutlineKitchen />,
        label: "Dinning Room",
      },
      {
        type: "drawingRoom",
        icon:  <LuSofa />,
        label: "Drawing Room",
      },
      {
        type: "powderRoom",
        icon:  <PiToiletPaperLight />,
        label: "Powder Room",
      },
      {
        type: "servantQuarter",
        icon:  <IoAccessibilityOutline />,
        label: "Servant Quarter",
      },
      {
        type: "balcony",
        icon:<MdOutlineBalcony />,
        label: "Balcony",
      },
      {
        type: "kitchen",
        icon: <MdOutlineKitchen />,
        label: "Kitchen",
      },
      {
        type: "basement",
        icon: <BsBuildingDown />,
        label: "Basement",
      },
      {
        type: "furnished",
        icon: <GiGreenhouse />,
        label: "Furnished",
      },
      {
        type: "semiFurnished",
        icon:  <GiPoolDive />,
        label: "Semi Furnished",
      },
      {
        type: "cornerPlot",
        icon: <MdOutlineRoundedCorner />,
        label: "Corner Plot",
      },
    ],
  },
  {
    id: 3,
    feature: "Communication",
    subFeature: [
      {
        type: "satelliteOrCableTv",
        icon:  <GrSatellite />,
        label: "Satellite or Cable Tv",
      },
      {
        type: "internetAccess",
        icon:   <MdOutlineWifiPassword />,
        label: "Internet Access",
      },
    ],
  },
  {
    id: 4,
    feature: "Utilities",
    subFeature: [
      {
        type: "sewarage",
        icon:  <GiPipes />,
        label: "Sewarage",
      },
      {
        type: "electricity",
        icon: <MdElectricBolt />,
        label: "Electricity",
      },
      {
        type: "waterSupply",
        icon:  <IoWaterOutline />,
        label: "Water Supply",
      },
      {
        type: "gas",
        icon: <MdOutlineLocalFireDepartment />,
        label: "Gas",
      },
      {
        type: "security",
        icon: <MdOutlineSecurity />,
        label: "Security",
      },
    ],
  },
  {
    id: 5,
    feature: "Nearby Attractions",
    subFeature: [
      {
        type: "school",
        icon: <LiaSchoolSolid />,
        label: "School",
      },
      {
        type: "hospital",
        icon: <TbBuildingHospital />,
        label: "Hospital",
      },
      {
        type: "masjid",
        icon: <TbBuildingMosque />,
        label: "Masjid",
      },
      {
        type: "restaurant",
        icon: <GrRestaurant />,
        label: "Restaurant",
      },
    ],
  },
  {
    id: 6,
    feature: "Secondary Features",
    subFeature: [
      {
        type: "facing",
        icon: <BiSolidDownArrow />,
        label: "Facing",
      },
      {
        type: "whichFloorIsYourUnitOn",
        icon:<BiBuilding />,
        label: "Which Floor is your Unit on",
      },
      {
        type: "numberOfFloors",
        icon: <LiaBuildingSolid />,
        label: "Number of Floors",
      },
      {
        type: "maintenance",
        icon: <GrVmMaintenance />,
        label: "Maintenance",
      },
      {
        type: "accessibility",
        icon:  <TbBuildingBridge />,
        label: "Accessibility",
      },
      {
        type: "centralCooling",
        icon: <GiCooler />,
        label: "Central Cooling",
      },
      {
        type: "centralHeating",
        icon:  <MdOutlineHeatPump />,
        label: "Central Heating",
      },
      {
        type: "homeTheatre",
        icon: <GiTheater />,
        label: "Home Theatre",
      },
      {
        type: "separateEntry",
        icon: <GiEntryDoor />,
        label: "Separate Entry",
      },
      {
        type: "reuseableTop",
        icon: <LiaBuildingSolid />,
        label: "ReUseable Top",
      },
      {
        type: "elevator/lift",
        icon: <PiElevator />,
        label: "Elevator/Lift",
      },
      {
        type: "lawn",
        icon: <FaSun />,
        label: "Lawn",
      },
      {
        type: "swimmingPool",
        icon:  <MdPool />,
        label: "Swimming Pool",
      },
      {
        type: "dirtyKitchen",
        icon:<GiKitchenTap />,
        label: "Dirty Kitchen",
      },
    ],
  },

];

export  const cityOptions = [
  { value: 'islamabad', label: 'Islamabad' },
  { value: 'lahore', label: 'Lahore' },
  { value: 'karachi', label: 'Karachi' },
  { value: 'peshawar', label: 'Peshawar' },
  { value: 'quetta', label: 'Quetta' },
  { value: 'multan', label: 'Multan' },
  { value: 'faisalabad', label: 'Faisalabad' },
  { value: 'sialkot', label: 'Sialkot' },
  { value: 'rawalpindi', label: 'Rawalpindi' },
  { value: 'sargodha', label: 'Sargodha' },
  { value: 'gujranwala', label: 'Gujranwala' },
  { value: 'gujrat', label: 'Gujrat' },
  { value: 'sukkur', label: 'Sukkur' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'abbottabad', label: 'Abbottabad' },
  { value: 'bahawalpur', label: 'Bahawalpur' },
  { value: 'sahiwal', label: 'Sahiwal' },
  { value: 'jhelum', label: 'Jhelum' },
  { value: 'muzaffarabad', label: 'Muzaffarabad' },
  { value: 'mirpur', label: 'Mirpur' },
  { value: 'mardan', label: 'Mardan' },
  { value: 'kohat', label: 'Kohat' },
  { value: 'dera ismail khan', label: 'Dera Ismail Khan' },
  { value: 'dera ghazi khan', label: 'Dera Ghazi Khan' }
];

export const areaMeasures =[
  { value: 'marla', label: 'Marla' },
  { value: 'kanal', label: 'Kanal' },
  { value: 'squareFeet', label: 'Sq. Ft.' },
  { value: 'squareYards', label: 'Sq. Yd.' },
];

export const bedroomOpts =[
  { type: "studio", label: "Studio" },
  { type: "1", label: "1" },
  { type: "2", label: "2" },
  { type: "3", label: "3" },
  { type: "4", label: "4" },
  { type: "5", label: "5" },
  { type: "6", label: "6" },
  { type: "7", label: "7" },
  { type: "8", label: "8" },
  { type: "9", label: "9" },
  { type: "10", label: "10" },
  { type: "10+", label: "10+" }
];

export const bathroomOpts =[
  { type: "1", label: "1" },
  { type: "2", label: "2" },
  { type: "3", label: "3" },
  { type: "4", label: "4" },
  { type: "5", label: "5" },
  { type: "5+", label: "5+" },
];

export const subTypeResidential =[
  { type: "house", label: "House" },
  { type: "flat", label: "Flat" },
  { type: "hostel", label: "Hostel" },
  { type: "room", label: "Room" },
  { type: "upperPortion", label: "Upper Portion" },
  { type: "lowerPortion", label: "Lower Portion" },
];
export const subTypePlot =[
  { type: "residentialPlot", label: "Residential Plot" },
  { type: "commercialPlot", label: "Commercial Plot" },
  { type: "agriculturalLand", label: "Agricultural Land" },
  { type: "plotFile", label: "Plot File" },
];
export const subTypeCommercial =[
  { type: "office", label: "Office" },
  { type: "shop", label: "Shop" },
  { type: "building", label: "Building" },
  { type: "warehouse", label: "Ware House" },
  { type: "other", label: "Other" },
];
export const propertyType =[
  { type: "residential", label: "Residential" },
  { type: "plot", label: "Plot" },
  { type: "commercial", label: "Commercial" },
];
export const purpose =[
  { type: "sale", icon:   <TbHomeDollar />, label: "Sell" },
  { type: "rent", icon:  <GiKeyring />, label: "Rent" },
];

