/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../account/client";

const ROLE_OPTIONS = ["STUDENT", "TA", "FACULTY", "ADMIN", "USER"] as const;

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
}: {
  uid: string | null;
  onClose: () => void;
  fetchUsers: () => void | Promise<void>;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const handleDeleteUser = async (id: string) => {
    await client.deleteUser(id);
    await fetchUsers();
    onClose();
  };

  const saveUser = async () => {
    if (!user || !uid) return;
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: email.trim(),
      role,
    };
    const saved = await client.updateUser(updatedUser);
    setUser(saved);
    setEditing(false);
    await fetchUsers();
    onClose();
  };

  useEffect(() => {
    if (!uid) {
      setUser(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const u = await client.findUserById(uid);
        if (!cancelled && u) {
          setUser(u);
          setName(`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim());
          setEmail(u.email ?? "");
          setRole(u.role ?? "USER");
        }
      } catch {
        if (!cancelled) setUser(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  useEffect(() => {
    setEditing(false);
  }, [uid]);

  const startEditing = () => {
    if (!user) return;
    setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
    setEmail(user.email ?? "");
    setRole(user.role ?? "USER");
    setEditing(true);
  };

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 z-3 overflow-auto">
      <button
        type="button"
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
        aria-label="Close"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      {user && (
        <>
          <div className="text-danger fs-4 clearfix">
            {!editing && (
              <FaPencil
                role="button"
                onClick={startEditing}
                className="float-end fs-5 mt-2 wd-edit"
                aria-label="Edit name"
              />
            )}
            {editing && (
              <FaCheck
                role="button"
                onClick={() => void saveUser()}
                className="float-end fs-5 mt-2 me-2 wd-save"
                aria-label="Save"
              />
            )}
            {!editing && (
              <div
                className="wd-name"
                role="button"
                onClick={startEditing}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") startEditing();
                }}
                tabIndex={0}
              >
                {user.firstName} {user.lastName}
              </div>
            )}
            {editing && (
              <FormControl
                className="w-100 wd-edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void saveUser();
                }}
                aria-label="Full name"
              />
            )}
          </div>

          {editing && (
            <div className="mt-3">
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <FormControl
                  type="email"
                  className="wd-edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void saveUser();
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  className="wd-edit-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          )}

          {!editing && (
            <>
              <b>Roles:</b>{" "}
              <span className="wd-roles">{user.role}</span>
              <br />
              <b>Email:</b>{" "}
              <span className="wd-email">{user.email}</span>
              <br />
              <b>Login ID:</b>{" "}
              <span className="wd-login-id">{user.loginId}</span>
              <br />
              <b>Section:</b>{" "}
              <span className="wd-section">{user.section}</span>
              <br />
              <b>Total Activity:</b>{" "}
              <span className="wd-total-activity">{user.totalActivity}</span>
            </>
          )}

          <hr />
          <button
            type="button"
            onClick={() => void handleDeleteUser(uid)}
            className="btn btn-danger float-end wd-delete"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary float-end me-2 wd-cancel"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
