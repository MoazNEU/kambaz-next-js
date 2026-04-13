/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as coursesClient from "../../client";
import * as usersClient from "../../../users/client";

const emptyNewUser = {
  username: "",
  password: "changeme",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "S101",
  dob: "2000-01-01",
  lastActivity: "",
  totalActivity: "",
};

export default function People() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [editPassword, setEditPassword] = useState("");
  const [newUser, setNewUser] = useState({ ...emptyNewUser });

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const loadUsers = useCallback(async () => {
    if (!cid) return;
    setLoading(true);
    try {
      const data = await coursesClient.findUsersForCourse(cid as string);
      setUsers(data);
    } catch (e) {
      console.error(e);
      setUsers([]);
    }
    setLoading(false);
  }, [cid]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Remove this user from the system?")) return;
    try {
      await usersClient.deleteUser(userId);
      await loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    try {
      const { password: _ignored, ...rest } = editing;
      const payload: Record<string, unknown> = { ...rest, _id: editing._id };
      if (editPassword.trim()) {
        payload.password = editPassword.trim();
      }
      await usersClient.updateUser(payload as { _id: string; [key: string]: unknown });
      setShowEdit(false);
      setEditing(null);
      setEditPassword("");
      await loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async () => {
    if (!cid) return;
    try {
      await usersClient.createUserInCourse(cid as string, newUser);
      setShowAdd(false);
      setNewUser({ ...emptyNewUser });
      await loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-people-table" className="container-fluid">
      {isFaculty && (
        <div className="mb-3">
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            Add user
          </Button>
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
              {isFaculty && <th />}
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                {isFaculty && (
                  <td className="text-nowrap">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => {
                        const { password: _p, ...safe } = user;
                        setEditing(safe);
                        setEditPassword("");
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    {user._id !== currentUser?._id && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add user to course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
              }
              />
            </Col>
            <Col md={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
              }
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
              }
              />
            </Col>
            <Col md={6}>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
              }
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
              }
              />
            </Col>
            <Col md={6}>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
              }
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TA">TA</option>
                <option value="FACULTY">FACULTY</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                value={newUser.loginId}
                onChange={(e) =>
                  setNewUser({ ...newUser, loginId: e.target.value })
              }
              />
            </Col>
            <Col md={6}>
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={newUser.section}
                onChange={(e) =>
                  setNewUser({ ...newUser, section: e.target.value })
              }
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setEditPassword("");
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={editing.username}
                    onChange={(e) =>
                      setEditing({ ...editing, username: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Password (leave blank to keep)</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    value={editing.firstName}
                    onChange={(e) =>
                      setEditing({ ...editing, firstName: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    value={editing.lastName}
                    onChange={(e) =>
                      setEditing({ ...editing, lastName: e.target.value })
                    }
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editing.email}
                    onChange={(e) =>
                      setEditing({ ...editing, email: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={editing.role}
                    onChange={(e) =>
                      setEditing({ ...editing, role: e.target.value })
                    }
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TA">TA</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Label>Login ID</Form.Label>
                  <Form.Control
                    value={editing.loginId}
                    onChange={(e) =>
                      setEditing({ ...editing, loginId: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    value={editing.section}
                    onChange={(e) =>
                      setEditing({ ...editing, section: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEdit(false);
              setEditPassword("");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
