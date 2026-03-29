import { axiosWithCredentials } from "../axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const modulesApiForCourse = (cid: string) =>
  `${HTTP_SERVER}/api/courses/${cid}/modules`;

export const findModulesForCourse = async (cid: string) => {
  const response = await axiosWithCredentials.get(modulesApiForCourse(cid));
  return response.data;
};

export const findModuleById = async (cid: string, mid: string) => {
  const response = await axiosWithCredentials.get(
    `${modulesApiForCourse(cid)}/${mid}`
  );
  return response.data;
};
