// "use client";
// import React, { FC } from "react";
// import { styles } from "../../Styles/style";
// import { TbHomeDollar } from "react-icons/tb";
// import { TbHome } from "react-icons/tb";
// import { GiHouseKeys } from "react-icons/gi";
// import { MdOutlineAccountCircle } from "react-icons/md";
// import { CiLogout } from "react-icons/ci";
// import { IUser } from "@/types/types";
// type Props = {
//   closeAlert: () => void;
//   user: IUser;
//   activeAlert: () => void;
//   handleLogout: () => void;
// };

// const MobileMenu: FC<Props> = ({
//   closeAlert,
//   user,
//   activeAlert,
//   handleLogout,
// }) => {
//   const handleOut = () => {
// handleLogout;
// console.log("working")
//   }
//   return (
//     <>
//       <div
//         className="fixed z-50 top-0 left-0 w-full h-full bg-black/30 overflow-hidden"
//         onClick={() => setShowMenu(!showMenu)}
//       >
//         <div className="h-full max-w-[50%] px-4 py-6 bg-white bg-opacity-70 backdrop-blur-lg drop-shadow-lg flex-col flex gap-4">
//           <h1 className={`${styles.heading}text-[#711DB0]`}>EmarkRealty</h1>
//           {!user && (
//             <button
//               className=" bg-white/80 backdrop-blur-md flex items-center justify-center  gap-2 w-full py-2 rounded-xl text-sm "
//               onClick={activeAlert}
//             >
//               LOGIN
//             </button>
//           )}
//           <ul className="border-t flex flex-col gap-6 py-4">
//             <li className="flex gap-2 items-center cursor-pointer">
//               <TbHome /> <p className="text-xs">For Buyers</p>{" "}
//             </li>
//             <li className="flex gap-2 items-center cursor-pointer">
//               <GiHouseKeys />
//               <p className="text-xs">For Tenants</p>
//             </li>
//             <li className="flex gap-2 items-center cursor-pointer">
//               <TbHomeDollar />
//               <p className="text-xs">For Owners</p>
//             </li>
//             {user ? (
//               <>
//                 <li className="flex gap-2 items-center cursor-pointer">
//                   <MdOutlineAccountCircle />
//                   <p className="text-xs cursor-pointer">My Account</p>
//                 </li>
//                 <li className="flex gap-2 items-center cursor-pointer">
//                   <CiLogout />
//                   <p className="text-xs cursor-pointer" onClick={handleOut}>
//                     Logout
//                   </p>
//                 </li>
//               </>
//             ) : null}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MobileMenu;
