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
  { value: 'rawalpindi', label: 'Rawalpindi' },
  { value: 'bahawalpur', label: 'Bahawalpur' },
];

export const bwpSocieties = [
  { value: 'modeltown', label: 'Model Town' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'satellitetown', label: 'Satellite Town' },
  { value: 'gulshaneiqbal', label: 'Gulshan-e-Iqbal' },
  { value: 'officerscolony', label: 'Officers Colony' },
  { value: 'doctorscolony', label: "Doctor's Colony" },
  { value: 'aminpurbangla', label: 'Aminpur Bangla' },
  { value: 'shadabcolony', label: 'Shadab Colony' },
  { value: 'ashraftown', label: 'Ashraf Town' },
  { value: 'jinnahcolony', label: 'Jinnah Colony' },
  { value: 'civillines', label: 'Civil Lines' },
  { value: 'alnoorgarden', label: 'Al-Noor Garden' },
  { value: 'faisaltown', label: 'Faisal Town' },
  { value: 'madinatown', label: 'Madina Town' },
  { value: 'gulbergcolony', label: 'Gulberg Colony' },
  { value: 'siddiquecolony', label: 'Siddique Colony' },
  { value: 'universitytown', label: 'University Town' },
  { value: 'faridgate', label: 'Farid Gate' },
  { value: 'jhangiwalaroad', label: 'Jhangi Wala Road' },
  { value: 'muslimtown', label: 'Muslim Town' },
  { value: 'alhudatown', label: 'Al-Huda Town' },
  { value: 'newghallamandi', label: 'New Ghalla Mandi' },
  { value: 'shadmancolony', label: 'Shadman Colony' },
  { value: 'dubaichowk', label: 'Dubai Chowk' },
  { value: 'modelcity', label: 'Model City' },
  { value: 'sadiqabadcolony', label: 'Sadiqabad Colony' }
];

export const islamabadSocieties = [
  { value: 'bahriatown', label: 'Bahria Town Islamabad' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'gulberg', label: 'Gulberg' },
  { value: 'e11', label: 'E-11 (Margalla Town)' },
  { value: 'g11', label: 'G-11' },
  { value: 'f11', label: 'F-11' },
  { value: 'i8', label: 'I-8' },
  { value: 'h8', label: 'H-8' },
  { value: 'g14', label: 'G-14' },
  { value: 'f10', label: 'F-10' },
  { value: 'g10', label: 'G-10' },
  { value: 'i10', label: 'I-10' },
  { value: 'e7', label: 'E-7' },
  { value: 'f6', label: 'F-6' },
  { value: 'g15', label: 'G-15' },
  { value: 'g13', label: 'G-13' },
  { value: 'g16', label: 'G-16' },
  { value: 'e16', label: 'E-16' },
  { value: 'h16', label: 'H-16' },
  { value: 'g5', label: 'G-5' },
  { value: 'g6', label: 'G-6' },
  { value: 'g7', label: 'G-7' },
  { value: 'i14', label: 'I-14' },
  { value: 'i15', label: 'I-15' },
  { value: 'd12', label: 'D-12' },
  { value: 'e12', label: 'E-12' },
  { value: 'g8', label: 'G-8' },
  { value: 'f7', label: 'F-7' },
  { value: 'i9', label: 'I-9' }
];

export const peshawarSocieties = [
  { value: 'hayatabad', label: 'Hayatabad' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'phas', label: 'Peshawar Housing Authority Society (PHAS)' },
  { value: 'warsakroad', label: 'Warsak Road' },
  { value: 'nawababad', label: 'Nawababad' },
  { value: 'shamshatoo', label: 'Shamshatoo' },
  { value: 'landikotalroad', label: 'Landi Kotal Road' },
  { value: 'abadabazai', label: 'Abad Abazai' },
  { value: 'regilalma', label: 'Regi Lalma' },
  { value: 'regilalmaextension', label: 'Regi Lalma Extension' },
  { value: 'regilalma2', label: 'Regi Lalma 2' },
  { value: 'regilalma3', label: 'Regi Lalma 3' }
];

