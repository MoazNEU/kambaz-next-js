/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import * as client from "../courses/client";
import {
  setEnrollments,
  unenrollAllFromCourse,
} from "../courses/enrollmentsReducer";
import * as enrollmentsClient from "../enrollments/client";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: { user: string; course: string }) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const fetchCourses = useCallback(async () => {
    if (!currentUser) {
      dispatch(setCourses([]));
      return;
    }
    try {
      const data = showAllCourses
        ? await client.fetchAllCourses()
        : await client.findMyCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, showAllCourses, dispatch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const displayedCourses = courses;

  const refreshEnrollments = useCallback(async () => {
    if (!currentUser) {
      dispatch(setEnrollments([]));
      return;
    }
    try {
      const list = await enrollmentsClient.findEnrollmentsForCurrentUser();
      dispatch(setEnrollments(list));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser, dispatch]);

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollIntoCourse("current", String(courseId));
      await refreshEnrollments();
      await fetchCourses();
    } catch (e) {
      console.error("enroll failed", e);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollFromCourse("current", String(courseId));
      await refreshEnrollments();
      await fetchCourses();
    } catch (e) {
      console.error("unenroll failed", e);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((c: { _id: string }) => c._id !== courseId))
    );
    dispatch(unenrollAllFromCourse(courseId));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => (c._id === course._id ? course : c))
      )
    );
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    if (currentUser) {
      await refreshEnrollments();
      await fetchCourses();
    }
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </Button>
      </h1>
      <hr />
      <h5>
        New Course
        <button
          type="button"
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          {" "}
          Add{" "}
        </button>
        <button
          type="button"
          className="btn btn-secondary float-end me-2"
          onClick={onUpdateCourse}
          id="wd-update-course-click"
        >
          Update{" "}
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={
                    showAllCourses
                      ? isEnrolled(course._id)
                        ? `/courses/${course._id}/home`
                        : "#"
                      : `/courses/${course._id}/home`
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (showAllCourses && !isEnrolled(course._id)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    {(showAllCourses ? isEnrolled(course._id) : true) && (
                      <Button variant="primary"> Go </Button>
                    )}
                  </CardBody>
                </Link>
                <div className="card-footer">
                  {showAllCourses ? (
                    isEnrolled(course._id) ? (
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnenroll(course._id);
                        }}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnroll(course._id);
                        }}
                      >
                        Enroll
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUnenroll(course._id);
                      }}
                    >
                      Unenroll
                    </Button>
                  )}
                </div>
                <div className="card-footer d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-danger flex-fill"
                    id="wd-delete-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      onDeleteCourse(course._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn btn-warning flex-fill"
                  >
                    Edit
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
