import axios from "axios";

export const API_URL = "http://localhost:4000/api";

const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export default instance;
