"use client"
import UserAuth from "./userAuth";
import React from "react";
import { redirect } from "next/navigation";
import Login from "../components/Signup-login/Main"

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
 const [activeAlert,setActiveAlert] = React.useState(true);
 const handleAlert =()=>{
  setActiveAlert(!activeAlert)
 }
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : (redirect("/") && activeAlert && <Login closeAlert={handleAlert}/>);
}
