import Link from "next/link";
import { FormControl, Form, Container  } from "react-bootstrap";

export default function Signup() {
  return (
    // <div id="wd-signup-screen">
    //   <h3>Sign up</h3>
    //   <input placeholder="username" className="wd-username" /><br/>
    //   <input placeholder="password" type="password" className="wd-password" /><br/>
    //   <input placeholder="verify password"
    //          type="password" className="wd-password-verify" /><br/>
    //   <Link  href="profile" > Sign up </Link><br />
    //   <Link  href="signin" > Sign in </Link>
    // </div>
    <div
      id="wd-signup-screen"> 
      <h3>Sign up</h3>
      <FormControl 
        className="wd-username mb-2"
        placeholder="username"
        size="lg"
      />
      
      <FormControl 
        className="wd-password mb-2"
        placeholder="password" 
        type="password"
        size="lg"
      />
      
      <FormControl 
        className="wd-password-verify mb-2"
        placeholder="verify password" 
        type="password"
        size="lg"
      />
      
      <Link 
        href="profile"
        className="btn btn-primary w-100 mb-2 text-decoration-none"
        style={{ display: "inline-block" }}>
        Sign up
      </Link>
      
      <Link 
        href="signin"
        className="text-decoration-underline text-primary ">
        Sign in
      </Link>
      
    </div> 
  );
}