export const quettaSocieties = [
  { value: 'jinnah', label: 'Jinnah Town' },
  { value: 'samina', label: 'Samina Town' },
  { value: 'zarghun', label: 'Zarghun Road' },
  { value: 'sariab', label: 'Sariab Road' },
  { value: 'zarghoon', label: 'Zarghoon Abad' },
  { value: 'shahbaz', label: 'Shahbaz Town' },
  { value: 'nawan', label: 'Nawan Killi' },
  { value: 'tobatek', label: 'Tobatek' },
  { value: 'chiltan', label: 'Chiltan Housing Scheme' },
  { value: 'arficoop', label: 'Arfi Cooperative Housing Society' }
];

export const rawalpindiSocieties = [
  { value: 'bahriatown', label: 'Bahria Town Rawalpindi' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'ghouri', label: 'Ghouri Town' },
  { value: 'scheme3', label: 'Scheme 3' },
  { value: 'chaklala', label: 'Chaklala' },
  { value: 'scheme1', label: 'Scheme 1' },
  { value: 'westridge', label: 'Westridge' },
  { value: 'saddar', label: 'Saddar' },
  { value: 'scheme2', label: 'Scheme 2' },
  { value: 'scheme4', label: 'Scheme 4' },
  { value: 'scheme5', label: 'Scheme 5' },
  { value: 'adiala', label: 'Adiala Road' },
  { value: 'gulraiz', label: 'Gulraiz Housing Scheme' },
  { value: 'paf', label: 'PAF Colony' },
  { value: 'bani', label: 'Bani Gala' },
  { value: 'shamsabad', label: 'Shamsabad' },
  { value: 'bahria', label: 'Bahria Town Phase 8' }
];

export const lahoreSocieties = [
  { value: 'bahriatown', label: 'Bahria Town Lahore' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'johartown', label: 'Johar Town' },
  { value: 'waptown', label: 'Wapda Town' },
  { value: 'askaritown', label: 'Askari Town' },
  { value: 'gulberg', label: 'Gulberg' },
  { value: 'modeltown', label: 'Model Town' },
  { value: 'gardenstown', label: 'Gardens Town' },
  { value: 'township', label: 'Township' },
  { value: 'valencia', label: 'Valencia Town' },
  { value: 'canaltown', label: 'Canal View' },
  { value: 'jubileetown', label: 'Jubilee Town' },
  { value: 'sukhchaloutown', label: 'Sukh Chalou' },
  { value: 'samanabad', label: 'Samanabad' },
  { value: 'lalazar', label: 'Lalazar' },
  { value: 'mustafatown', label: 'Mustafa Town' },
  { value: 'shadbagh', label: 'Shadbagh' },
  { value: 'shadman', label: 'Shadman' },
  { value: 'allamaiqbal', label: 'Allama Iqbal Town' },
  { value: 'sabzazar', label: 'Sabzazar' },
  { value: 'chauburji', label: 'Chauburji' },
  { value: 'garhishahu', label: 'Ghari Shahu' },
  { value: 'cavalryground', label: 'Cavalry Ground' },
  { value: 'nfc', label: 'National Fertilizer Corporation (NFC)' },
  { value: 'nfc2', label: 'NFC Phase 2' }
];

