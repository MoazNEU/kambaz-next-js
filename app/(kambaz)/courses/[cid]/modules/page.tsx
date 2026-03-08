/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
export default function Modules() {
  const { cid } = useParams();
  //const modules = db.modules;
  //const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  // const addModule = () => {
  //   setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
  //   setModuleName("");
  // };
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  // const editModule = (moduleId: string) => {
  //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };



  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
        dispatch(addModule({ name: moduleName, course: cid }));
        setModuleName("");
      }} /><br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {
          modules.filter((module: any) => module.course === cid)
            .map((module: any) => (
              <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" /> {!module.editing && module.name}
                  {module.editing && (
                    <FormControl className="w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name} />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                        <LessonControlButtons />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </ListGroupItem>
            ))}
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
