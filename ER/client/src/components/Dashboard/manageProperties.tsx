import React, { FC, useState, useEffect } from "react";
import { IUser } from "../../types/types";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteListingUserMutation } from "../../redux/features/listing/listingApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { toast } from "react-hot-toast";
import { IoLocationOutline } from "react-icons/io5";
import FormatPrice from "../ui/pricing";
import DateFormat from "../ui/formatTime";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";

type Props = {
  user: IUser;
  setRoute: (value: string) => void;
  handleEditListing: (value: string) => void;
};

const ManageProperties: FC<Props> = ({ user, setRoute, handleEditListing }) => {
  const [deleteListingUser, { isLoading, isSuccess, error }] =
    useDeleteListingUserMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, { skip: !loadUser });
  const [actionOpen, setActionOpen] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteListingUser(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Listing Deleted Successfully");
      setLoadUser(true);
    }
    if (error) {
      toast.error("Failed to delete listing");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (loadUser) {
      refetch();
      setLoadUser(false);
    }
  }, [loadUser, isLoading, refetch]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (actionOpen && !event.target.closest(".dropdown")) {
        setActionOpen(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [actionOpen]);

  return (
    <>
      <table className="text-left w-full capitalize text-xs ">
        <thead className="bg-black text-white font-normal">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Date</th>
            <th className="p-4">Views</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody className="bg-grey-light">
          {user.listings.map((property, index) => {
            return (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div className="md:flex gap-2">
                    {property.images.length > 0 ? (
                      <Image
                        src={property.images[property.coverImage].url as string}
                        alt="cover"
                        height={100}
                        width={100}
                        className="rounded-xl object-cover w-16 h-16 lg:w-20 lg:h-20"
                      />
                    ) : (
                      <IoLocationOutline className="text-3xl" />
                    )}

                    <div>
                      <p className="text-sm font-medium">{property.title}</p>
                      &nbsp;
                      <p className="text-zinc-400 capitalize text-xs">
                        {property.city}
                      </p>
                      &nbsp;
                      <p className="text-xs font-semibold">
                        Rs. <FormatPrice price={property.price} />
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <DateFormat dateString={property.createdAt} />
                </td>
                <td className="p-4">{property.analytics.views}</td>
                <td className="p-4">
                  {property._id === "active" ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>
                <td className="p-4 relative text-xl text-zinc-400 ">
                  <HiOutlineDotsVertical
                    onClick={() =>
                      setActionOpen(
                        property._id === actionOpen ? null : property._id
                      )
                    }
                    className="hover:text-black cursor-pointer"
                  />
                  {actionOpen === property._id && (
                    <ul className="dropdown z-30 top-20 right-20 bg-white absolute py-2 rounded-md text-base leading-7 shadow-xl  border">
                      <li className="px-6 py-1 flex gap-2 items-center hover:text-black cursor-pointer">
                        <IoEyeOutline />
                        View
                      </li>
                      <li
                        className="px-6 py-1 flex gap-2 items-center hover:text-black cursor-pointer"
                        onClick={() => {
                          setRoute("edit-listing");
                          handleEditListing(property._id);
                        }}
                      >
                        <CiEdit />
                        Edit
                      </li>
                      <li
                        className="px-6 py-1 flex gap-2 items-center hover:text-black cursor-pointer"
                        onClick={() => handleDelete(property._id)}
                      >
                        <AiOutlineDelete />
                        Delete
                      </li>
                    </ul>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ManageProperties;
