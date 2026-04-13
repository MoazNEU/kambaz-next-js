import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER } from "../httpServer";

export { HTTP_SERVER };
export const USERS_API = HTTP_SERVER ? `${HTTP_SERVER}/api/users` : "";

export const findEnrollmentsForCurrentUser = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`,
    {
      validateStatus: (status) => status === 200 || status === 401,
    }
  );
  if (response.status === 401) {
    return [];
  }
  return response.data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/enrollments`,
    { courseId }
  );
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(
    `${USERS_API}/current/enrollments/${courseId}`
  );
};
