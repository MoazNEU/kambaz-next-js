import { axiosWithCredentials } from "../axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials,
    {
      validateStatus: (status) => status === 200 || status === 401,
    }
  );
  if (response.status === 401) {
    return {
      user: null,
      message:
        (response.data as { message?: string })?.message ??
        "Unable to login. Try again later.",
    };
  }
  return { user: response.data, message: null as string | null };
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/profile`,
    undefined,
    {
      validateStatus: (status) => status === 200 || status === 401,
    }
  );
  if (response.status === 401) {
    return null;
  }
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};
