// import React from "react";
// import Hamburger from "./Hamburger";
// import { styles } from "../Styles/style";

// import LoggedInIcon from "./Signup-login/LoggedInIcon";
// import { useSelector } from "react-redux";

// type Props = {
//   activeAlert?: () => void;
//   handleLogout: () => void;
// };

// const NavBar = ({ activeAlert,handleLogout}: Props) => {
//   const [isMobile, setIsMobile] = React.useState(false);

//   const { user } = useSelector((state: any) => state.auth);

//   if (typeof window !== "undefined") {
//     window.addEventListener("resize", () => {
//       if (window.innerWidth < 768) {
//         setIsMobile(true);
//       } else {
//         setIsMobile(false);
//       }
//     });
//   }
//   return (
//     <div>
//       <div className="flex items-center px-[3vw] pt-5 justify-between">
//         <h1 className={styles.heading}>
//           emarkrealty
//         </h1>
//         {isMobile ? (
//           <Hamburger></Hamburger>
//         ) : (
//           <div className="flex gap-8 items-center">
//             <ul
//               className=""
//             >
//               <li>For Buyers</li>
//               <li>For Tenants</li>
//               <li>For Owners</li>
//               <li>For Agents</li>
//             </ul>
//             <div className="flex gap-5 items-center mr-[2vw]">
//               <button
//                 className={styles.PostButton}>
//                 Post property
//                 <span
//                   className={styles.FreeBtn}
//                 >
//                   FREE
//                 </span>
//               </button>
//               <i
//                 className="ri-customer-service-2-fill text-white text-[1.5vw] flex"
//               ></i>
//               {user ? (
//                 <LoggedInIcon user={user} logout={handleLogout}/>
//               ) : (
//                 <i
//                   className="ri-account-circle-fill text-white text-[1.5vw] flex"
//                   onClick={activeAlert}
//                 ></i>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
