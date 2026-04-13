import { axiosWithCredentials } from "../axios";
import { HTTP_SERVER } from "../httpServer";

export { HTTP_SERVER };
export const USERS_API = HTTP_SERVER ? `${HTTP_SERVER}/api/users` : "";

function requireUsersApi(): string {
  if (!USERS_API) {
    throw new Error(
      "NEXT_PUBLIC_HTTP_SERVER is not set. In Vercel: Project → Settings → Environment Variables, add NEXT_PUBLIC_HTTP_SERVER = https://your-app.onrender.com (no trailing slash), apply to Production, then Redeploy."
    );
  }
  return USERS_API;
}

export const signin = async (credentials: any) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.post(
    `${api}/signin`,
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
  const api = requireUsersApi();
  const response = await axiosWithCredentials.post(
    `${api}/profile`,
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
  const api = requireUsersApi();
  const response = await axiosWithCredentials.post(`${api}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.post(`${api}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.put(
    `${api}/${user._id}`,
    user
  );
  return response.data;
};

export const createUser = async (user: Record<string, unknown>) => {
  const api = requireUsersApi();
  const payload = { ...user };
  delete payload._id;
  const response = await axiosWithCredentials.post(api, payload);
  return response.data;
};

export const findAllUsers = async () => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.get(api);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.get(api, {
    params: { role },
  });
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.get(api, {
    params: { name },
  });
  return response.data;
};

export const findUserById = async (id: string) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.get(`${api}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const api = requireUsersApi();
  const response = await axiosWithCredentials.delete(`${api}/${userId}`);
  return response.data;
};