export const multanSocieties = [
  { value: 'waptown', label: 'Wapda Town' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'bosancolony', label: 'Bosan Colony' },
  { value: 'shahrukhcolony', label: 'Shah Rukn-e-Alam Colony' },
  { value: 'shamshercolony', label: 'Shamsher Colony' },
  { value: 'shahrukhwali', label: 'Shah Rukn-e-Wali Colony' },
  { value: 'gulgashtcolony', label: 'Gulgasht Colony' },
  { value: 'chungi9', label: 'Chungi No.9' },
  { value: 'modeltown', label: 'Model Town' },
  { value: 'civilines', label: 'Civil Lines' },
  { value: 'cantt', label: 'Cantt' },
  { value: 'bztown', label: 'BZU Town' },
  { value: 'jinnahpark', label: 'Jinnah Park' },
  { value: 'joharcolony', label: 'Johar Colony' },
  { value: 'bukharicolony', label: 'Bukhari Colony' },
  { value: 'peoplescolony', label: 'People’s Colony' },
  { value: 'shujabadroad', label: 'Shujabad Road' },
  { value: 'nawabpur', label: 'Nawabpur' },
  { value: 'mumtazabad', label: 'Mumtazabad' },
  { value: 'gulgastcolony', label: 'Gulgast Colony' },
  { value: 'greenfort', label: 'Green Fort' },
  { value: 'khanvillasmultan', label: 'Khan Villas Multan' },
  { value: 'ghosacolony', label: 'Ghosa Colony' },
  { value: 'modeltownbosanroad', label: 'Model Town Bosan Road' },
  { value: 'pakarabhousing', label: 'Pak Arab Housing Society' },
  { value: 'shamshabadcolony', label: 'Shamshabad Colony' }
];

export const karachiSocieties = [
  { value: 'bahriatown', label: 'Bahria Town Karachi' },
  { value: 'dha', label: 'Defence Housing Authority (DHA)' },
  { value: 'gulshaneiqbal', label: 'Gulshan-e-Iqbal' },
  { value: 'johartown', label: 'Johar Town' },
  { value: 'nazimabad', label: 'Nazimabad' },
  { value: 'clifton', label: 'Clifton' },
  { value: 'saddar', label: 'Saddar' },
  { value: 'korangi', label: 'Korangi' },
  { value: 'northnazimabad', label: 'North Nazimabad' },
  { value: 'pechs', label: 'PECHS (Pakistan Employees Cooperative Housing Society)' },
  { value: 'landhidarya', label: 'Landhi Darya Cooperative Housing Society' },
  { value: 'gulistanejohar', label: 'Gulistan-e-Johar' },
  { value: 'malir', label: 'Malir' },
  { value: 'garden', label: 'Garden' },
  { value: 'lyari', label: 'Lyari' },
  { value: 'shahfaisal', label: 'Shah Faisal Town' },
  { value: 'surjani', label: 'Surjani Town' },
  { value: 'northkarachi', label: 'North Karachi' },
  { value: 'karachiregisteredsociety', label: 'Karachi Registered Society' },
  { value: 'superhighway', label: 'Super Highway' },
  { value: 'baldia', label: 'Baldia Town' },
  { value: 'korangitown', label: 'Korangi Town' },
  { value: 'defenceview', label: 'Defence View Society' },
  { value: 'saadi', label: 'Saadi Town' },
  { value: 'pibcolony', label: 'PIB Colony' },
  { value: 'defenceliving', label: 'Defence Living Society' }
];


export const faisalabadSocieties = [
  { value: 'waptown', label: 'Wapda Town' },
  { value: 'gulberg', label: 'Gulberg' },
  { value: 'jinnahcolony', label: 'Jinnah Colony' },
  { value: 'civilines', label: 'Civil Lines' },
  { value: 'samanabad', label: 'Samanabad' },
  { value: 'peoplescolony', label: 'People’s Colony' },
  { value: 'ghouricolony', label: 'Ghouri Colony' },
  { value: 'millatcolony', label: 'Millat Town' },
  { value: 'allamaiqbalcolony', label: 'Allama Iqbal Colony' },
  { value: 'jhangroad', label: 'Jhang Road' },
  { value: 'madina', label: 'Madina Town' },
  { value: 'punjabgovt', label: 'Punjab Government Employees Cooperative Housing Society' },
  { value: 'mumtazabad', label: 'Mumtazabad' }
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

