import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  useUpdateProfileInfoMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { MdOutlineCameraAlt } from "react-icons/md";
import { styles } from "@/Styles/style";
import { PhoneInput } from "react-international-phone";
type Props = {
  user: any;
  setRoute: (value: string) => void;
};

const Profile: FC<Props> = ({ user, setRoute }) => {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    mobile: user?.profile.mobile || "",
    whatsapp: user?.profile.whatsapp || "",
  });
  const [
    updateProfileAvatar,
    { isSuccess: isSuccessAvatar, error: errorAvatar },
  ] = useUpdateAvatarMutation();
  const [updateProfileInfo, { isSuccess, error, isLoading }] =
    useUpdateProfileInfoMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, { skip: !loadUser });

  useEffect(() => {
    if (loadUser) {
      refetch();
      setLoadUser(false);
    }
  }, [loadUser, isLoading, refetch]);

  const handleImage = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateProfileAvatar({ image: avatar });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccessAvatar || isSuccess) {
      setLoadUser(true);
    }
    if (errorAvatar) {
      toast.error("Failed to update avatar");
    }
    if (isSuccess) {
      toast.success("Profile Updated");
    }
    if (error) {
      toast.error("Failed to update profile");
    }
  }, [isSuccessAvatar, errorAvatar, isSuccess, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const submitHandler = async () => {
    try {
      const shouldUpdateName =
        profile.name !== user.name && profile.name !== "";
      const shouldUpdateMobile =
        profile.mobile !== user.profile.mobile && profile.mobile !== "";
      const shouldUpdateWhatsapp =
        profile.whatsapp !== user.profile.whatsapp && profile.whatsapp !== "";

      if (shouldUpdateName || shouldUpdateMobile || shouldUpdateWhatsapp) {
        await updateProfileInfo({
          name: shouldUpdateName ? profile.name : undefined,
          mobile: shouldUpdateMobile ? profile.mobile : undefined,
          whatsapp: shouldUpdateWhatsapp ? profile.whatsapp : undefined,
        });
        setLoadUser(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 max-w-sm">
        <div className="relative group w-[100px] h-[100px] rounded-full object-cover">
          <Image
            src={user && user.profile.image.url}
            width={100}
            height={100}
            alt={user?.profile?.image?.url ? "profile" : "Default Profile"}
            className="cursor-pointer rounded-full border-[3px] object-cover w-[100px] h-[100px]"
          />
          <input
            type="file"
            name="avatar"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            id="avatar"
            className="hidden"
            onChange={handleImage}
          />
          <label
            htmlFor="avatar"
            className="hidden group-hover:block absolute bottom-0 w-full h-full rounded-full cursor-pointer bg-black/50"
          >
            <div className="flex items-center justify-center h-full w-full text-2xl text-white">
              <MdOutlineCameraAlt />
            </div>
          </label>
        </div>
        <input
          type="text"
          value={profile.name}
          placeholder="Full Name"
          onChange={handleInputChange}
          name="name"
          className="border p-3 rounded-xl outline-none"
        />

        <PhoneInput
          defaultCountry="pk"
          name="mobile"
          placeholder="Mobile no"
          value={profile.mobile}
          onChange={(mob) => setProfile({ ...profile, mobile: mob })}
          inputStyle={{ border: "none", fontSize: "1rem" }}
          countrySelectorStyleProps={{ buttonStyle: { border: "none" } }}
          dialCodePreviewStyleProps={{ style: { borderRadius: "1rem" } }}
          className=" flex mx-w-sm rounded-xl border items-center bg-white p-2"
        />
        <PhoneInput
          defaultCountry="pk"
          name="whatsapp"
          placeholder="Whatsapp"
          value={profile.whatsapp}
          onChange={(mob) =>
            setProfile({ ...profile, whatsapp:mob })
          }
          inputStyle={{ border: "none", fontSize: "1rem" }}
          countrySelectorStyleProps={{ buttonStyle: { border: "none" } }}
          dialCodePreviewStyleProps={{ style: { borderRadius: "1rem" } }}
          className=" flex mx-w-sm rounded-xl border items-center bg-white p-2"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="outline-none border p-3 rounded-xl text-zinc-400 font-semibold cursor-not-allowed"
        />
        <input
          type="text"
          value={user.accountType}
          readOnly
          className="outline-none border p-3 rounded-xl text-zinc-400 font-semibold cursor-not-allowed"
        />
        <button
          className=" self-end flex items-center gap-2 underline underline-offset-4 text-sm"
          onClick={() => setRoute("password")}
        >
          Change Password
        </button>
        <button
          onClick={submitHandler}
          disabled={isLoading}
          className={styles.BlackButton}
        >
          {isLoading ? "...updating" : "Update Profile"}
        </button>
      </div>
    </>
  );
};

export default Profile;
