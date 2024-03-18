import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SearchBox = dynamic(() => import("./dropdownInputwitSearch"));
const CardsPagination = dynamic(() => import("./CardsPagination"));
import { cityOptions, propertyType, subTypeCommercial } from "../../data/propertyFormData";
import { IListing } from "@/types/types";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CiFilter } from "react-icons/ci";
import Alert from "../ui/Modal";
import Amenities from "../Dashboard/amenities";
import DropDownwithValue from "./dropdownwithValue";
import DropDownwithApply from "./dropdownwithApply";
import { IFilter } from "@/types/types";
import Pricing from "./pricing";



type Props = {
  path: string;
  searchParams: ReadonlyURLSearchParams | null;
  listing: IListing[];
};


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
    bath: searchParams?.getAll("bathroom"),
    features: searchParams?.getAll("features"),
  };
  const initialFilterState: IFilter = {
    city: params.city,
    purpose: params.purpose,
    propertyType: params.propertyType,
    subPropertyType:
      params.subPropertyType && params.subPropertyType.length > 0
        ? JSON.parse(
          decodeURIComponent(params.subPropertyType[0]).replace(/%5B/g, "[").replace(/%5D/g, "]")
        )
        : ["All"]
    ,
    minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 0,
    measureType: params.measureType ? params.measureType : "Marla",
    minSize: params.minSize ? parseInt(params.minSize) : 0,
    maxSize: params.maxSize ? parseInt(params.maxSize) : 50,
    bed:
      params.bed && params.bed.length > 0
        ? JSON.parse(
          decodeURIComponent(params.bed[0]).replace(/%5B/g, "[").replace(/%5D/g, "]")
        )
        : ["Any"],
    bathroom:
      params.bath && params.bath.length > 0
        ? JSON.parse(
          decodeURIComponent(params.bath[0]).replace(/%5B/g, "[").replace(/%5D/g, "]")
        )
        : ["Any"],
    features:
      params.features && params.features.length > 0
        ? params.features.map(param => JSON.parse(decodeURIComponent(param)))
        : [],
    sort: "New Listings"
  };



  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      // Convert to Millions
      const crore = (price / 10000000);
      return `${crore} Crore`;
    } else if (price >= 100000) {
      // Convert to Lacs
      const lacs = (price / 100000);
      return `${lacs} Lac`;
    } else {
      // Default: display the price as is
      return `${price}`;
    }
  };

  const [filters, setFilters] = useState<IFilter>(initialFilterState);
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [tempFeatures, setTempFeatures] = useState({ features: filters.features || [] });
  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };


  const handleFeatures = (btnType: string) => {
    setTempFeatures((prevForm) => {
      let newFeatures = [...prevForm.features];
      if (newFeatures.includes(btnType)) {
        newFeatures = newFeatures.filter((feature) => feature !== btnType);
      } else {
        newFeatures = [...newFeatures, btnType];
      }
      return { ...prevForm, features: newFeatures };
    });
  };

  let price: string
  if (filters.minPrice > 0 && filters.maxPrice > 0) {
    price = `PKR${<Pricing price={filters.minPrice} />}-${<Pricing price={filters.maxPrice} />}`;
  } else if (filters.minPrice > 0 && filters.maxPrice === 0) {
    price = `PKR ${<Pricing price={filters.minPrice} />} +`;
  } else if (filters.maxPrice > 0 && filters.minPrice === 0) {
    price = `PKR - UPTO ${<Pricing price={filters.maxPrice} />}`;
  } else {
    price = "Price";
  }

  const handleReset = () => {
    setFilters((prevForm) => ({
      ...prevForm,
      features: [],
    }));

    setTempFeatures((prevForm) => ({
      ...prevForm,
      features: []
    }))
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
      return filters.subPropertyType?.some((sub: string) =>
        listingSubProps.includes(sub.toLowerCase())

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
      params.measureType && e.area.type.includes(params.measureType.toLowerCase())
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
    if (filters.bed[0] !== "Any") {
      filteredProperty = filteredProperty.filter((e) => {
        const listingBeds = e.bedrooms;
        return filters.bed?.some((bed) => listingBeds.includes(bed));
      });
    }
  }
  if (params.bath && params.bath.length > 0) {
    if (filters.bathroom[0] !== "Any") {
      filteredProperty = filteredProperty.filter((e) => {
        const listingBath = e.bathrooms;
        return filters.bathroom?.some((bath) => listingBath.includes(bath));
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
  if (filters.sort === "New Listings") {
    filteredProperty = filteredProperty.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  } else if (filters.sort === "Price Low to High") {
    filteredProperty = filteredProperty.sort((a, b) => {
      const PriceA = a.price;
      const PriceB = b.price;
      return PriceA - PriceB
    })
  } else if (filters.sort === "Price High to Low") {
    filteredProperty = filteredProperty.sort((a, b) => {
      const PriceA = a.price;
      const PriceB = b.price;
      return PriceB - PriceA
    })
  }

  useEffect(() => {
    const sp = new URLSearchParams(searchParams ?? "");
    let newPath = `/${filters.purpose === "Buy" ? "sale" : filters.purpose.toLowerCase()}/${filters.city
      .toLocaleLowerCase()
      .trim()}-${filters.propertyType.trim().toLowerCase()}`;

    newPath += `?`;
    if (
      !filters.subPropertyType.includes("All") &&
      filters.subPropertyType.length > 0
    ) {
      const encodedSubPropertyType = encodeURIComponent(JSON.stringify(filters.subPropertyType));
      sp.delete("subPropertyType")
      sp.set("subPropertyType", encodedSubPropertyType);
    } else if (filters.subPropertyType.includes("All")) {
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
    if (filters.measureType === "Marla" && (filters.minSize > 0 || filters.maxSize < 50)) {
      sp.set("sizeUnit", filters.measureType);
      if (filters.minSize === 0) {
        sp.delete("minSize")
      } if (filters.maxSize === 50) {
        sp.delete("maxSize")
      } if (filters.minSize > 0) {
        sp.set("minSize", filters.minSize.toString())
      } if (filters.maxSize < 50) {
        sp.set("maxSize", filters.maxSize.toString())
      }
    } else if (filters.measureType === "Sq.Ft" && (filters.minSize > 0 || filters.maxSize < 11250)) {
      sp.set("sizeUnit", filters.measureType);
      if (filters.minSize === 0) {
        sp.delete("minSize")
      } if (filters.maxSize === 11250) {
        sp.delete("maxSize")
      } if (filters.minSize > 0) {
        sp.set("minSize", filters.minSize.toString())
      } if (filters.maxSize < 11250) {
        sp.set("maxSize", filters.maxSize.toString())
      }
    }
    else if (filters.measureType === "Sq.M" && (filters.minSize > 0 || filters.maxSize < 51000)) {
      sp.set("sizeUnit", filters.measureType);
      if (filters.minSize === 0) {
        sp.delete("minSize")
      } if (filters.maxSize === 51000) {
        sp.delete("maxSize")
      } if (filters.minSize > 0) {
        sp.set("minSize", filters.minSize.toString())
      } if (filters.maxSize < 51000) {
        sp.set("maxSize", filters.maxSize.toString())
      }
    }
    else if (filters.measureType === "Sq.Yd" && (filters.minSize > 0 || filters.maxSize < 4000)) {
      sp.set("sizeUnit", filters.measureType);
      if (filters.minSize === 0) {
        sp.delete("minSize")
      } if (filters.maxSize === 4000) {
        sp.delete("maxSize")
      } if (filters.minSize > 0) {
        sp.set("minSize", filters.minSize.toString())
      } if (filters.maxSize < 4000) {
        sp.set("maxSize", filters.maxSize.toString())
      }
    } else if (filters.measureType === "Kanal" && (filters.minSize > 0 || filters.maxSize < 100)) {
      sp.set("sizeUnit", filters.measureType);
      if (filters.minSize === 0) {
        sp.delete("minSize")
      } if (filters.maxSize === 100) {
        sp.delete("maxSize")
      } if (filters.minSize > 0) {
        sp.set("minSize", filters.minSize.toString())
      } if (filters.maxSize < 100) {
        sp.set("maxSize", filters.maxSize.toString())
      }
    } else {
      sp.delete("sizeUnit");
      sp.delete("minSize");
      sp.delete("maxSize");
    }

    if (filters.bed && filters.bed.length > 0 && filters.bed[0] !== "Any") {
      const encodedBed = encodeURIComponent(JSON.stringify(filters.bed))
      sp.set("bed", encodedBed);
    } else {
      sp.delete("bed");
    }

    if (
      filters.bathroom &&
      filters.bathroom.length > 0 &&
      filters.bathroom[0] !== "Any"
    ) {
      const encodedBath = encodeURIComponent(JSON.stringify(filters.bathroom))
      sp.set("bathroom", encodedBath);
    } else {
      sp.delete("bathroom");
    }
    if (filters.features.length > 0) {
      const encodedFeatures = encodeURIComponent(JSON.stringify(filters.features))
      sp.set("features", encodedFeatures);
    } else {
      sp.delete("features");
    }
    router.push(`${newPath}${sp.toString()}`);
  }, [filters])

  const handleFeaturesCnfrm = () => {
    setFilters((prevForm) => ({
      ...prevForm,
      features: tempFeatures.features
    }))
  }

  return (
    <div className="flex justify-center py-5">
      {isOpen && (
        <Alert
          closeAlert={toggleAlert}
          component={
            <Amenities
              toggleAlert={toggleAlert}
              handleAllTags={handleFeatures}
              allTags={tempFeatures.features}
              handleReset={handleReset}
              filter
              handleConfirm={handleFeaturesCnfrm}
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
        <div className="flex justify-between">
          <div className="flex gap-2">
            <DropDownwithValue
              value={filters.purpose}
              menu={["Buy", "Rent"]}
              setValue={(e) => { e && setFilters((prevForm) => ({ ...prevForm, purpose: e })) }
              }
            />
            <DropDownwithApply
              value={filters.subPropertyType[0] === "All" ? `All ${filters.propertyType}` : filters.subPropertyType[0]}
              propType
              filters={filters}
              setFilters={setFilters}
            />
            <DropDownwithApply
              value={
                filters.minPrice > 0 && filters.maxPrice > 0
                  ? `PKR${formatPrice(filters.minPrice)}-${formatPrice(filters.maxPrice)}`
                  : filters.minPrice > 0 && filters.maxPrice === 0
                    ? `PKR ${formatPrice(filters.minPrice)} +`
                    : filters.maxPrice > 0 && filters.minPrice === 0
                      ? `PKR - UPTO ${formatPrice(filters.maxPrice)}`
                      : "Price"
              }
              price
              filters={filters}
              setFilters={setFilters}
              cross={filters.minPrice > 0 || filters.maxPrice > 0 ? true : false}
              handleCross={() => { setFilters((prevForm) => ({ ...prevForm, minPrice: 0, maxPrice: 0 })) }}
            />
            <DropDownwithApply
              value={
                filters.measureType === "Marla" && (filters.minSize > 0 || filters.maxSize < 50) ? `${filters.minSize}-${filters.maxSize} ${filters.measureType}` :
                  filters.measureType === "Sq.Ft" && (filters.minSize > 0 || filters.maxSize < 11250) ? `${filters.minSize}-${filters.maxSize} ${filters.measureType}` :
                    filters.measureType === "Sq.M" && (filters.minSize > 0 || filters.maxSize < 51000) ? `${filters.minSize}-${filters.maxSize} ${filters.measureType}` :
                      filters.measureType === "Sq.Yd" && (filters.minSize > 0 || filters.maxSize < 4000) ? `${filters.minSize}-${filters.maxSize} ${filters.measureType}` :
                        filters.measureType === "Kanal" && (filters.minSize > 0 || filters.maxSize < 100) ? `${filters.minSize}-${filters.maxSize} ${filters.measureType}` :
                          "Size"
              }
              size
              filters={filters}
              setFilters={setFilters}
              cross={filters.measureType === "Marla" && filters.minSize === 0 && filters.maxSize === 50 ? false : true}
              handleCross={() => { setFilters((prevForm) => ({ ...prevForm, measureType: "Marla", minSize: 0, maxSize: 50 })) }}
            />
            <DropDownwithApply value={filters.bed.length > 1 ? `Bedroom : 1 +${filters.bed.length - 1} More` : filters.bed.length === 1 && !filters.bed.includes("Any") ? `Bedroom: 1` : "Bedroom"} bed filters={filters} setFilters={setFilters} cross={filters.bed[0] === "Any" ? false : true} handleCross={() => setFilters((prevForm) => ({ ...prevForm, bed: ["Any"] }))} />
            <DropDownwithApply value={filters.bathroom.length > 1 ? `Bathroom : 1 +${filters.bathroom.length - 1} More` : filters.bathroom.length === 1 && !filters.bathroom.includes("Any") ? `Bathroom: 1` : "Bathroom"} bath filters={filters} setFilters={setFilters} cross={filters.bathroom[0] === "Any" ? false : true} handleCross={() => setFilters((prevForm) => ({ ...prevForm, bathroom: ["Any"] }))} />
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center text-sm border rounded-lg p-2 gap-1"
            >
              <CiFilter />
              {filters.features.length > 0 && (
                <span className="w-full h-3 bg-purple-800 rounded-full absolute right-[-5px] top-[-5px]"></span>
              )}
              More Filters
            </button>

          </div>
          <DropDownwithValue
            value={filters.sort}
            menu={["New Listings", "Price Low to High", "Price High to Low"]}
            setValue={(e) => { e && setFilters((prevForm) => ({ ...prevForm, sort: e })) }
            }
          />
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
