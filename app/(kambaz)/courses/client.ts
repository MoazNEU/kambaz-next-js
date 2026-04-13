import axios from "axios";
import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER } from "../httpServer";

/** Use credentials for module CRUD so it behaves like the rest of the app behind CORS. */
const api = axiosWithCredentials;

export { HTTP_SERVER };
export const COURSES_API = HTTP_SERVER ? `${HTTP_SERVER}/api/courses` : "";
export const MODULES_API = HTTP_SERVER ? `${HTTP_SERVER}/api/modules` : "";
export const USERS_API = HTTP_SERVER ? `${HTTP_SERVER}/api/users` : "";

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`,
    {
      validateStatus: (status) => status === 200 || status === 401,
    }
  );
  if (response.status === 401) {
    return [];
  }
  return response.data;
};

export const findCourseById = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await api.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await api.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await api.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await api.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
