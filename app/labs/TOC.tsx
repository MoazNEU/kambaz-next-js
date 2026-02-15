"use client"
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/labs" as={Link} className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>
          Labs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab1" as={Link} className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>
          Lab 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab2" as={Link} className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>
          Lab 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab3" as={Link} className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>
          Lab 3</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>Kambaz</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/MoazNEU">My GitHub</NavLink>
      </NavItem>
    </Nav>
  );
}
// import Link from "next/link";
// export default function TOC() {
//  return (
//    <ul>
//      <li>
//        <Link href="/labs" id="wd-lab1-link">
//          Home </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab1" id="wd-lab1-link">
//          Lab 1 </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab2" id="wd-lab2-link">
//          Lab 2 </Link>
//      </li>
//      <li>
//        <Link href="/labs/lab3" id="wd-lab3-link">
//          Lab 3 </Link>
//      </li>
//      <li>
//        <Link href="/" id="wd-lab3-link">
//          Kambaz </Link> 
//      </li>
//    </ul>
// );}

