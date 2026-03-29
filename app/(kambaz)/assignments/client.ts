import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;

const assignmentsUrl = (courseId: string) =>
  `${COURSES_API}/${courseId}/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(assignmentsUrl(courseId));
  return response.data;
};

export const findAssignmentById = async (courseId: string, aid: string) => {
  const response = await axios.get(`${assignmentsUrl(courseId)}/${aid}`);
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: Record<string, unknown>
) => {
  const response = await axios.post(assignmentsUrl(courseId), assignment);
  return response.data;
};

export const updateAssignment = async (
  courseId: string,
  assignment: { _id: string } & Record<string, unknown>
) => {
  const response = await axios.put(
    `${assignmentsUrl(courseId)}/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (courseId: string, aid: string) => {
  await axios.delete(`${assignmentsUrl(courseId)}/${aid}`);
};
