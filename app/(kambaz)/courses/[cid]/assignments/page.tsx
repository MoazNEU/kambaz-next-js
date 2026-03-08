"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const courseAssignments = assignments.filter(
    (assignment: { course: string }) => assignment.course === cid
  );

  // State for delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<{
    _id: string;
    title: string;
  } | null>(null);

  const handleDeleteClick = (assignment: { _id: string; title: string }) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      {/* Delete Confirmation Dialog */}
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment{" "}
          <strong>{assignmentToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
        <div>
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-2" />
            Group
          </Button>
          <Link href={`/courses/${cid}/assignments/new`}>
            <Button variant="danger" size="lg" id="wd-add-assignment">
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </Link>
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
              <span className="wd-assignment-percentage me-3">
                40% of Total
              </span>
              <FaPlus className="fs-4 me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {courseAssignments.map(
              (assignment: {
                _id: string;
                title: string;
                until?: string;
                due?: string;
                points?: number;
              }) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-item p-3 ps-1 d-flex align-items-start"
                >
                  <BsGripVertical className="me-2 fs-3 mt-1" />
                  <FaFileAlt className="me-2 mt-1 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="text-decoration-none"
                    >
                      <strong className="text-dark">{assignment.title}</strong>
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-1">|</span>
                      <span>
                        <strong>Not available until</strong>{" "}
                        {assignment.until
                          ? new Date(assignment.until).toLocaleString()
                          : "N/A"}
                      </span>
                      <span className="mx-1">|</span>
                      <span>
                        <strong>Due</strong>{" "}
                        {assignment.due
                          ? new Date(assignment.due).toLocaleString()
                          : "N/A"}
                      </span>
                      <span className="mx-1">|</span>
                      <span>{assignment.points} pts</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheckCircle className="text-success me-2" />
                    <FaTrash
                      className="text-danger me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleDeleteClick({
                          _id: assignment._id,
                          title: assignment.title,
                        })
                      }
                    />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </ListGroupItem>
              )
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
