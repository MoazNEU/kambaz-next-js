import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER } from "../httpServer";

export { HTTP_SERVER };

export const modulesApiForCourse = (cid: string) =>
  HTTP_SERVER ? `${HTTP_SERVER}/api/courses/${cid}/modules` : "";

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
