/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../../people/Table";
import * as usersClient from "../../../../users/client";

export default function CoursePeopleTablePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    if (!cid) return;
    const data = await usersClient.findUsersForCourse(cid as string);
    setUsers(data);
  }, [cid]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
