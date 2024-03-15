import React, { FC, useRef, useState, useEffect } from "react";
import { styles } from "@/Styles/style";
import Email from "./Email";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authAPI";
import { toast } from "react-hot-toast";
import Image from "next/image";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth) || {};
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [signIn, setSignIn] = useState<boolean>(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error, setRoute]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const handleSignIn = () => {
    setSignIn(true);
  };

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  if (signIn) {
    return <Email />;
  } else {
    return (
      <div className="w-[23vw] flex flex-col items-center gap-5">
        <h1 className={`${styles.popupHeading}`}>Verification</h1>
        <Image src="/er.svg" alt="" width={80} height={80}/>
        <div className="m-auto flex items-center justify-around gap-3">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              ref={inputRefs[index]}
              className={`w-[65px] h-[65px] bg-transparent border-2 rounded-[10px] flex items-center text-black text-[18px] font-bold outline-none text-center  ${
                invalidError ? "shake border-red-500" : ""
              }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="w-full justify-center">
          <button
            className={`${styles.popupbtn}`}
            onClick={verificationHandler}
          >
            Verify OTP
          </button>
        </div>
        <h5 className="text-[.9vw]">
          Go Back to Sign in?
          <button
            className="font-bold text-[#2e5da8] ml-3"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </h5>
      </div>
    );
  }
};

export default Verification;
