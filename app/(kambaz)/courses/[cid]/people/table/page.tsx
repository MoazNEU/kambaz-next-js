/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../../people/Table";
import * as coursesClient from "../../../client";

function courseIdFromParams(cid: string | string[] | undefined) {
  if (cid == null) return undefined;
  return Array.isArray(cid) ? cid[0] : cid;
}

export default function CoursePeopleTablePage() {
  const { cid: cidParam } = useParams();
  const cid = courseIdFromParams(cidParam as string | string[] | undefined);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    if (!cid) return;
    const data = await coursesClient.findUsersForCourse(cid);
    setUsers(data);
  }, [cid]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
