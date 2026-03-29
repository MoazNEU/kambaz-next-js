"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();
 return (
   <Nav variant="pills">
     {links.map((link) => (
       <NavItem key={link}>
         <NavLink
           as={Link}
           href={`/account/${link}`}
           active={pathname.endsWith(link)}
         >
           {link} </NavLink> </NavItem>
     ))}
   </Nav>
);}

//   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
//     <Link href="signin" id="wd-course-home-link"
//       className="list-group-item active border-0"> Signin </Link>

//     <Link href="signup" id="wd-course-modules-link"
//       className="list-group-item text-danger border-0"> Signup </Link>

//     <Link href="profile" id="wd-course-piazza-link"
//       className="list-group-item text-danger border-0"> Profile </Link>
      
//   </div>
//   //  <div id="wd-account-navigation">
//   //    <Link href="signin"> Signin </Link> <br />
//   //    <Link href="signup"> Signup </Link> <br />
//   //    <Link href="profile"> Profile </Link> <br />
//   //  </div>
// );}
