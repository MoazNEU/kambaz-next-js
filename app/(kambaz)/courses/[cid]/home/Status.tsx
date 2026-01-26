// export default function CourseStatus() {
//     return (
//       <div id="wd-course-status">
//         <h2>Course Status</h2>
//         <button>Unpublish</button> <button>Publish</button>
//         <button>Import Existing Content</button>
//         <button>Import from Commons</button>
//         <button>Choose Home Page</button>
//         <button>View Course Stream</button>
//         <button>New Announcement</button>
//         <button>New Analytics</button>
//         <button>View Course Notifications</button>
//       </div> );}

import { MdAnnouncement, MdDoNotDisturbAlt, MdNotificationsNone } from "react-icons/md";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
{/* Find more icons */}
export default function CourseStatus() {
 return (
   <div id="wd-course-status" style={{ width: "350px" }}>
     <h2>Course Status</h2>
     <div className="d-flex">
       <div className="w-50 pe-1">
         <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
           <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </Button> </div>
       <div className="w-50">
         <Button variant="success" size="lg" className="w-100">
           <FaCheckCircle className="me-2 fs-5" /> Publish </Button> </div>
     </div>
     <br />
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BiImport className="me-2 fs-5" /> Import Existing Content </Button>
     <div className="mb-1">
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>
     </div>
     {/* Complete the rest of the buttons */}
     <div className="mb-1">
        <Button
          variant="secondary"
          size="lg"
          className="w-100 text-start"
        >
          <FaHome className="me-2 fs-5" />
          Choose Home Page
        </Button>
      </div>

      <div className="mb-1">
        <Button
          variant="secondary"
          size="lg"
          className="w-100 text-start"
        >
          <IoNewspaperOutline className="me-2 fs-5" />
          View Course Stream
        </Button>
      </div>

      <div className="mb-1">
        <Button
          variant="warning"
          size="lg"
          className="w-100 text-start"
        >
          <MdAnnouncement className="me-2 fs-5" />
          New Announcement
        </Button>
      </div>

      <div className="mb-1">
        <Button
          variant="info"
          size="lg"
          className="w-100 text-start"
        >
          <BsGraphUp className="me-2 fs-5" />
          New Analytics
        </Button>
      </div>

      <div className="mb-1">
        <Button
          variant="secondary"
          size="lg"
          className="w-100 text-start"
        >
          <MdNotificationsNone className="me-2 fs-5" />
          View Course Notifications
        </Button>
      </div>
   </div> );}