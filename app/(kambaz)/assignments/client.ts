import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER, apiUrl } from "../httpServer";

export { HTTP_SERVER };
export const COURSES_API = apiUrl("/api/courses");

const assignmentsUrl = (courseId: string) =>
  `${COURSES_API}/${courseId}/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(assignmentsUrl(courseId));
  return response.data;
};

export const findAssignmentById = async (courseId: string, aid: string) => {
  const response = await axiosWithCredentials.get(
    `${assignmentsUrl(courseId)}/${aid}`
  );
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: Record<string, unknown>
) => {
  const response = await axiosWithCredentials.post(
    assignmentsUrl(courseId),
    assignment
  );
  return response.data;
};

export const updateAssignment = async (
  courseId: string,
  assignment: { _id: string } & Record<string, unknown>
) => {
  const response = await axiosWithCredentials.put(
    `${assignmentsUrl(courseId)}/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (courseId: string, aid: string) => {
  await axiosWithCredentials.delete(`${assignmentsUrl(courseId)}/${aid}`);
};
