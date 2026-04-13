import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER } from "../httpServer";

export { HTTP_SERVER };
export const USERS_API = HTTP_SERVER ? `${HTTP_SERVER}/api/users` : "";
export const COURSES_API = HTTP_SERVER ? `${HTTP_SERVER}/api/courses` : "";

export const createUserInCourse = async (
  courseId: string,
  user: Record<string, unknown>
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/users`,
    user
  );
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUserById = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (user: {
  _id: string;
  [key: string]: unknown;
}) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const deleteUser = async (userId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

export const createUser = async (user: Record<string, unknown>) => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data;
};
