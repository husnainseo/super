import React, { FC, useEffect, useState, lazy, Suspense } from "react";
import DashboardMenu from "./dashboardMenu";
import DashSideBar from "./dashboardSideBar";
import ProfileMenu from "./profileMenu";
import PropertyPreview from "./propertyPreview";
import DashRightSide from "./dashRightSide";
import ManageProperties from "./manageProperties";
import ChangePassword from "./changePassword";
import Alert from "../ui/Modal";
import Amenities from "./amenities";
import { useLogoutQuery } from "../../redux/features/auth/authAPI";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import CoverImage from "./coverImage";
import { FormState, IListing } from "@/types/types";
import Loader from "@/components/ui/Loader";
import { LuLoader2 } from "react-icons/lu";

const ListingsMenu = lazy(() => import("./Form/propertyForm"));

type Props = {};

const Main: FC<Props> = () => {
  const [route, setRoute] = useState("dashboard");
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [activeCover, setActiveCover] = useState(false);
  const [formEditMode, setFormEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [loader, setLoader] = useState(false);

  const initialFormState: FormState = {
    purpose: "",
    propertyType: "residential",
    subPropertyType: "",
    city: "",
    location: "",
    area: {
      type: "marla",
      size: 0,
    },
    price: 0,
    bedrooms: "",
    bathrooms: "",
    features: [],
    title: "",
    description: "",
    contact: user?.profile.mobile || 92,
    whatsapp: user?.profile.whatsapp || 92,
    name: user?.name || "",
    images: [],
    coverImage: 0,
  };
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1060); // Adjust breakpoint as needed
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditListing = (id: string) => {
    const listingExist: IListing = user.listings.find(
      (listing: IListing) => listing._id === id
    );
    if (listingExist) {
      const images = listingExist.images.map((image) => image.url);

      setEditId(id);
      setFormEditMode(true);
      setForm((prevForm) => ({
        ...prevForm,
        purpose: listingExist.purpose,
        propertyType: listingExist.propertyType,
        subPropertyType: listingExist.subPropertyType,
        city: listingExist.city,
        location: listingExist.location,
        area: {
          type: listingExist.area.type,
          size: listingExist.area.size,
        },
        price: listingExist.price,
        bedrooms: listingExist.bedrooms,
        bathrooms: listingExist.bathrooms,
        features: listingExist.features,
        title: listingExist.title,
        description: listingExist.description,
        contact: listingExist.contact,
        whatsapp: listingExist.whatsapp,
        name: listingExist.name,
        images: listingExist.images,
        coverImage: listingExist.coverImage,
      }));
      console.log(form);
    }
  };

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    console.log("logout working");
  };

  const handleButton = (btnType: string, btnValue: string) => {
    setForm((prevForm) => {
      let newFeatures = [...prevForm.features];
      if (btnValue === "0") {
        newFeatures = newFeatures.filter((feature) => feature.type !== btnType);
      } else if (
        newFeatures.some(
          (feature) => feature.type === btnType && feature.value === btnValue
        )
      ) {
        newFeatures = newFeatures.filter((feature) => feature.type !== btnType);
      } else if (newFeatures.some((feature) => feature.type === btnType)) {
        newFeatures = newFeatures.map((feature) =>
          feature.type === btnType
            ? { type: btnType, value: btnValue }
            : feature
        );
      } else {
        newFeatures = [...newFeatures, { type: btnType, value: btnValue }];
      }
      return { ...prevForm, features: newFeatures };
    });
  };

  const handleReset = () => {
    setForm((prevForm) => ({
      ...prevForm,
      features: [],
    }));
  };
  
  

  const handleRemoveTag = (tagToRemove: string, valueToRemove: string) => {
    setForm((prevForm) => {
      const newFeatures = prevForm.features.filter(
        (feature) =>
          !(feature.type === tagToRemove && feature.value === valueToRemove)
      );
      return { ...prevForm, features: newFeatures };
    });
  };

  const handleCoverImage = (index: number) => {
    setForm((prevForm) => {
      return { ...prevForm, coverImage: index };
    });
  };

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };

  const toggleCover = () => {
    console.log("working");
    setActiveCover(!activeCover);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="first bg-[#f9f4f4] h-full">
      <div className="relative h-screen w-full flex justify-center items-center overflow-hidden font-Poppins">
          <div className="flex h-full w-full flex-wrap justify-center ">
            <div className={`${isMobile ? ("w-full absolute bottom-0 px-2 pb-1"):("h-full w-[80px]")} `}>
              {isOpen && (
                <Alert
                  closeAlert={toggleAlert}
                  component={
                    <Amenities
                      toggleAlert={toggleAlert}
                      handleAllTags={handleButton}
                      allTags={form.features}
                      removeTags={handleRemoveTag}
                      handleReset={handleReset}
                    />
                  }
                  heading="Features and Amenities"
                />
              )}
              {activeCover && (
                <Alert
                  closeAlert={toggleCover}
                  component={
                    <CoverImage
                      form={form}
                      handleCoverImage={handleCoverImage}
                      close={toggleCover}
                    />
                  }
                  heading="Set Cover Image"
                />
              )}
                  <DashSideBar
                setRoute={setRoute}
                setActiveLink={setActiveLink}
                activeLink={activeLink}
                logoutHandler={logoutHandler}
                setForm={setForm}
                initialFormState={initialFormState}
                isMobile={isMobile}
              />
            </div>

            <div className={`flex-1 ${isMobile ? ("h-[calc(100vh-80px)]"):("h-screen")}`}>
              <div className={`flex justify-center items-center h-full ${isMobile && "mx-1 w-screen"} `}>
                <div className="w-[98%] flex flex-col gap-5 p-5 h-[96%] bg-white border rounded-3xl relative">
                  <h1 className="text-xl border-b pb-3 border-zinc-400">
                    {route === "dashboard" && "Dashboard"}
                    {route === "property" && "Upload your listing details"}
                    {route === "profile" && "Profile Settings"}
                    {route === "manage" && "Manage Listings"}
                    {route === "password" && "Change Password"}
                    {route === "edit-listing" && "Edit Listing"}
                  </h1>
                  <div className="w-full overflow-auto">
                    {route === "dashboard" && <DashboardMenu />}

                    {route === "property" && (
                      <>
                          <Suspense fallback={ <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div className="text-2xl animate-spin"><LuLoader2/></div></div>}>
                          <ListingsMenu
                            activeAlert={toggleAlert}
                            activeCover={toggleCover}
                            rmTags={handleRemoveTag}
                            form={form}
                            setForm={setForm}
                            initialFormState={initialFormState}
                            setLoader={setLoader}
                          />
                        </Suspense>
                      </>
                    )}
                    {route === "profile" && (
                      <ProfileMenu user={user} setRoute={setRoute} />
                    )}
                    {route === "manage" && (
                      <ManageProperties
                        user={user}
                        setRoute={setRoute}
                        handleEditListing={handleEditListing}
                      />
                    )}
                    {route === "password" && <ChangePassword />}
                    {route === "edit-listing" && (
                      <>
                        <Suspense
                          fallback={
                            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
                          }
                        >
                          <ListingsMenu
                            activeAlert={toggleAlert}
                            activeCover={toggleCover}
                            rmTags={handleRemoveTag}
                            form={form}
                            setForm={setForm}
                            initialFormState={initialFormState}
                            formEditMode={formEditMode}
                            editId={editId}
                            setLoader={setLoader}
                          />
                        </Suspense>
                      </>
                    )}
                  </div>
                </div>
             
              </div>
           
            </div>
            <div className="h-full w-[25vw] hidden xl:block">
              {route === "property" ? (
                <PropertyPreview />
              ) : (
                <DashRightSide
                  setRoute={setRoute}
                  setActiveLink={setActiveLink}
                  setForm={setForm}
                  initialFormState={initialFormState}
                />
              )}
            </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default Main;
