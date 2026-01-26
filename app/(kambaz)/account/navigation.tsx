import Link from "next/link";
export default function AccountNavigation() {
 return (
  <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
    <Link href="signin" id="wd-course-home-link"
      className="list-group-item active border-0"> Signin </Link>

    <Link href="signup" id="wd-course-modules-link"
      className="list-group-item text-danger border-0"> Signup </Link>

    <Link href="profile" id="wd-course-piazza-link"
      className="list-group-item text-danger border-0"> Profile </Link>
      
  </div>
  //  <div id="wd-account-navigation">
  //    <Link href="signin"> Signin </Link> <br />
  //    <Link href="signup"> Signup </Link> <br />
  //    <Link href="profile"> Profile </Link> <br />
  //  </div>
);}
