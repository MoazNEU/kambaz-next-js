"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect("/account/signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/account/signin");
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl id="wd-username" className="mb-2"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl id="wd-password" className="mb-2"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl id="wd-firstname" className="mb-2"
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <FormControl id="wd-lastname" className="mb-2"
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <FormControl id="wd-dob" className="mb-2" type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <FormControl id="wd-email" className="mb-2"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select className="form-control mb-2" id="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { redirect } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentUser } from "../reducer";
// import { RootState } from "../../store";
// //import Link from "next/link";
// import { Button, FormControl } from "react-bootstrap";
// export default function Profile() {
//   const [profile, setProfile] = useState<any>({});
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const fetchProfile = () => {
//     if (!currentUser) return redirect("/account/signin");
//     setProfile(currentUser);
//   };
//   const signout = () => {
//     dispatch(setCurrentUser(null));
//     redirect("/account/signin");
//   };
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div
//       id="wd-profile-screen">

//       <div style={{ width: "350px" }}>
//         <h3 className="mb-4">Profile</h3>
//         {profile && (
//           <div>
//             <FormControl id="wd-username" className="mb-2"
//               defaultValue={profile.username}
//               onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
//             <FormControl id="wd-password" className="mb-2"
//               defaultValue={profile.password}
//               onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
//             <FormControl id="wd-firstname" className="mb-2"
//               defaultValue={profile.firstName}
//               onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
//             <FormControl id="wd-lastname" className="mb-2"
//               defaultValue={profile.lastName}
//               onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
//             <FormControl id="wd-dob" className="mb-2" type="date"
//               defaultValue={profile.dob}
//               onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
//             <FormControl id="wd-email" className="mb-2"
//               defaultValue={profile.email}
//               onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
//             <select className="form-control mb-2" id="wd-role"
//               onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
//               <option value="USER">User</option>
//               <option value="ADMIN">Admin</option>
//               <option value="FACULTY">Faculty</option>{" "}
//               <option value="STUDENT">Student</option>
//             </select>
//             <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
//               Sign out
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// {/* {profile && (
//        <div>
//         <FormControl
//           className="wd-username mb-2"
//           defaultValue="alice"
//           placeholder="username"
//           size="lg"
//         />

//         <FormControl
//           className="wd-password mb-2"
//           defaultValue="123"
//           placeholder="password"
//           type="password"
//           size="lg"
//         />

//         <FormControl
//           id="wd-firstname"
//           className="mb-2"
//           defaultValue="Alice"
//           placeholder="First Name"
//           size="lg"
//         />

//         <FormControl
//           id="wd-lastname"
//           className="mb-2"
//           defaultValue="Wonderland"
//           placeholder="Last Name"
//           size="lg"
//         />

//         <FormControl
//           id="wd-dob"
//           className="mb-2"
//           defaultValue="2000-01-01"
//           type="date"
//           size="lg"
//         />

//         <FormControl
//           id="wd-email"
//           className="mb-2"
//           defaultValue="alice@wonderland"
//           type="email"
//           placeholder="Email"
//           size="lg"
//         />

//         <FormSelect
//           id="wd-role"
//           className="mb-3"
//           defaultValue="FACULTY"
//           size="lg">
//           <option value="USER">User</option>
//           <option value="ADMIN">Admin</option>
//           <option value="FACULTY">Faculty</option>
//           <option value="STUDENT">Student</option>
//         </FormSelect>

//         <Link
//           href="Signin"
//           className="btn btn-danger w-100 text-decoration-none"
//           style={{ display: "inline-block" }}>
//           Sign out
//         </Link>
//         </div>)}
//       </div>
//     </div>
//   ); 

//  // <div id="wd-profile-screen">
//   //   <h3>Profile</h3>
//   //   <input defaultValue="alice" placeholder="username" className="wd-username" /><br />
//   //   <input defaultValue="123" placeholder="password" type="password"
//   //          className="wd-password" /><br />
//   //   <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br />
//   //   <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br />
//   //   <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br />
//   //   <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br />
//   //   <select defaultValue="FACULTY" id="wd-role">
//   //     <option value="USER">User</option>       <option value="ADMIN">Admin</option>
//   //     <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
//   //   </select><br />
//   //   <Link href="signin" > Sign out </Link>
//   // </div> */}
