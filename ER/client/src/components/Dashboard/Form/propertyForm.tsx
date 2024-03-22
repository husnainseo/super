import React, { useState, useEffect, FC } from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import "react-international-phone/style.css";
import { FormState } from "@/types/types";
import DropDown from "../../ui/dropdownInputwitSearch";
import Image from "next/image";
import Map from "../mapbox";
import { IListingImage } from "@/types/types";
import { FiUploadCloud } from "react-icons/fi";
import { styles } from "@/Styles/style";
import TagList from "../tags";
import RenderButtons from "./buttons";
import { RxCross2 } from "react-icons/rx";
import {
  areaMeasures,
  bathroomOpts,
  bedroomOpts,
  cityOptions,
  purpose,
  subTypeCommercial,
  subTypePlot,
  subTypeResidential,
  propertyType,
  lahoreSocieties,
  bwpSocieties,
  faisalabadSocieties,
  karachiSocieties,
  multanSocieties,
  islamabadSocieties,
  rawalpindiSocieties,
  quettaSocieties,
  peshawarSocieties,
} from "@/data/propertyFormData";

const { useCreateListingMutation, useUpdateListingMutation } = await import(
  "@/redux/features/listing/listingApi"
);
const { useLoadUserQuery } = await import("@/redux/features/api/apiSlice");
const { PhoneInput } = await import("react-international-phone");

type Props = {
  activeAlert?: () => void;
  rmTags: (type: string, value: string) => void;
  activeCover?: () => void;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  initialFormState: FormState;
  formEditMode?: boolean;
  editId?: string;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter your Full Name"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your Email!"),
  password: yup
    .string()
    .required("Please enter your Password!")
    .min(8, "Password is too short - should be 8 chars minimum."),
  userType: yup
    .string()
    .required("Please select if you are a Real Estate Agent or not!"),
});

