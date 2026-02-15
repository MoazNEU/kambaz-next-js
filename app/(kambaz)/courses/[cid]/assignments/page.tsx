"use client"
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import * as db from "../../../database";
import { useParams } from "next/navigation";


export default function Assignments() {
  const cid = useParams().cid;
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
        <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>
      
      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-assignment-group p-0 mb-0 fs-5 border-gray">
          <div className="wd-assignment-header p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoChevronDown className="me-2" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="wd-assignment-percentage me-3">40% of Total</span>
              <FaPlus className="fs-4 me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          
          <ListGroup className="rounded-0">
            {assignments.
            filter((assignment) => assignment.course === cid)
            .map((assignment) => (
              <ListGroupItem key={assignment._id} className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-1" />
                <FaFileAlt className="me-2 mt-1 text-success" />
                <div className="flex-grow-1"> 
                  <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="text-decoration-none">
                    <strong className="text-dark">{assignment.title}</strong>
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-1">|</span>
                    <span><strong>Not available until</strong> {assignment.until?.toLocaleString()}</span>
                    <span className="mx-1">|</span>
                    <span><strong>Due</strong> {assignment.due?.toLocaleString()}</span>
                    <span className="mx-1">|</span>
                    <span>{assignment.points} pts</span>
                    
                  </div>
                  
                </div>
                 <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
              </ListGroupItem>
            ))
        }
      </ListGroup>
      </ListGroupItem>
      </ListGroup>
      
    </div>
  );
}

// import Link from "next/link";
// import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa6";
// import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
// import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
// // export default function Assignments() {
// //     return (
// //       <div id="wd-assignments">
// //         <input placeholder="Search for Assignments"
// //                id="wd-search-assignment" />
// //         <button id="wd-add-assignment-group">+ Group</button>
// //         <button id="wd-add-assignment">+ Assignment</button>
// //         <h3 id="wd-assignments-title">
// //           ASSIGNMENTS 40% of Total <button>+</button> </h3>
// //         <ul id="wd-assignment-list">
// //           <li className="wd-assignment-list-item">
// //             <Link href="/courses/1234/assignments/123"
// //                className="wd-assignment-link" >
// //               A1 - ENV + HTML
// //             </Link> 
// //           </li>
// //           <li className="wd-assignment-list-item">
// //             <Link href="/courses/1234/assignments/123" 
// //                className="wd-assignment-link">
// //               A2 - CSS + BOOTSTRAP
// //             </Link>
// //           </li>
// //           <li className="wd-assignment-list-item">
// //             <Link href="/courses/1234/assignments/123"
// //                className="wd-assignment-link">
// //               A3 - JAVASCRIPT + REACT
// //             </Link> 
// //           </li>
// //         </ul>
// //       </div>
// //   );}


// export default function Assignments() {
//   return (
//     <div id="wd-assignments">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Form.Control
//           type="text"
//           placeholder="Search for Assignments"
//           id="wd-search-assignment"
//           className="me-2"
//           style={{ maxWidth: "300px" }}
//         />
//         <div>
//           <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
//             <FaPlus className="me-2" />
//             Group
//           </Button>
//           <Button variant="danger" size="lg" id="wd-add-assignment">
//             <FaPlus className="me-2" />
//             Assignment
//           </Button>
//         </div>
//       </div>
      
//       <ListGroup className="rounded-0">
//         <ListGroupItem className="wd-assignment-group p-0 mb-0 fs-5 border-gray">
//           <div className="wd-assignment-header p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
//             <div className="d-flex align-items-center">
//               <BsGripVertical className="me-2 fs-3" />
//               <IoChevronDown className="me-2" />
//               <span className="fw-bold">ASSIGNMENTS</span>
//             </div>
//             <div className="d-flex align-items-center">
//               <span className="wd-assignment-percentage me-3">40% of Total</span>
//               <FaPlus className="fs-4 me-2" />
//               <IoEllipsisVertical className="fs-4" />
//             </div>
//           </div>
          
