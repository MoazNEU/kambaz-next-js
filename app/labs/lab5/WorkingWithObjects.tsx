"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from "@/app/(kambaz)/httpServer";

const initialAssignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};

const initialModule = {
  id: "mod-5610",
  name: "Web Development",
  description: "HTTP, REST, and full stack patterns.",
  course: "CS5610",
};

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState(initialAssignment);
  const [moduleRecord, setModuleRecord] = useState(initialModule);

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        value={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Assignment — score &amp; completed</h4>
      <div className="mb-2">
        <FormControl type="number" id="wd-assignment-score" className="w-25 d-inline-block me-2"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) || 0 })}/>
        <a id="wd-update-assignment-score" className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update Score
        </a>
      </div>
      <div className="mb-2">
        <label className="me-2">
          <input id="wd-assignment-completed" type="checkbox" className="me-1"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })}/>
          Completed
        </label>
        <a id="wd-update-assignment-completed" className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update Completed
        </a>
      </div>
      <hr />

      <h4>Module</h4>
      <a id="wd-get-module" className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <a id="wd-get-module-name" className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <hr />
      <a id="wd-update-module-name" className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(moduleRecord.name)}`}>
        Update Module Name
      </a>
      <FormControl className="w-75 mb-3" id="wd-module-name"
        value={moduleRecord.name}
        onChange={(e) =>
          setModuleRecord({ ...moduleRecord, name: e.target.value })}/>
      <a id="wd-update-module-description" className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(moduleRecord.description)}`}>
        Update Module Description
      </a>
      <FormControl as="textarea" rows={3} className="w-75 mb-2" id="wd-module-description"
        value={moduleRecord.description}
        onChange={(e) =>
          setModuleRecord({ ...moduleRecord, description: e.target.value })}/>
      <hr />
    </div>
  );
}
