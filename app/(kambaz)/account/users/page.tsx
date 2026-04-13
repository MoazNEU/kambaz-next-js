/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../courses/people/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  /** Full list: clear both filters and GET /api/users with no query params. */
  const loadAllUsers = useCallback(async () => {
    setRole("");
    setName("");
    try {
      const data = await client.findAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    }
  }, []);

  const filterUsersByRole = async (nextRole: string) => {
    setRole(nextRole);
    const trimmed = nextRole.trim();
    if (trimmed) {
      try {
        const data = await client.findUsersByRole(trimmed);
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setUsers([]);
      }
    } else {
      await loadAllUsers();
    }
  };

  const filterUsersByName = async (nextName: string) => {
    setName(nextName);
    const trimmed = nextName.trim();
    if (trimmed) {
      try {
        const data = await client.findUsersByPartialName(trimmed);
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setUsers([]);
      }
    } else {
      await loadAllUsers();
    }
  };

  useEffect(() => {
    void loadAllUsers();
  }, [loadAllUsers]);

  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers((prev) => [...prev, user]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="mb-0">Users</h3>
        <button
          type="button"
          onClick={() => void createUser()}
          className="btn btn-danger wd-add-people"
        >
          <FaPlus className="me-2" />
          Users
        </button>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <FormControl
          value={name}
          onChange={(e) => void filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
        />
        <select
          value={role}
          onChange={(e) => void filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <PeopleTable users={users} fetchUsers={loadAllUsers} />
    </div>
  );
}