const Property: FC<Props> = ({
  activeAlert,
  rmTags,
  activeCover,
  form,
  setForm,
  initialFormState,
  formEditMode,
  editId,
  setLoader,
}) => {
  const [createListing, { isSuccess, error, isLoading }] =
    useCreateListingMutation();
  const [
    updateListing,
    { isSuccess: isSuccessEdit, error: errorEdit, isLoading: isLoadingEdit },
  ] = useUpdateListingMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, { skip: !loadUser });
  const [editMode, setEditMode] = useState(formEditMode);
  useEffect(() => {
    if (loadUser) {
      refetch();
      setLoadUser(false);
    }
  }, [loadUser, isLoading, isLoadingEdit, refetch]);
  console.log("list", form);

  const handleImages = async (e: any) => {
    const files: File[] = Array.from(e.target.files);


    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setForm((prevForm) => ({
            ...prevForm,
            images: [...prevForm.images, fileReader.result],
          }));
        }
      };
      fileReader.readAsDataURL(file);
    });
  };

  React.useEffect(() => {
    if (isLoading || isLoadingEdit) {
      setLoader(true);
    }
    if (isSuccess) {
      toast.success("Listing Created Successfully");
      setLoader(false);
      setLoadUser(true);
      setForm(initialFormState);
    }
    if (isSuccessEdit) {
      toast.success("Listing Updated Successfully");
      setLoader(false);
      setLoadUser(true);
      setForm(initialFormState);
    }
    if (error) {
      toast.error("Failed to create listing");
      setLoader(false);
    }
    if (errorEdit) {
      toast.error("Failed to update listing");
      setLoader(false);
    }
  }, [isSuccess, error, isSuccessEdit, errorEdit, isLoading, isLoadingEdit]);

  const handleSubmit = () => {
    if (editMode) {
      updateListing({ data: form, id: editId });
    } else {
      createListing(form);
      console.log(form);
    }
  };


  return (
    <>
      <div className="flex flex-col gap-5 max-w-sm">
        <label>Select Purpose</label>
        <div className="flex gap-5">
          <RenderButtons
            buttonConfig={purpose}
            formProperty="purpose"
            activeClass={styles.activeButton}
            inactiveClass={styles.inactiveButton}
            form={form}
            setForm={setForm}
          />
        </div>
        <label>Select Property Type</label>
        <div className="flex gap-8 border-b max-w-sm">
          <RenderButtons
            buttonConfig={propertyType}
            formProperty="propertyType"
            activeClass={styles.activeTab}
            inactiveClass={styles.inActiveTab}
            form={form}
            setForm={setForm}
          />
        </div>
        <div className="flex gap-5 max-w-sm flex-wrap">
          {form.propertyType === "residential" && (
            <>
              <RenderButtons
                buttonConfig={subTypeResidential}
                formProperty="subPropertyType"
                activeClass={styles.activeButton}
                inactiveClass={styles.inactiveButton}
                form={form}
                setForm={setForm}
              />
            </>
          )}
          {form.propertyType === "plot" && (
            <>
              <RenderButtons
                buttonConfig={subTypePlot}
                formProperty="subPropertyType"
                activeClass={styles.activeButton}
                inactiveClass={styles.inactiveButton}
                form={form}
                setForm={setForm}
              />
            </>
          )}
          {form.propertyType === "commercial" && (
            <>
              <RenderButtons
                buttonConfig={subTypeCommercial}
                formProperty="subPropertyType"
                activeClass={styles.activeButton}
                inactiveClass={styles.inactiveButton}
                form={form}
                setForm={setForm}
              />
            </>
          )}
        </div>
        <label>City</label>
        <DropDown
          del={() => setForm({ ...form, city: "" })}
          options={cityOptions}
          placeholder="Select City"
          {...(form.city !== "" && {
            defaultLabel:
              form.city.charAt(0).toUpperCase() + form.city.slice(1).toString(),
            defaultValue: form.city.toString(),
          })}
          clearable
          onValueChange={(e) => e && setForm({ ...form, city: e ,location:""})}

          border="border"
        />

        {form.city !== "" && (
          <>
            <label>Location</label>
            <DropDown
              del={() => setForm({ ...form, location: "" })}
              options={form.city === "bahawalpur" ? bwpSocieties : form.city === "lahore" ? lahoreSocieties : form.city === "karachi" ? karachiSocieties : form.city === "multan" ? multanSocieties : form.city === "islamabad" ? islamabadSocieties : form.city === "rawalpindi" ? rawalpindiSocieties : form.city === "faisalabad" ? faisalabadSocieties : form.city === "peshawar" ? peshawarSocieties : form.city === "quetta" ? quettaSocieties : [{ value: "selectcity", label: "Select City" }]}
              placeholder="Select Location"
              {...(form.location !== "" && {
                defaultLabel:
                  form.location.charAt(0).toUpperCase() + form.location.slice(1).toString(),
                defaultValue: form.location.toString(),
              })}
              clearable
              onValueChange={(e) => e && setForm({ ...form, location: e })}
              border="border"
            />
          </>
        )}
        <label>Area</label>
        <div className="flex border bg-white mx-w-sm rounded-xl justify-between">
          <input
            type="number"
            placeholder="Size"
            onChange={(e) =>
              setForm({
                ...form,
                area: { ...form.area, size: parseInt(e.target.value) },
              })
            }
            value={form.area.size}
            className="w-[50%] flex-1 rounded-xl p-3 outline-none"
          />
          <div className="w-32">
            <DropDown
              options={areaMeasures}
              placeholder="Unit"
              defaultLabel={
                form.area.type.charAt(0).toUpperCase() +
                form.area.type.slice(1).toString()
              }
              defaultValue={form.area.type.toString()}
              onValueChange={(e) =>
                e && setForm({ ...form, area: { ...form.area, type: e } })
              }
            />
          </div>
        </div>
        <label>Price</label>
        <div className="flex mx-w-sm rounded-xl justify-between border bg-white">
          <input
            type="number"
            className="w-[50%] flex-1 rounded-xl p-3 outline-none bg-transparent"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseInt(e.target.value) })
            }
            placeholder="Price"
          />
          <label className="mr-3 p-3 text-sm">PKR</label>
        </div>
        {form.propertyType !== "plot" && (
          <>
            {form.propertyType !== "commercial" && (
              <>
                <label>Bedrooms</label>
                <div className="flex gap-5 flex-wrap">
                  <RenderButtons
                    buttonConfig={bedroomOpts}
                    formProperty="bedrooms"
                    activeClass={styles.activeButton}
                    inactiveClass={styles.inactiveButton}
                    form={form}
                    setForm={setForm}
                  />
                </div>
              </>
            )}

            <label>Bathrooms</label>
            <div className="flex gap-5 flex-wrap">
              <RenderButtons
                buttonConfig={bathroomOpts}
                formProperty="bathrooms"
                activeClass={styles.activeButton}
                inactiveClass={styles.inactiveButton}
                form={form}
                setForm={setForm}
              />
            </div>
          </>
        )}

        <label>Feature and Amenities</label>
        <button className={styles.inactiveButton} onClick={activeAlert}>
          Add Amenities
        </button>
        <div>
          <TagList tag={form.features} handleRemoveTag={rmTags} />
        </div>
        <label>Title</label>
        <div className="flex border mx-w-sm rounded-xl justify-between bg-white">
          <input
            type="text"
            className="w-[50%] flex-1 rounded-xl p-3 outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
        </div>
        <label>Description</label>
        <div className="border flex mx-w-sm rounded-xl justify-between bg-white">
          <textarea
            rows={5}
            className="w-[50%] flex-1 rounded-xl p-3 outline-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
        </div>
        <label>Upload Images</label>
        <label className={styles.inactiveButton}>
          <FiUploadCloud />
          <span className="mt-2 text-base leading-normal">Upload Images</span>
          <input
            type="file"
            className="hidden"
            onChange={handleImages}
            accept="image/jpeg,image/png"
            multiple
          />
        </label>

        {form.images.length > 0 && (
          <div className="flex gap-5 flex-wrap">
            {form.images.map((image, index) => {
              if (image) {
                return (
                  <div className="relative" key={index}>
                    <RxCross2
                      onClick={() => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          coverImage:
                            form.coverImage === index ? 0 : form.coverImage,
                          images: prevForm.images.filter(
                            (_, imgIndex) => imgIndex !== index
                          ),
                        }));
                      }}
                      className="bg-white/80 rounded-full p-0.5 border text-lg font-semibold cursor-pointer absolute top-1 right-1"
                    />
                    {form.coverImage === index && (
                      <span className="bg-white/80 rounded p-1 absolute top-1 left-1 text-xs">
                        Cover Image
                      </span>
                    )}
                    {typeof image === "string" && (
                      <Image
                        key={index}
                        src={image}
                        width={142}
                        height={100}
                        alt="property"
                        className="h-[100px] w-[142px] rounded-xl object-cover"
                      />
                    )}
                    {typeof image === "object" && "url" in image && (
                      <Image
                        key={index}
                        src={(image as IListingImage).url}
                        width={142}
                        height={100}
                        alt="property"
                        className="h-[100px] w-[142px] rounded-xl object-cover"
                      />
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {form.images.length > 0 && (
          <div className="flex justify-between text-sm">
            {form.images.length > 1 && (
              <button className="font-medium" onClick={activeCover}>
                Change Cover
              </button>
            )}
            {form.images.length > 0 && `Total Images: ${form.images.length}`}
          </div>
        )}

        <label>Mobile</label>

        <PhoneInput
          defaultCountry="pk"
          value={form.contact.toString()}
          onChange={(num) => setForm({ ...form, contact: parseInt(num) })}
          inputStyle={{ border: "none", fontSize: "1rem" }}
          countrySelectorStyleProps={{ buttonStyle: { border: "none" } }}
          dialCodePreviewStyleProps={{ style: { borderRadius: "1rem" } }}
          className=" flex mx-w-sm rounded-xl border items-center bg-white p-2"
        />
        <label>Whatsapp</label>

        <PhoneInput
          defaultCountry="pk"
          value={form.whatsapp.toString()}
          onChange={(wap) => setForm({ ...form, whatsapp: parseInt(wap) })}
          inputStyle={{ border: "none", fontSize: "1rem" }}
          countrySelectorStyleProps={{ buttonStyle: { border: "none" } }}
          dialCodePreviewStyleProps={{ style: { borderRadius: "1rem" } }}
          className=" flex mx-w-sm rounded-xl border items-center bg-white p-2"
        />
        <label>Name</label>
        <div className="flex mx-w-sm rounded-xl justify-between bg-white border">
          <input
            type="text"
            className="w-[50%] flex-1 rounded-xl p-3 outline-none"
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <button onClick={handleSubmit} className={styles.PurpleButton}>
          {editMode ? "Update" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default Property;
