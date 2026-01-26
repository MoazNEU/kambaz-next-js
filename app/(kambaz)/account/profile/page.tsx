import Link from "next/link";
import { FormControl, Container, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div 
      id="wd-profile-screen">
      
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Profile</h3>
        
        <FormControl 
          className="wd-username mb-2"
          defaultValue="alice"
          placeholder="username"
          size="lg"
        />
        
        <FormControl 
          className="wd-password mb-2"
          defaultValue="123"
          placeholder="password" 
          type="password"
          size="lg"
        />
        
        <FormControl 
          id="wd-firstname"
          className="mb-2"
          defaultValue="Alice"
          placeholder="First Name"
          size="lg"
        />
        
        <FormControl 
          id="wd-lastname"
          className="mb-2"
          defaultValue="Wonderland"
          placeholder="Last Name"
          size="lg"
        />
        
        <FormControl 
          id="wd-dob"
          className="mb-2"
          defaultValue="2000-01-01"
          type="date"
          size="lg"
        />
        
        <FormControl 
          id="wd-email"
          className="mb-2"
          defaultValue="alice@wonderland"
          type="email"
          placeholder="Email"
          size="lg"
        />
        
        <FormSelect 
          id="wd-role"
          className="mb-3"
          defaultValue="FACULTY"
          size="lg">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
        
        <Link 
          href="Signin"
          className="btn btn-danger w-100 text-decoration-none"
          style={{ display: "inline-block" }}>
          Sign out
        </Link>
      </div>
    </div>
  );

    // <div id="wd-profile-screen">
    //   <h3>Profile</h3>
    //   <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
    //   <input defaultValue="123"   placeholder="password" type="password"
    //          className="wd-password" /><br/>
    //   <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
    //   <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
    //   <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
    //   <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
    //   <select defaultValue="FACULTY" id="wd-role">
    //     <option value="USER">User</option>       <option value="ADMIN">Admin</option>
    //     <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
    //   </select><br/>
    //   <Link href="signin" > Sign out </Link>
    // </div>
}
