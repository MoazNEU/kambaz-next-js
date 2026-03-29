import axios from "axios";

export const axiosWithCredentials = axios.create({ withCredentials: true });
