"use client";
import { ReactNode, useEffect } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((course: any) => course._id === cid);

  // Check if user is enrolled in the course
  const isEnrolled = enrollments.some(
    (enrollment: { user: string; course: string }) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  // Redirect to dashboard if not enrolled
  useEffect(() => {
    if (currentUser && !isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, isEnrolled, router]);

  // Don't render content if not enrolled
  if (currentUser && !isEnrolled) {
    return (
      <div className="text-center p-5">
        <p>You are not enrolled in this course. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
