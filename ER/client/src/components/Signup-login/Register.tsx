import { useFormik } from "formik";
import React, { FC, useState, ReactNode, useEffect } from "react";
import * as yup from "yup";
import "remixicon/fonts/remixicon.css";
import { styles } from "../../Styles/style";
import Input from "../ui/input";
import { useRegisterMutation } from "../../redux/features/auth/authAPI";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  handleBack: () => void;
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

const Register: FC<Props> = ({ setRoute, handleBack }) => {
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { password: "", email: "", name: "", userType: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, userType }) => {
      console.log(password, name, email, userType);
      const data = {
        name,
        email,
        password,
        userType,
      };
      await register(data);
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="w-[23vw] flex flex-col">
      <i
        className="ri-arrow-left-line text-zinc-500 text-[1.5vw] place-self-start"
        onClick={handleBack}
      ></i>
      <h1 className={`${styles.popupHeading}`}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={values.name}
          onChange={handleChange}
        ></Input>
        {errors.name && touched.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        ></Input>
        {errors.email && touched.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        ></Input>
        {errors.password && touched.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
        <p className="font-semibold text-zinc-600 text-[.9vw] my-[1vw]">
          Are you a Real Estate Agent?
        </p>

        <ul className="grid w-full gap-6 md:grid-cols-4">
          <li>
            <input
              type="radio"
              id="yes"
              name="userType"
              value="agent"
              className="hidden peer"
              onChange={handleChange}
            />
            <label
              htmlFor="yes"
              className="inline-flex items-center justify-center w-full p-3  text-gray-500 bg-white border border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500  peer-checked:text-blue-600 peer-checked:bg-[#e7f6ff] peer-checked:border-none hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-[.7vw] font-semibold">Yes</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="no"
              name="userType"
              value="user"
              className="hidden peer"
              onChange={handleChange}
            />
            <label
              htmlFor="no"
              className="inline-flex items-center justify-center w-full p-3  text-gray-500 bg-white border border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500  peer-checked:text-blue-600 peer-checked:bg-[#e7f6ff] peer-checked:border-none hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-[.7vw] font-semibold">No</div>
              </div>
            </label>
          </li>
        </ul>
        {errors.userType && touched.userType && (
          <span className="text-red-500 text-sm">{errors.userType}</span>
        )}
        <input
          type="submit"
          value="Create Account"
          className={`${styles.popupbtn}`}
        />
      </form>
    </div>
  );
};

export default Register;
