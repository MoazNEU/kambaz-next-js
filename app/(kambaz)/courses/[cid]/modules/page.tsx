import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    return (
      <div>
        <ModulesControls /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
          </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />Learn what is Web Development <LessonControlButtons /></ListGroupItem>
            </ListGroup>

            </ListGroupItem>
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons /> </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />  LESSON 1 <LessonControlButtons /></ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons /></ListGroupItem>
              </ListGroup>
            </ListGroupItem>
            </ListGroup>
          </div>
  )
};

    //   <div>
    //     <button>Collapse All</button> <button>View Progress</button>
    //     <ul id="wd-modules">
    //       <li className="wd-module">
    //         <div className="wd-title">Week 1</div>
    //         <ul className="wd-lessons">
    //           <li className="wd-lesson">
    //             <span className="wd-title">LEARNING OBJECTIVES</span>
    //             <ul className="wd-content">
    //               <li className="wd-content-item">Introduction to the course</li>
    //               <li className="wd-content-item">Learn what is Web Development</li>
    //             </ul>
    //           </li>
    //         </ul>
    //         <ul className="wd-lessons">
    //           <li className="wd-lesson">
    //             <span className="wd-title">READING</span>
    //             <ul className="wd-content">
    //               <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
    //               <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
    //             </ul>
    //           </li>
    //         </ul>
    //         <ul className="wd-lessons">
    //           <li className="wd-lesson">
    //             <span className="wd-title">SLIDES</span>
    //             <ul className="wd-content">
    //               <li className="wd-content-item">Introduction to Web Development</li>
    //               <li className="wd-content-item">Creating an HTTP server with Node.js</li>
    //               <li className="wd-content-item">Creating a React Application</li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </li>
    //       <li className="wd-module">
    //         <div className="wd-title">Week 2</div>
    //       </li>
    //       <li className="wd-module">
    //         <div className="wd-title">Week 3</div>
    //       </li>
    //   </ul>
    // </div>
