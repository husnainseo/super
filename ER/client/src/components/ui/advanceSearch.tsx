import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SearchBox = dynamic(() => import("./dropdownInputwitSearch"));
const CardsPagination = dynamic(() => import("./CardsPagination"));
import { cityOptions } from "../../data/propertyFormData";
import { IListing } from "@/types/types";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import Alert from "../ui/Modal";
import Amenities from "../Dashboard/amenities";
import DropDownwithValue from "./dropdownwithValue";
import DropDownwithApply from "./dropdownwithApply";
import MultiBtns from "./multipleBtns";
import Range from "./range";

type Props = {
  path: string;
  searchParams: ReadonlyURLSearchParams | null;
  listing: IListing[];
};

interface IFilter {
  city: string;
  purpose: string;
  propertyType: string;
  subPropertyType: string[];
  minPrice: number;
  maxPrice: number;
  measureType: string;
  minSize: number;
  maxSize: number;
  bed: string[];
  bathroom: string[];
  features: string[];
}

const AdvanceSearch: FC<Props> = ({ path, listing, searchParams }) => {
  const pathSegements = path.split("/")[2].split("-");
  const router = useRouter();
  const params = {
    city: pathSegements[0] ? pathSegements[0] : "Bahawalpur",
    purpose: path.includes("sale") ? "Buy" : "Rent",
    propertyType: pathSegements[1] ? pathSegements[1] : "residential",
    subPropertyType: searchParams?.getAll("subPropertyType"),
    minPrice: searchParams?.get("minPrice"),
    maxPrice: searchParams?.get("maxPrice"),
    measureType: searchParams?.get("sizeUnit"),
    minSize: searchParams?.get("minSize"),
    maxSize: searchParams?.get("maxSize"),
    bed: searchParams?.getAll("bed"),
    bath: searchParams?.getAll("bath"),
    features: searchParams?.getAll("features"),
  };
  const initialFilterState: IFilter = {
    city: params.city,
    purpose: params.purpose,
    propertyType: params.propertyType,
    subPropertyType:
      params.subPropertyType && params.subPropertyType[0]
        ? JSON.parse(decodeURIComponent(params.subPropertyType[0]))
        : ["All Properties"],
    minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 0,
    measureType: params.measureType ? params.measureType : "Marla",
    minSize: params.minSize ? parseInt(params.minSize) : 0,
    maxSize: params.maxSize ? parseInt(params.maxSize) : 0,
    bed:
      params.bed && params.bed[0]
        ? JSON.parse(decodeURIComponent(params.bed[0]))
        : ["any"],
    bathroom:
      params.bath && params.bath[0]
        ? JSON.parse(decodeURIComponent(params.bath[0]))
        : ["any"],
    features:
      params.features && params.features[0]
        ? JSON.parse(decodeURIComponent(params.features![0]))
        : [],
  };
  const [filters, setFilters] = useState<IFilter>(initialFilterState);
  const [isOpen, setIsOpen] = useState(false);
  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };
  const handleFeatures = (btnType: string) => {
    setFilters((prevForm) => {
      let newFeatures = [...prevForm.features];
      if (newFeatures.includes(btnType)) {
        newFeatures = newFeatures.filter((feature) => feature !== btnType);
      } else {
        newFeatures = [...newFeatures, btnType];
      }
      return { ...prevForm, features: newFeatures };
    });
  };

  const handleSubPropertyType = (btnType: string) => {
    setFilters((prevForm) => {
      let newSubPropertyType = [...prevForm.subPropertyType];
      if (newSubPropertyType.includes(btnType)) {
        newSubPropertyType = newSubPropertyType.filter(
          (feature) => feature !== btnType
        );
      } else {
        newSubPropertyType = [...newSubPropertyType, btnType];
      }
      return { ...prevForm, subPropertyType: newSubPropertyType };
    });
  };

  const handleBed = (btnType: string) => {
    setFilters((prevForm) => {
      let newBed = [...prevForm.bed];
      if (newBed.includes(btnType)) {
        newBed = newBed.filter((feature) => feature !== btnType);
      } else {
        newBed = [btnType];
      }
      return { ...prevForm, bed: newBed };
    });
  };

  const handleBath = (btnType: string) => {
    setFilters((prevForm) => {
      let newBath = [...prevForm.bathroom];
      if (newBath.includes(btnType)) {
        newBath = newBath.filter((feature) => feature !== btnType);
      } else {
        newBath = [btnType];
      }
      return { ...prevForm, bathroom: newBath };
    });
  };

  const handleReset = () => {
    setFilters((prevForm) => ({
      ...prevForm,
      features: [],
    }));
  };

  let filteredProperty = listing;

  if (path.includes("sale")) {
    filteredProperty = filteredProperty.filter((e) => e.purpose === "sale");
  } else if (path.includes("rent")) {
    filteredProperty = filteredProperty.filter((e) => e.purpose === "rent");
  }
  if (params.city) {
    filteredProperty = filteredProperty.filter(
      (e) => e.city === params.city.toLowerCase()
    );
  }
  if (params.propertyType) {
    filteredProperty = filteredProperty.filter(
      (e) => e.propertyType === params.propertyType
    );
  }
  if (params.subPropertyType && params.subPropertyType.length > 0) {
    filteredProperty = filteredProperty.filter((e) => {
      const listingSubProps = e.subPropertyType;
      return params.subPropertyType?.every((sub: string) =>
        listingSubProps.includes(sub)
      );
    });
  }
  if (params.minPrice || params.maxPrice) {
    filteredProperty = filteredProperty.filter((e) => {
      if (params.minPrice && params.maxPrice) {
        return (
          e.price >= parseInt(params.minPrice) &&
          e.price <= parseInt(params.maxPrice)
        );
      } else if (params.maxPrice) {
        return e.price <= parseInt(params.maxPrice);
      } else if (params.minPrice) {
        return e.price >= parseInt(params.minPrice);
      }
      return true;
    });
  }
  if (typeof params.measureType === "string" && params.measureType !== null) {
    filteredProperty = filteredProperty.filter((e) =>
      e.area.type.includes(params.measureType!)
    );
  }
  if (params.minSize || params.maxSize) {
    filteredProperty = filteredProperty.filter((e) => {
      if (params.minSize && params.maxSize) {
        return (
          e.area.size >= parseInt(params.minSize) &&
          e.area.size <= parseInt(params.maxSize)
        );
      } else if (params.maxSize) {
        return e.area.size <= parseInt(params.maxSize);
      } else if (params.minSize) {
        return e.area.size >= parseInt(params.minSize);
      }
      return true;
    });
  }
  if (params.bed && params.bed.length > 0) {
    if (filters.bed[0] !== "any") {
      filteredProperty = filteredProperty.filter((e) => {
        const listingBeds = e.bedrooms;
        return params.bed?.every((bed) => listingBeds.includes(bed));
      });
    }
  }
  if (params.bath && params.bath.length > 0) {
    if (filters.bed[0] !== "any") {
      filteredProperty = filteredProperty.filter((e) => {
        const listingBath = e.bathrooms;
        return params.bath?.every((bath) => listingBath.includes(bath));
      });
    }
  }
  if (params.features) {
    filteredProperty = filteredProperty.filter((listing) => {
      const listingFeatures = listing.features.map((feature) => feature.type);
      return filters.features.every((feature: string) =>
        listingFeatures.includes(feature)
      );
    });
  }

  const handleSearch = () => {
    const sp = new URLSearchParams(searchParams ?? "");
    const pathSegments = path.split("/");
    let newPath = `/${filters.purpose.toLowerCase()}/${filters.city
      .toLocaleLowerCase()
      .trim()}-${filters.propertyType.trim().toLowerCase()}`;

    newPath += `?`;
    if (
      !filters.subPropertyType.includes("all") &&
      filters.subPropertyType.length > 0
    ) {
      const encodedSubPropertyType = filters.subPropertyType
        .map(encodeURIComponent)
        .join(",");
      sp.set("subPropertyType", encodedSubPropertyType);
    } else if (filters.subPropertyType.includes("all")) {
      sp.delete("subPropertyType");
    }
    if (filters.minPrice > 0) {
      sp.set("minPrice", filters.minPrice.toString());
    } else {
      sp.delete("minPrice");
    }
    if (filters.maxPrice > 0) {
      sp.set("maxPrice", filters.maxPrice.toString());
    } else {
      sp.delete("maxPrice");
    }
    if (filters.measureType && (filters.minSize > 0 || filters.maxSize > 0)) {
      sp.set("sizeUnit", filters.measureType);
    } else {
      sp.delete("sizeUnit");
      sp.delete("minSize");
      sp.delete("maxSize");
    }

    if (filters.minSize > 0) {
      sp.set("minSize", filters.minSize.toString());
    } else {
      sp.delete("minSize");
    }

    if (filters.maxSize > 0) {
      sp.set("maxSize", filters.maxSize.toString());
    } else {
      sp.delete("maxSize");
    }

    if (filters.bed && filters.bed.length > 0 && filters.bed[0] !== "any") {
      const encodedBed = filters.bed.map(encodeURIComponent).join(",");
      sp.set("bed", encodedBed);
    } else {
      sp.delete("bed");
    }

    if (
      filters.bathroom &&
      filters.bathroom.length > 0 &&
      filters.bathroom[0] !== "any"
    ) {
      const encodedBath = filters.bathroom.map(encodeURIComponent).join(",");
      sp.set("bathroom", encodedBath);
    } else {
      sp.delete("bathroom");
    }
    if (filters.features.length > 0) {
      const encodedFeatures = filters.features
        .map(encodeURIComponent)
        .join(",");
      sp.set("features", encodedFeatures);
    } else {
      sp.delete("features");
    }
    router.push(`${newPath}${sp.toString()}`);
  };

  return (
    <div className="flex justify-center py-5">
      {isOpen && (
        <Alert
          closeAlert={toggleAlert}
          component={
            <Amenities
              toggleAlert={toggleAlert}
              handleAllTags={handleFeatures}
              allTags={filters.features}
              handleReset={handleReset}
              filter
            />
          }
          heading="Features and Amenities"
        />
      )}
      <div className="max-w-[1400px] w-full flex flex-col gap-5">
        <SearchBox
          options={cityOptions}
          placeholder="Select City"
          defaultLabel={filters.city}
          defaultValue={filters.city}
          onValueChange={(e) =>
            e && setFilters((prevForm) => ({ ...prevForm, city: e }))
          }
          border="border"
          width="300px"
        />
        <div className="flex gap-2">
          <DropDownwithValue
            value={filters.purpose}
            menu={["Buy", "Rent"]}
            setValue={(e) =>
              {e && setFilters((prevForm) => ({ ...prevForm, purpose: e }));handleSearch}
            }
          />
          <DropDownwithApply
          handleSearch={handleSearch}
            value={filters.propertyType}
            component={<MultiBtns property />}
          />
          <DropDownwithApply
          handleSearch={handleSearch}
            value="Price"
            component={<Range title="Price" />}
          />
          <DropDownwithApply
          handleSearch={handleSearch}
            value="Size"
            component={
              <Range
                area
                title="Price"
                unit={filters.measureType}
                component={
                  <DropDownwithValue
                    menu={["Marla", "Sq.Ft", "Sq.Yd", "Sq.M", "Kanal"]}
                    value={filters.measureType}
                    setValue={(e) =>
                      e &&
                      setFilters((prevForm) => ({
                        ...prevForm,
                        measureType: e,
                      }))
                    }
                  />
                }
              />
            }
          />
          <DropDownwithApply handleSearch={handleSearch} value="Bed" component={<MultiBtns bed />} />
          <DropDownwithApply handleSearch={handleSearch} value="Bath" component={<MultiBtns bath />} />
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center text-sm border rounded-lg p-2 gap-1"
          >
            <CiFilter />
            {filters.features.length > 0 && (
              <span className="w-3 h-3 bg-purple-800 rounded-full absolute right-[-5px] top-[-5px]"></span>
            )}
            More Filters
          </button>
        </div>
        {filteredProperty.length > 0 ? (
          <CardsPagination listing={filteredProperty} />
        ) : (
          "No Property Found"
        )}
      </div>
    </div>
  );
};

export default AdvanceSearch;
