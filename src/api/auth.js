import axios from "./SetCredentials.js";
// CONST API = "http://localhost:4000/api";
// export const registerRequest = async (user) => axios.post("/register", user);

export const registerRequest = async (user) => {
    return axios.post("/register", user);
};

export const loginRequest = async (user) => {
    return axios.post("/login", user);
};

export const logout = () => axios.post("/logout");

export const verifyTokenRequest = async () => axios.get("/verifyToken");