//           <ListGroup className="rounded-0">
//             <ListGroupItem className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
//               <BsGripVertical className="me-2 fs-3 mt-1" />
//               <FaFileAlt className="me-2 mt-1 text-success" />
//               <div className="flex-grow-1">
//                 <Link href="/courses/1234/assignments/1234" className="text-decoration-none">
//                   <strong className="text-dark">A1 - ENV + HTML</strong>
//                 </Link>
//                 <div className="text-muted small mt-1">
//                   <span className="text-danger">Multiple Modules</span>
//                   <span className="mx-1">|</span>
//                   <span><strong>Not available until</strong> May 6 at 12:00am</span>
//                   <span className="mx-1">|</span>
//                   <br />
//                   <span><strong>Due</strong> May 13 at 11:59pm</span>
//                   <span className="mx-1">|</span>
//                   <span>100 pts</span>
//                 </div>
//               </div>
//               <div className="d-flex align-items-center">
//                 <FaCheckCircle className="text-success me-2" />
//                 <IoEllipsisVertical className="fs-4" />
//               </div>
//             </ListGroupItem>
            
//             <ListGroupItem className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
//               <BsGripVertical className="me-2 fs-3 mt-1" />
//               <FaFileAlt className="me-2 mt-1 text-success" />
//               <div className="flex-grow-1">
//                 <Link href="/courses/1234/assignments/124" className="text-decoration-none">
//                   <strong className="text-dark">A2 - CSS + BOOTSTRAP</strong>
//                 </Link>
//                 <div className="text-muted small mt-1">
//                   <span className="text-danger">Multiple Modules</span>
//                   <span className="mx-1">|</span>
//                   <span><strong>Not available until</strong> May 13 at 12:00am</span>
//                   <span className="mx-1">|</span>
//                   <br />
//                   <span><strong>Due</strong> May 20 at 11:59pm</span>
//                   <span className="mx-1">|</span>
//                   <span>100 pts</span>
//                 </div>
//               </div>
//               <div className="d-flex align-items-center">
//                 <FaCheckCircle className="text-success me-2" />
//                 <IoEllipsisVertical className="fs-4" />
//               </div>
//             </ListGroupItem>
            
//             <ListGroupItem className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
//               <BsGripVertical className="me-2 fs-3 mt-1" />
//               <FaFileAlt className="me-2 mt-1 text-success" />
//               <div className="flex-grow-1">
//                 <Link href="/courses/1234/assignments/125" className="text-decoration-none">
//                   <strong className="text-dark">A3 - JAVASCRIPT + REACT</strong>
//                 </Link>
//                 <div className="text-muted small mt-1">
//                   <span className="text-danger">Multiple Modules</span>
//                   <span className="mx-1">|</span>
//                   <span><strong>Not available until</strong> May 20 at 12:00am</span>
//                   <span className="mx-1">|</span>
//                   <br />
//                   <span><strong>Due</strong> May 27 at 11:59pm</span>
//                   <span className="mx-1">|</span>
//                   <span>100 pts</span>
//                 </div>
//               </div>
//               <div className="d-flex align-items-center">
//                 <FaCheckCircle className="text-success me-2" />
//                 <IoEllipsisVertical className="fs-4" />
//               </div>
//             </ListGroupItem>
            
//             <ListGroupItem className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
//               <BsGripVertical className="me-2 fs-3 mt-1" />
//               <FaFileAlt className="me-2 mt-1 text-success" />
//               <div className="flex-grow-1">
//                 <Link href="/courses/1234/assignments/126" className="text-decoration-none">
//                   <strong className="text-dark">A4 - CLOUD + DEPLOYMENT</strong>
//                 </Link>
//                 <div className="text-muted small mt-1">
//                   <span className="text-danger">Multiple Modules</span>
//                   <span className="mx-1">|</span>
//                   <span><strong>Not available until</strong> May 27 at 12:00am</span>
//                   <span className="mx-1">|</span>
//                   <br />
//                   <span><strong>Due</strong> Jun 15 at 11:59pm</span>
//                   <span className="mx-1">|</span>
//                   <span>100 pts</span>
//                 </div>
//               </div>
//               <div className="d-flex align-items-center">
//                 <FaCheckCircle className="text-success me-2" />
//                 <IoEllipsisVertical className="fs-4" />
//               </div>
//             </ListGroupItem>
//           </ListGroup>
//         </ListGroupItem>
//       </ListGroup>
//     </div>
//   );
// }
