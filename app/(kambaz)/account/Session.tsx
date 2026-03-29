"use client";

import * as client from "./client";
import * as enrollmentsClient from "../enrollments/client";
import { useEffect, useState, ReactNode } from "react";
import { setCurrentUser } from "./reducer";
import { setEnrollments } from "../courses/enrollmentsReducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const loadSession = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
      if (currentUser) {
        try {
          const enrollments =
            await enrollmentsClient.findEnrollmentsForCurrentUser();
          dispatch(setEnrollments(enrollments));
        } catch (err: unknown) {
          console.error(err);
          dispatch(setEnrollments([]));
        }
      } else {
        dispatch(setEnrollments([]));
      }
    } catch (err: unknown) {
      console.error(err);
      dispatch(setCurrentUser(null));
      dispatch(setEnrollments([]));
    }
    setPending(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  if (pending) {
    return null;
  }

  return <>{children}</>;
}
